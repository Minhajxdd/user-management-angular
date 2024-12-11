import { Component, inject, Input, input, output } from '@angular/core';
import { userResponseData } from '../admin.mode';
import { AdminDashBoardService } from '../../admin.services';

@Component({
  selector: '[admin-dashborad-tr]',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard-users.component.html',
  styleUrl: './admin-dashboard-users.component.css'
})
export class AdminDashboardUsersComponent {
  // userData = input.required<userResponseData>();
  @Input({required: true}) userData!: userResponseData;
  index = input.required<number>();

  private adminDashboardService = inject(AdminDashBoardService);

  onToggleBlock() {
    this.userData.isBlocked = !this.userData.isBlocked;
    this.adminDashboardService.toggleBlock(this.userData._id)
    .subscribe();
  }


}
