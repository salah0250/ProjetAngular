import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService,private router: Router) {}

  loginUser() {
    if (this.authService.isLogged(this.login, this.password)) {
      const redirectUrl = localStorage.getItem('redirectUrl') || '/+';
      localStorage.removeItem('redirectUrl');
      localStorage.setItem('currentUser', JSON.stringify({ login: this.login, password: this.password }));
      this.router.navigate([redirectUrl]);
    } else {
      alert('Login ou mot de passe incorrect');    }
  }
  }
