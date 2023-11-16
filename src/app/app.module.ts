import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './Shared/rendu.directive';
import { FormsModule } from '@angular/forms';

import { MatButtonModule}   from '@angular/material/button';
import { MatIconModule}   from '@angular/material/icon';
import { MatInputModule}   from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSliderModule} from '@angular/material/slider'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AjoutDevoirComponent } from './ajout-devoir/ajout-devoir.component';
import { DeleteComponent } from './delete/delete.component';
import { MatSelectModule } from '@angular/material/select';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component'; // Importez le module MatSelectModule
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginComponent } from './assignments/login/login.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    AjoutDevoirComponent,
    DeleteComponent,
    AssignmentDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forRoot([
      { path: 'ajout-devoir', component: AjoutDevoirComponent },
      { path: 'delete', component: DeleteComponent },
      { path: 'assignment-detail', component: AssignmentDetailComponent,  canActivate: [AuthGuard]      },
      { path: 'login', component: LoginComponent },
      {
        path: "", component: AjoutDevoirComponent}
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }