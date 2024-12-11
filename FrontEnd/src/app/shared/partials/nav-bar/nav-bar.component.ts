import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { userModel } from '../../../features/home/store/user.model';
import { getImageUrl } from '../../../features/home/store/user.select';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  profileImage = signal('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

  
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject<Store<{user: userModel}>>(Store);

  ngOnInit(): void {
    const subscripton = this.store.select(getImageUrl)
    .subscribe({
      next: (data) => {
        if(data) {
          this.profileImage.set(data);
        }
      }
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
