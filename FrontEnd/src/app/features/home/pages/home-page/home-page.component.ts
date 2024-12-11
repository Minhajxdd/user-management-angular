import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userModel } from '../../store/user.model';
import { loadUserData } from '../../store/user.action';
import { getUserName } from '../../store/user.select';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  userName$!: Observable<string>;


  constructor(private store: Store<{ user: userModel }>) { }

  ngOnInit(): void {

    this.store.dispatch(loadUserData());
    
    this.userName$ = this.store.select(getUserName);
  }
}
