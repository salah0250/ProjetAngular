import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre : String = "Mon application Angular sur les assignments"
  assignments:Assignment[] = [
    {
      nom: "Vive les maths",
      dateDeRendu: new Date('2021-03-01'),
      rendu: true
    },
    {
      nom: "Vive la physique",
      dateDeRendu: new Date('2023-03-05'),
      rendu: false
    },
    {
      nom: "Angular c'est encore mieux",
      dateDeRendu: new Date('2021-03-10'),
      rendu: false
    }];

  constructor(private router: Router) { }
    ajoutActive = false;
    nomDevoir:string = "";
    dateDeRendu!:Date;
    opened = false;
    toggleMenu() {
      this.opened = !this.opened;
    }
  // In your component TypeScript file
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
    onSubmit() {
      const newAssignment = new Assignment();
      newAssignment.nom = this.nomDevoir;
      newAssignment.dateDeRendu = this.dateDeRendu ;
      newAssignment.rendu = true;
      this.assignments.push(newAssignment);
    }
   
  ngOnInit(): void {
    setTimeout  (() => {
      this.ajoutActive = true;
    } , 2000);
  }

}
