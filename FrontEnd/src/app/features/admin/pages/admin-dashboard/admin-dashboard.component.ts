import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AdminDashBoardService } from '../admin.services';
import { userResponseData } from './admin.mode';
import { AdminDashboardUsersComponent } from './admin-dashboard-users/admin-dashboard-users.component';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { EditFormComponent } from './edit-form/edit-form.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [EditFormComponent, AdminDashboardUsersComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  userData = signal<userResponseData[]>([]);

  private adminService = inject(AdminDashBoardService);
  private destoryRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private router = inject(Router);

  private searchTerms = new Subject<string>();

  ngOnInit(): void {

    this.loadData();

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

      this.destoryRef.onDestroy(() => {
        subscription.unsubscribe();
        })

      
  }

  loadData() {
    const subscription = this.adminService.getUserData()
    .subscribe((data) => {
      this.userData.set(data.data);
    })

  this.destoryRef.onDestroy(() => {
    subscription.unsubscribe();
  })
  }

  searchUser(search: string) {
    this.searchTerms.next(search);
  }

  openEditForm = signal(false);

  toggleEditFrom() {
    this.openEditForm.set(!this.openEditForm());
    if(!this.openEditForm()) {
      this.loadData();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
