import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AdminDashBoardService } from '../admin.services';
import { userResponseData } from './admin.mode';
import { AdminDashboardUsersComponent } from './admin-dashboard-users/admin-dashboard-users.component';

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

  ngOnInit(): void {
    const subscription = this.adminService.getUserData()
      .subscribe((data) => {

        this.userData.set(data.data);
      })

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  

}
