import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { base64Profile, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  employeeId: string | null = null;
  url: string = "";
  isImageChanged: boolean = false;
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

  constructor(private http: HttpClient, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('employeeId');
    });
    if(this.employeeId) {
      this.getEmployee(this.employeeId);
      console.log(this.employeeFormData);
    }
  }

  getEmployee(id: string) {
    this.http.get<any>(`${baseUrl}employee/get/${id}`).subscribe(res => {
      this.employeeFormData.firstName = res.user.firstName;
      this.employeeFormData.middleName = res.user.middleName;
      this.employeeFormData.lastName = res.user.lastName;
      this.employeeFormData.avatar = res.user.image;
      this.employeeFormData.email = res.user.email;
      this.employeeFormData.phoneNumber = res.user.phoneNumber;
      this.employeeFormData.joinDate = res.joinDate;
      this.employeeFormData.fatherName = res.user.fatherName;
      this.employeeFormData.motherName = res.user.motherName;
      this.employeeFormData.spouseName = res.user.spouseName;
      this.employeeFormData.dob = res.user.dob;
      this.employeeFormData.designation = res.designation;
      this.employeeFormData.genderId = this.getGenderId(res.user.gender);
      this.employeeFormData.nid = res.user.nid;
      this.url = res.user.image;
    })
  }

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
    this.isImageChanged = true;
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

  onUpdate(form: any) {
    const base64 = this.isImageChanged ? this.url : "";
    const imageParts = this.employeeFormData?.avatar?.split('/');
    const uniqueId = Date.now();
    const image = this.isImageChanged ? `${this.employeeFormData.avatar.split('\\').pop()?.split('.')[0]}_${uniqueId}` : imageParts[imageParts.length-1].split('.')[0];

    this.http.put(`${baseUrl}employee/update/${this.employeeId}`, {
      firstName: this.employeeFormData.firstName,
      middleName: this.employeeFormData.middleName, 
      lastName: this.employeeFormData.lastName, 
      image, 
      email: this.employeeFormData.email, 
      phoneNumber: this.employeeFormData.phoneNumber, 
      joinDate: this.employeeFormData.joinDate, 
      fatherName: this.employeeFormData.fatherName, 
      motherName: this.employeeFormData.motherName, 
      spouseName: this.employeeFormData.spouseName,
      dob: this.employeeFormData.dob, 
      designation: this.employeeFormData.designation, 
      genderId: this.employeeFormData.genderId, 
      nid: this.employeeFormData.nid, 
      base64
    }).subscribe(res => {
      form.reset();
      this.url = base64Profile;
      this.toastr.success("Congratulations!", "Employee registration successful.");
    });
  }

  getGenderId(gender: string){
    if(gender === "Female") {
      return 1;
    } else if (gender == "Other") {
      return 2;
    } else {
      return 0;
    }
  }
}
