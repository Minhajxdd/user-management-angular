import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { userModel } from '../../store/user.model';
import { getUser } from '../../store/user.select';
import { loadUserData, uploadPhoto } from '../../store/user.action';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  userName = signal('');
  userEmail = signal('');
  profileImage = signal('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  

  private selectedFile: File | null = null;

  private store = inject<Store<{ user: userModel }>>(Store);
  private destoryRef = inject(DestroyRef);

  ngOnInit(): void {
    this.store.dispatch(loadUserData());

    const user$ = this.store.select(getUser)

    const subscripton = user$.subscribe({
      next: (data) => {
        this.userName.set(data.fullName);
        this.userEmail.set(data.email);
        if (data.profileImage) {
          this.profileImage.set(data.profileImage);
        }
      }
    });

    this.destoryRef.onDestroy(() => {
      subscripton.unsubscribe();
    });
  };

  handleFileSelection(event: any) {
    this.selectedFile = event.target.files[0];
  }


  uploadFile() {
    if (this.selectedFile) {
      
      this.store.dispatch(uploadPhoto({file: this.selectedFile}));
    }
  }


};
