import json
from datetime import datetime
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
import psycopg2

app = Flask(__name__)

# CORS(app)


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


def getConn():
    return psycopg2.connect(database="store_db", user="postgres", password="G0alie!5", host="127.0.0.1", port="5432")


@app.route("/getCustomers")
def getCustomers():
    conn = getConn()
    cur = conn.cursor()

    cur.execute("SELECT *  from customers")
    rows = cur.fetchall()
    results = []
    for row in rows:
        results.append({
            'id': row[0],
            'name': row[1],
            'address': row[2],
            'phone': row[3],
            'email': row[4],
        })

    conn.close()

    return jsonify(results)


@app.route("/getCustomerSalesHistory")
def getCustomerSalesHistory():
    customer = request.args.get("customer")
    conn = getConn()
    cur = conn.cursor()

    cur.execute("SELECT s.id, s.total_sale, l.name, s.sale_date "
                "from sales s, ref_store_locations l "
                "where l.id = s.location_id "
                "and s.customer_id = {}".format(customer))
    rows = cur.fetchall()
    results = []
    for row in rows:
        results.append({
            'id': row[0],
            'total_sale': float(row[1]),
            'location': row[2],
            'sale_date': row[3]
        })
    conn.close()

    return jsonify(results)


@app.route("/getAllOrders")
def getAllOrders():
    conn = getConn()
    cur = conn.cursor()

    cur.execute("SELECT s.id, c.name, s.total_sale, l.name, s.sale_date "
                "from sales s, ref_store_locations l, customers c "
                "where l.id = s.location_id "
                "and c.id = s.customer_id")
    rows = cur.fetchall()
    results = []
    for row in rows:
        if row[4] is not None:
            results.append({
                'id': row[0],
                'name': row[1],
                'total_sale': float(row[2]),
                'location': row[3],
                'sale_date': row[4]
            })
    conn.close()

    return jsonify(results)


@app.route("/getAllItems")
def getAllItems():
    conn = getConn()
    cur = conn.cursor()

    cur.execute("SELECT i.*, r.name from items i, ref_item_types r where r.id = i.type")
    rows = cur.fetchall()
    results = []
    for row in rows:
        print(row)
        results.append({
            'id': row[0],
            'name': row[1],
            'weight': float(row[2]),
            'price': float(row[4]),
            'description': row[5],
            'type_desc': row[-1]
        })

    conn.close()

    return jsonify(results)


@app.route('/addCustomer', methods=['POST'])
@cross_origin()
def add_customer():
    if request.method == 'POST':

        body = json.loads(request.data)

        if body is not False:
            conn = getConn()
            cur = conn.cursor()

            cur.execute("insert into customers (name, address, phone, email) values ( \'{}\', \'{}\', \'{}\',\'{}\' )"
                        .format(body['name'], body['address'], body['phone'], body['email']))

            conn.commit()
            conn.close()

            response = jsonify({'some': 'data'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


@app.route('/addItem', methods=['POST'])
@cross_origin()
def add_item():
    if request.method == 'POST':

        body = json.loads(request.data)

        if body is not False:
            conn = getConn()
            cur = conn.cursor()

            cur.execute("insert into items (name, weight, type, price, description) values ( \'{}\', {}, \'{}\', {},\'{}\' )"
                        .format(body['name'], body['weight'], body['type'], body['price'], body['description']))

            conn.commit()
            conn.close()

            response = jsonify({'some': 'data'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


@app.route('/addOrder', methods=['POST'])
@cross_origin()
def add_order():
    if request.method == 'POST':

        body = json.loads(request.data)

        if body is not False:
            conn = getConn()
            cur = conn.cursor()

            cur.execute("insert into sales (customer_id, total_sale, location_id, sale_date) values ( {}, {}, {}, \'{}\' )"
                        .format(body['customer_id'], body['total_sale'], body['location_id'], datetime.now()))

            conn.commit()
            conn.close()

            response = jsonify({'some': 'data'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


if __name__ == '__main__':
    app.run(debug=True)
