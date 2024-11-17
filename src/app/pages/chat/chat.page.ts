import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  newMessage = '';
  messages: any[] = [];

  constructor(private chatService: ChatService, private authService:AuthService, private router:Router) {
    if(!localStorage.getItem('user'))
    router.navigate(['/login']);
    this.chatService.getMessages().subscribe((msgs) => {
      this.messages = msgs;
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage, '').then(() => {
      this.newMessage = '';
    });
  }
  logoutUser() {
    this.authService.logout().then(() => {
      console.log("User logged out successfully.");
      this.router.navigate(['/login']); // Redirect to the login page or home page
      localStorage.clear();
    }).catch((error) => {
      console.error("Logout error: ", error);
    });
  }
}
