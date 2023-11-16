import { Component, OnInit } from '@angular/core';
import { Assignment } from './delete.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  selectedAssignment: any;
  suppressionActive: boolean = true;
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

  constructor() { }
    ajoutActive = false;
    nomDevoir:string = "";
    dateDeRendu!:Date;
    opened = false;
    toggleMenu() {
      this.opened = !this.opened;
    }
  
    onSubmit() {
      const newAssignment = new Assignment();
      newAssignment.nom = this.nomDevoir;
      newAssignment.dateDeRendu = this.dateDeRendu ;
      newAssignment.rendu = false;
      this.assignments.push(newAssignment);
    }
   
  ngOnInit(): void {
    setTimeout  (() => {
      this.ajoutActive = true;
    } , 2000);
  }

  onDelete() {
    const index = this.assignments.indexOf(this.selectedAssignment);
    if (index !== -1) {
      this.assignments.splice(index, 1);
    }
  }
}
