import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: any = {}; // Assurez-vous d'avoir les mêmes propriétés que dans le modèle côté serveur

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createAccount() {
    // Appelez le service d'authentification pour créer un compte
    this.authService.createAccount(this.user).subscribe(
      (response) => {
        console.log('Compte créé avec succès!', response);
        // Ajoutez une logique de redirection ou affichez un message de succès si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la création du compte', error);
        // Ajoutez une logique pour gérer les erreurs, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }

}
