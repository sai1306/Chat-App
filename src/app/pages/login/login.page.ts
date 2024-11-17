import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {
    if(localStorage.getItem('user'))
    router.navigate(['/chat']);
  }

  login() {
    this.authService.login(this.email, this.password).then((res:any) => {
      this.router.navigate(['/chat']);      
      localStorage.setItem('user', res);
      localStorage.setItem('email', this.email);
    }).catch((error) => alert(error.message));
  }

  register() {
    this.authService.register(this.email, this.password).then(() => {
      alert('Registered successfully!');
    }).catch((error) => alert(error.message));
  }
}
