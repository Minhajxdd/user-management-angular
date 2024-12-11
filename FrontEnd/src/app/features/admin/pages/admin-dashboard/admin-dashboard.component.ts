import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AdminDashBoardService } from '../admin.services';
import { userResponseData } from './admin.mode';
import { AdminDashboardUsersComponent } from './admin-dashboard-users/admin-dashboard-users.component';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminDashboardUsersComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  userData = signal<userResponseData[]>([])
  private adminService = inject(AdminDashBoardService);
  private destoryRef = inject(DestroyRef);

  private searchTerms = new Subject<string>();


  ngOnInit(): void {

    const subscription = this.searchTerms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term: string) => this.adminService.getUserData(term))
      )
      .subscribe({
        next: (response) => {
          this.userData.set(response.data);
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        },
      });

     const subscription2 = this.adminService.getUserData()
      .subscribe((data) => {
        this.userData.set(data.data);
      })

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
    })
  }

  

  searchUser(search: string) {
    this.searchTerms.next(search);
  }

}
