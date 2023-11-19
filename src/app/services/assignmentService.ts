// assignment.service.ts
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignments: Assignment[] = [
  ];
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
  deleteAssignment(a:Assignment):Observable<any>{
    const pos = this.assignments.indexOf(a);
    this.assignments.splice(pos, 1);

      return of("Assignment supprimé");
   /* const index = this.assignments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.assignments.splice(index, 1);
      this.assignmentsUpdated.next([...this.assignments]);
    }
    console.log(this.assignments); // Check the assignments array
    return of(this.assignments);*/
  }
  getAssignment(id:number):Observable<Assignment|undefined> {
    const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    return of( a);
  }
}
