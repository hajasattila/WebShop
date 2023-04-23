import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  collectionName = 'Orders'
  constructor(private afs: AngularFirestore) { }
  //CRUD (Create, Read, Update, Delete)

  create(order: Order) {
    return this.afs.collection<Order>(this.collectionName).doc(order.id).set(order);
  }
  getAll() {
    return this.afs.collection<Order>(this.collectionName).valueChanges();
  }
  getById(id: string) {
    return this.afs.collection<Order>(this.collectionName).doc(id).valueChanges();
  }
  update(order: Order) {
    return this.afs.collection<Order>(this.collectionName).doc(order.id).set(order);
  }
  delete(id: string) {
    return this.afs.collection<Order>(this.collectionName).doc(id).delete();
  }
  getOrdersByUserId(userId: string) {
    return this.afs.collection<Order>(this.collectionName, ref => ref.where('id', '==', userId)).valueChanges();
  }
}