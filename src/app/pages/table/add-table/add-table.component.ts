import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { base64Camera, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {

  base64CameraPic = base64Camera;
  url: string = this.base64CameraPic;
  isSubmitting: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  onSelected(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url = event.target.result;
      }
    }
  }

  onChangeImage(){
    document.getElementById("avatar")?.click();
  }

  onSubmit(form: NgForm){
    this.isSubmitting = true;
    const { tableNumber, numberOfSeats, avatar } = form.value;
    const base64 = this.url;
    const uniqueId = Date.now();
    const image = `${avatar.split('\\').pop().split('.')[0]}_${uniqueId}`;
    this.http.post(`${baseUrl}table/create`,{
      tableNumber,numberOfSeats,image,base64
    }).subscribe(res=>{
      this.isSubmitting = false;
      this.url = this.base64CameraPic;
      this.toastr.success("Ok!","Suucessfully created a table.");
      form.reset();
    })
  }
}
