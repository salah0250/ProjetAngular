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
      newAssignment.nom = this.nomDevoir;
      newAssignment.dateDeRendu = this.dateDeRendu ;
      newAssignment.rendu = false;
      this.assignments.push(newAssignment);
      this.assignmentService.addAssignment(newAssignment);
      console.log(this.assignments );
      this.router.navigate(['/assignment-detail/:id']);
    }
   
  ngOnInit(): void {
    setTimeout  (() => {
      this.ajoutActive = true;
    } , 2000);
  }

}
