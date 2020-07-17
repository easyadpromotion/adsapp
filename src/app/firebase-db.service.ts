import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDbService {

  constructor(private firestore: AngularFirestore ) { }

  addData(collection,data){
    return new Promise((resolve,reject) => {
      this.firestore
          .collection(collection)
          .add(data)
          .then(res => {
            resolve(res);
          }, err => reject(err));
    })
  }

  addDataWithId(collection,id,data){
    return new Promise((resolve,reject) => {
      this.firestore
          .collection(collection)
          .doc(id)
          .set(data)
          .then((res:any) => {
            resolve(res);
          }, err => reject(err));
    })
  }

  readData(collection){
    return this.firestore.collection(collection).snapshotChanges();
  }

  readDataCond(collection){
    return this.firestore.collection(collection);
  }

  updateData(collection,id,data){
    return this.firestore
        .collection(collection)
        .doc(id)
        .set(data, { merge: true });
  }

  deleteData(collection,id){
    return this.firestore
        .collection(collection)
        .doc(id)
        .delete();
  }

  getDb(){
    return this.firestore;
  }
}
