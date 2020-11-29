from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
import psycopg2

app = Flask(__name__)

CORS(app)

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
    for row in rows:
        print(row)

    conn.close()

    return "success"


@app.route("/getCustomerSalesHistory")
def getCustomers():
    customer = request.args.val("customer")
    conn = getConn()
    cur = conn.cursor()

    cur.execute("SELECT *  from sales where customer_id = {}".format(customer))
    rows = cur.fetchall()
    for row in rows:
        print(row)

    conn.close()

    return "success"


@app.route("/getStoreInventory")
def getStoreInventory():
    locationId = request.args.get('id')
    conn = getConn()
    cur = conn.cursor()

    cur.execute("SELECT t.name, i.count  from inventory i, items t where i.item_id = t.id and location_id = {}".format(locationId))
    rows = cur.fetchall()
    results = []
    for row in rows:
        print(row)
        results.append(row)

    conn.close()

    return jsonify(results)


@app.route("/newItem")
def newItem():
    name_val = request.args.get('name')
    price_val = request.args.get('price')
    weight_val = request.args.get('weight')
    item_type = request.args.get('item_type')
    description_val = request.args.get('description')
    conn = getConn()
    cur = conn.cursor()

    cur.execute("insert into items (name, weight, type, price) values ( '{}', {}, {}, {}, {} )"
                .format(name_val, weight_val, item_type, price_val, description_val))

    conn.commit()
    conn.close()

    return "success"


@app.route("/newFeedback")
def newItem():
    customer_id_val = None
    if request.args.get('customer') is not None:
        customer_id_val =  request.args.get('customer')

    store_id_val = None
    if request.args.get('store') is not None:
        store_id_val = request.args.get('store')

    feedbackText = request.args.get('feedbackText')
    conn = getConn()
    cur = conn.cursor()

    cur.execute("insert into feedback (customer_id, text, store_id) values ( {}, {}, {}, )"
                .format(customer_id_val, feedbackText, store_id_val))

    conn.commit()
    conn.close()

    return "success"

if __name__ == '__main__':
    # from waitress import serve
    # serve(app)
    app.run(debug=True)
