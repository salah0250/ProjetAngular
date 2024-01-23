import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../services/assignmentService';
import { Assignment } from './assignment-edit.model';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './assignment-edit.component.html',
 styleUrls: ['./assignment-edit.component.css'],
})
export class AssignmentEditComponent implements OnInit {
 assignment!: Assignment | undefined;
 nomAssignment!: string;
 dateDeRendu!: Date;

 constructor(
   private assignmentsService: AssignmentService,
   private route: ActivatedRoute,
   private router: Router
 ) {}

 ngOnInit(): void {
   this.getAssignment();
 }

getAssignment() {
   // on récupère l'id dans le snapshot passé par le routeur
   // le "+" force l'id de type string en "number"
   const id = +this.route.snapshot.params['id'];
  
   this.assignmentsService.getAssignment(id).subscribe(assignment => {
     if (!assignment) return;
     this.assignment = assignment;
     // Pour pré-remplir le formulaire
     this.nomAssignment = assignment.nom;
     this.dateDeRendu = assignment.dateDeRendu;
   });
 }
 onSaveAssignment() {
   if (!this.assignment) return;
   if (this.nomAssignment) this.assignment.nom = this.nomAssignment;
    if (this.dateDeRendu) this.assignment.dateDeRendu = this.dateDeRendu;

   // on récupère les valeurs dans le formulaire
  this.assignmentsService.updateAssignment(this.assignment)
  .subscribe(response => { console.log(response.message); });
   this.router.navigate(['/assignment-detail', this.assignment.id]);
 }
}
