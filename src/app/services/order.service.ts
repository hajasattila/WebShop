import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  collectionName = 'Orders'
  constructor(private afs: AngularFirestore) { }
  //CRUD (Create, Read, Update, Delete) létrehozása
  
  create(order: Order) {
    return this.afs.collection<Order>(this.collectionName).doc(order.id).set(order);
  }
  getAll(userId: string) {
    //1 komplex lekérdezés where a doksi alapján annak számít!
    return this.afs.collection<Order>(this.collectionName, ref => ref.where('id', '>=', userId).where('id', '<', userId + '\uf8ff')).valueChanges();
  }
  getById(id: string) {
    return this.afs.collection<Order>(this.collectionName).doc(id).valueChanges();
  }
  update(order: Order) {
    return this.afs.collection<Order>(this.collectionName).doc(order.id).set(order);
  }
  delete(order: Order) {
    return this.afs.collection<Order>(this.collectionName).doc(order.id).delete();
  }
}