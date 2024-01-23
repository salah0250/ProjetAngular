// assignment.service.ts
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  assignments: Assignment[] = [
  ];
  private assignmentsUpdated = new Subject<Assignment[]>();
constructor(private htttp:HttpClient) { }

url = "https://back-end-assignment.onrender.com/api/assignments";
addAssignment(assignment: Assignment):Observable<any> { 
  return this.htttp.post(this.url,assignment);
  //this.assignments.push(assignment);
  //this.assignmentsUpdated.next([...this.assignments]);
}

/* 
addAssignment(assignment: Assignment) {
    this.assignments.push(assignment);
    this.assignmentsUpdated.next([...this.assignments]);
  }
*/
getAssignmentsPaginated(startIndex: number, endIndex: number): Observable<Assignment[]> {
  const params = new HttpParams()
    .set('startIndex', startIndex.toString())
    .set('endIndex', endIndex.toString());

  return this.htttp.get<Assignment[]>(this.url, { params });
}
getAssignments():Observable<Assignment[]> {
  return this.htttp.get<Assignment[]>(this.url);
  //return this.assignments;
}

  /* getAssignments() {
    // this.htttp.get(this.url);
    return this.assignments;
  }
  */
  getAssignmentsUpdateListener() {
    return this.assignmentsUpdated.asObservable();
  }
  deleteAssignment(assignment:Assignment):Observable<any>{
  /*  const pos = this.assignments.indexOf(a);
    this.assignments.splice(pos, 1);

      return of("Assignment supprimé");
   /* const index = this.assignments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.assignments.splice(index, 1);
      this.assignmentsUpdated.next([...this.assignments]);
    }
    console.log(this.assignments); // Check the assignments array
    return of(this.assignments);*/
let deleteUrl = this.url + "/" + assignment._id;
return this.htttp.delete(deleteUrl);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.htttp.get<Assignment>(this.url+"/"+id);
  }

  /*
  getAssignment(id:number):Observable<Assignment|undefined> {
    const a:Assignment|undefined = this.assignments.find(a => a.id === id);
    return of( a);
  }
  */

  updateAssignment(assignment:Assignment):Observable<any> {
    return this.htttp.put<Assignment>(this.url,assignment);
  }
}