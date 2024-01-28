import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../services/assignmentService';
import { Assignment } from './assignment-info.model';



@Component({
  selector: 'app-assignment-info',
  templateUrl: './assignment-info.component.html',
  styleUrls: ['./assignment-info.component.css']
})
export class AssignmentInfoComponent implements OnInit {
  assignment!: Assignment ;
  nomAssignment!: string;
  dateDeRendu!: Date;
  nomMatiere:string = "";
  matiere:string = "";
  Notes!: number;
  Remarque!: string;
  matieres: string[] = ['math', 'Physique', 'Informatique', 'Anglais'];
  assignments:Assignment[] = [];
  assignmentSelectionne!:Assignment; 
  /*@Input()*/ assignementTransmis?:Assignment  ;

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.assignmentSelectionne = new Assignment();
    this.getAssignment();
    console.log(this.assignementTransmis?.Notes);
  }
 
  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
    .subscribe(assignment =>  this.assignementTransmis= assignment);
  }


  getNonMatiere(): string {
    if (this.assignementTransmis && typeof this.assignementTransmis.matiere === 'object') {
      return (this.assignementTransmis.matiere as { non_matiere: string }).non_matiere;
    }
    return '';
  }

  getProf(): string {
    if (this.assignementTransmis && typeof this.assignementTransmis.matiere === 'object') {
      return (this.assignementTransmis.matiere as { professeur: string }).professeur;
    }
    return '';
  }

  getImageUrl(): string {
    if (this.assignementTransmis && typeof this.assignementTransmis.matiere === 'object') {
      return (this.assignementTransmis.matiere as { image: string }).image;
    }
    return '';
  }
  }
 
