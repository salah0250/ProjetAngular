import { Component, OnInit } from '@angular/core';
import { Assignment } from './ajout-devoir.model';
import { Router } from '@angular/router';
import { AssignmentService } from '../services/assignmentService';


@Component({
  selector: 'app-ajout-devoir',
  templateUrl: './ajout-devoir.component.html',
  styleUrls: ['./ajout-devoir.component.css']
})
export class AjoutDevoirComponent implements OnInit {
[x: string]: any;

  titre : String = "Mon application Angular sur les assignments"
  assignments:Assignment[] = [];

  constructor(private router : Router,private assignmentService: AssignmentService) { }
    ajoutActive = false;
    nomDevoir:string = "";
    dateDeRendu!:Date;
    opened = false;
    toggleMenu() {
      this.opened = !this.opened;
    }
  
    onSubmit() {
      const newAssignment = new Assignment();
      newAssignment.id = Math.floor(Math.random()*1000);
     // l'ajout d'assignment soit au nom de l'utilisateur connecté (auteur)

       // get user object from localStorage
  let currentUser = localStorage.getItem('currentUser');

  // use email as author
  if (!currentUser) {
    return;
  }
  console.log('currentUser', JSON.parse(currentUser).Email);
  newAssignment.auteurs = JSON.parse(currentUser).Email;
      newAssignment.nom = this.nomDevoir;
      newAssignment.dateDeRendu = this.dateDeRendu ;
      newAssignment.rendu = false;
      this.assignments.push(newAssignment);
      this.assignmentService.addAssignment(newAssignment)
      .subscribe(response => { console.log(response.message); 
        this.router.navigate(['/assignment-detail/:id']);
      });
      /*
      this.assignmentService.addAssignment(newAssignment);*/
      
      console.log(this.assignments );    }
   
  ngOnInit(): void {
    setTimeout  (() => {
      this.ajoutActive = true;
    } , 2000);
  }

}
