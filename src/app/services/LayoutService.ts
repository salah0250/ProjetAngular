import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private showLayout = new BehaviorSubject<boolean>(true);
  showLayout$ = this.showLayout.asObservable();

  toggleLayout(show: boolean) {
    this.showLayout.next(show);
  }
}