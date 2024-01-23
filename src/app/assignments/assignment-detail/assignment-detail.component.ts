import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { Assignment } from './assignment-detail.model';
import { AssignmentService } from '../../services/assignmentService';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
  
})
export class AssignmentDetailComponent implements OnInit ,OnDestroy{
  /*@Input()*/ assignementTransmis?:Assignment  ;
  private assignmentsSub: Subscription;
  titre : String = "Mon application Angular sur les assignments"
  pageSize = 5; // Adjust the page size as per your requirement
  currentPage = 0;
  searchTerm: string = ''; // Variable to store the search term
  filterOptions = [
    { label: 'Tous', value: 'true&false'},
    { label: 'Rendu', value: true },
    { label: 'Non Rendu', value: false },
  ];
  
  selectedFilter: boolean | null = 'true&false' as any;
  assignmentClique(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
  }
  onAssignmentRendu() {
    if (this.assignmentSelectionne) {
      this.assignmentSelectionne.rendu = true;
      this.assignmentService.updateAssignment(this.assignmentSelectionne).subscribe(response => {
        console.log(response.message);
        // Mettez à jour la liste des affectations après la modification
        this.loadAssignments();
      });
    }
  }

  edit() {
    /*
    if (this.canEditOrDelete()) {
      this.router.navigate(['/assignment-edit', this.assignmentSelectionne.id]);
    }else{
      this.router.navigate(['/login']);

    }
    */
  }
  deleteAssignment(assignment: Assignment) {
    /*
    console.log('Deleting assignment', assignment); // Check if this logs when you click the button
    if (this.canEditOrDelete()) {
      this.assignmentService.deleteAssignment(this.assignmentSelectionne).subscribe(reponse => {
        console.log(reponse.message);
        this.router.navigate(['/ajout-devoir']);
      });
    } else {  
      this.router.navigate(['/login']);
    }
    */
  }
  /*
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
  */
  assignmentSelectionne!:Assignment; 
  assignments:Assignment[] = [];

  constructor(private assignmentService: AssignmentService, private cd: ChangeDetectorRef,private router : Router,private authService: AuthenticationService,private route:ActivatedRoute) {
    this.assignmentsSub = new Subscription();
   }
   displayedColumns: string[] = ['auteurs','nom', 'dateDeRendu'];

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
    onSearchChange() {
      // Trigger the assignment loading when the search term changes
      this.loadAssignments();
    }
    onFilterChange() {
  this.loadAssignments();
}
loadAssignments() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.assignmentService
    .getAssignmentsPaginated(startIndex, endIndex, this.searchTerm, this.selectedFilter)
    .subscribe((assignments) => {
      this.assignments = assignments;
    });
}
  
    onPageChange(page: number) {
      this.currentPage = page;
      this.loadAssignments();
    }
  ngOnInit(): void {
    //this.assignmentService.getAssignments().subscribe(assignments => { this.assignments = assignments; });
    this.loadAssignments();


//this.getAssignment();
  }
  ngOnDestroy() {
    this.assignmentsSub.unsubscribe();
  }

getAssignment() {
  const id = +this.route.snapshot.params['id'];
  this.assignmentService.getAssignment(id)
  .subscribe(assignment =>  this.assignementTransmis= assignment);
}

}
