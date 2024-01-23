import { Component, Inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Email: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService,private router: Router) {}
/*
  loginUser() {
    if (this.authService.isLogged(this.login, this.password)) {
      const redirectUrl = localStorage.getItem('redirectUrl') || '/+';
      localStorage.removeItem('redirectUrl');
      localStorage.setItem('currentUser', JSON.stringify({ login: this.login, password: this.password }));
      this.router.navigate(['/ajout-devoir']);
    } else {
      alert('Login ou mot de passe incorrect');    }
  }
  */
  loginUser() {
    this.authService.isLogged(this.Email, this.password).subscribe(role => {
      if (role) {
        localStorage.setItem('currentUser', JSON.stringify({ Email: this.Email, password: this.password, role }));
        let redirectUrl = '/';
  
        switch (role) {
          case 'admin':
            redirectUrl = '/assignment-detail/:id';
            console.log('admin');
            break;
          case 'enseignant':
            redirectUrl = '/ajout-devoir';
            console.log('enseignant');
            break;
          default:
            redirectUrl = '/ajout-devoir';
            console.log('etudiant');
        }
  
        this.router.navigate([redirectUrl]);
      } else {
        alert('Login ou mot de passe incorrect');
      }
    });
  }
  }
