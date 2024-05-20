import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { base64Profile, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employeeFormData = {
    firstName: '',
    middleName: '',
    lastName: '', 
    avatar: '', 
    email: '', 
    phoneNumber: '', 
    joinDate: '', 
    fatherName: '', 
    motherName: '', 
    spouseName: '',
    dob: '', 
    designation: '', 
    genderId: 0, 
    nid: ''
  }

  url: string = base64Profile;
  isSubmitting: boolean = false;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onSelected(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

  onChangeImage() {
    document.getElementById("image")?.click();
  }

  isNumber(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  isPhoneNumber(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode !== 43 && charCode !== 45 && (charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }

  onSubmit(form: any) {
    this.isSubmitting = true;
    const { firstName, middleName, lastName, avatar, email, phoneNumber, joinDate
      , fatherName, motherName, spouseName,
      dob, designation, genderId, nid } = this.employeeFormData;

    const base64 = this.url;
    const uniqueId = Date.now();
    const image = avatar ? `${avatar.split('\\').pop()?.split('.')[0]}_${uniqueId}` : 'profile';

    this.http.post(`${baseUrl}employee/create`, {
      firstName, middleName, lastName, image, email, phoneNumber, joinDate
      , fatherName, motherName, spouseName,
      dob, designation, genderId, nid, base64
    }).subscribe(res => {
      this.isSubmitting = false;
      form.reset();
      this.url = base64Profile;
      this.toastr.success("Congratulations!", "Employee registration successful.");
    });
  }
}
