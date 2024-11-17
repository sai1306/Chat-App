import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: AngularFirestore) {}

  sendMessage(message: string, userId: string) {
    var email : string = localStorage.getItem('email') || "";
    var index : number = email.indexOf('@');
    var result : string = email.slice(0, index);
    return this.firestore.collection('messages').add({
      message,
      name:result,
      timestamp: new Date(),
    });
  }

  getMessages() {
    return this.firestore
      .collection('messages', (ref) => ref.orderBy('timestamp', 'asc'))
      .valueChanges();
  }
}
