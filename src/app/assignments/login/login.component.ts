import { Component, Inject , OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/LayoutService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// home icon 
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit, OnDestroy{
  faHome = faHome;

  Email: string = '';
  password: string = '';
  Nom: string = '';
  isActive = false;

  constructor(private authService: AuthenticationService,private router: Router,private layoutService: LayoutService,private snackBar: MatSnackBar) {}
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
        this.snackBar.open('Connexion avec succès!', 'Fermer', {
          duration: 3000, // Durée d'affichage du SnackBar en millisecondes
          horizontalPosition: 'end', // Position horizontale du SnackBar (start, center, end)
          verticalPosition: 'top', // Position verticale du SnackBar (top, bottom)
        });
        this.router.navigate([redirectUrl]);
      } else {
        this.snackBar.open('Email ou mot de passe incorrect', 'Fermer', {
          duration: 3000, // Durée d'affichage du SnackBar en millisecondes
          horizontalPosition: 'end', // Position horizontale du SnackBar (start, center, end)
          verticalPosition: 'top', // Position verticale du SnackBar (top, bottom)
        });
      }
    });
  }
  register() {
    this.isActive = true;
  }

  login() {
    this.isActive = false;
  }
  ngOnInit() {
    this.layoutService.toggleLayout(false);
  }

  ngOnDestroy() {
    this.layoutService.toggleLayout(true);
  }
  user: any = {
    role: 'etudiant', // Default role, you can change it based on your requirements
  };
  createAccount() {
    // Call the authentication service to create an account
    this.authService.createAccount(this.user).subscribe(
      (response) => {
        console.log('Compte créé avec succès!', response);
        // Add logic for redirection or display a success message if needed
        // je deriger vers la meme page
        this.snackBar.open('Creation de compte avec succès!', 'Fermer', {
          duration: 3000, // Durée d'affichage du SnackBar en millisecondes
          horizontalPosition: 'end', // Position horizontale du SnackBar (start, center, end)
          verticalPosition: 'top', // Position verticale du SnackBar (top, bottom)
        });
      },
      (error) => {
        if (error.status === 400 && error.error.message === 'Email already exists') {
          this.snackBar.open('Email exist dèja!', 'Fermer', {
            duration: 3000, // Durée d'affichage du SnackBar en millisecondes
            horizontalPosition: 'end', // Position horizontale du SnackBar (start, center, end)
            verticalPosition: 'top', // Position verticale du SnackBar (top, bottom)
          });
        } else {
          console.error('Erreur lors de la création du compte', error);
          // Add logic to handle other errors, for example, display an error message to the user
        }
      }
    );
  }
  
  }
