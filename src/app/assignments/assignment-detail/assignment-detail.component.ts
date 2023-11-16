import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { Assignment } from './assignment-detail.model';
import { AssignmentService } from '../../services/assignmentService';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit ,OnDestroy{
  @Input() assignementTransmis:Assignment;
  private assignmentsSub: Subscription;
  titre : String = "Mon application Angular sur les assignments"
  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }
  onAssignmentRendu() {
    this.assignmentSelectionne.rendu = true;
  }

  
  deleteAssignment(assignment: Assignment) {
    console.log('Deleting assignment', assignment); // Check if this logs when you click the button
    if (this.canEditOrDelete()) {
      this.assignmentService.deleteAssignment(assignment);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  canEditOrDelete(): boolean {
    const currentUserItem = localStorage.getItem('currentUser');
    if (currentUserItem) {
      const user = JSON.parse(currentUserItem);
      return this.authService.isAdmin(user.login, user.password);
    }
    return false;
  }
  
  canViewDetails(): boolean {
    const currentUserItem = localStorage.getItem('currentUser');
    if (currentUserItem) {
      const user = JSON.parse(currentUserItem);
      return this.authService.isLogged(user.login, user.password);
    }
    return false;
  }
  assignmentSelectionne!:Assignment; 
  assignments:Assignment[] = [];

  constructor(private assignmentService: AssignmentService, private cd: ChangeDetectorRef,private router : Router,private authService: AuthenticationService) {
    this.assignementTransmis = new Assignment(); 
    this.assignmentsSub = new Subscription();
   }
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
    this.assignments = this.assignmentService.getAssignments();
    this.assignmentsSub = this.assignmentService.getAssignmentsUpdateListener()
    .subscribe((assignments: Assignment[]) => {
      this.assignments = assignments;
    });
  }
  ngOnDestroy() {
    this.assignmentsSub.unsubscribe();
  }

}
