// assignment.service.ts
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignments: Assignment[] = [];
  private assignmentsUpdated = new Subject<Assignment[]>();

  addAssignment(assignment: Assignment) {
    this.assignments.push(assignment);
    this.assignmentsUpdated.next([...this.assignments]);
  }

  getAssignments() {
    return this.assignments;
  }
  getAssignmentsUpdateListener() {
    return this.assignmentsUpdated.asObservable();
  }
  deleteAssignment(assignment: Assignment) {
    const index = this.assignments.findIndex(a => a.nom === assignment.nom && a.dateDeRendu.toISOString() === assignment.dateDeRendu.toISOString());
    if (index !== -1) {
      this.assignments.splice(index, 1);
      this.assignmentsUpdated.next([...this.assignments]);
    }
    console.log(this.assignments); // Check the assignments array
  }
}
