import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { userResponseData } from '../admin.mode';
import { editForm } from './form.admin.edit';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashBoardService } from '../../admin.services';
import { AdminDashboardData } from '../admin.data.service';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent implements OnInit{

  
  close = output();
  
  closeForm() {
    this.close.emit();
  }

  form = editForm;
  errorText = signal('');

  private adminService = inject(AdminDashBoardService);
  private adminStoreService = inject(AdminDashboardData);

  ngOnInit(): void {
    this.form.setValue({
      fullname: this.adminStoreService.getData().fullname,
      email: this.adminStoreService.getData().email
    })

  }



  onSubmit() {
    if (
      this.form.controls.fullname.touched &&
      this.form.controls.fullname.dirty &&
      this.form.controls.fullname.invalid
    ) {
      return this.errorText.set('Please Enter valid Full Name!')
    }

    if (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    ) {
      return this.errorText.set('Please Enter valid Email!')
    }


    if (
      this.form.controls.fullname.untouched ||
      this.form.controls.email.untouched
    ) {
      return this.errorText.set(`All fields are required`)
    }

    this.errorText.set('');

    const EnteredFullName = this.form.value.fullname;
    const EnteredEmail = this.form.value.email;

    
    if(typeof EnteredFullName === 'string' && typeof EnteredEmail === 'string') {
      
      const data = { 
        userId: this.adminStoreService.getData()._id,
        fullname: EnteredFullName,
        email: EnteredEmail  
      }
      
      this.adminService.updateUser(data)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        complete:() => {
          this.form.reset();
          this.closeForm();
        }
      })
      
    }
  }
}
