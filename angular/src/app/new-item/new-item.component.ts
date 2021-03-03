import { Component, OnInit } from '@angular/core';
import {Service} from '../services/services';
import {ItemModel} from '../models/item';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  constructor(private service: Service) { }

  newItem: ItemModel;

  ngOnInit(): void {
    this.newItem = new ItemModel();
    this.newItem.name = null;
    this.newItem.weight = null;
    this.newItem.type = null;
    this.newItem.price = null;
    this.newItem.description = null;
  }

  addItem(): void {
    this.service.addItem(this.newItem);
  }

}
