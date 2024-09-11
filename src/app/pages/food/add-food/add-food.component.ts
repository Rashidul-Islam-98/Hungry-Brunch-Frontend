import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ISaveFood } from 'src/app/models/save-food.model';
import { base64Camera, baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent {
  formData: ISaveFood = {
    name: '',
    description: '',
    price: 0,
    discountType: 0,
    discount: 0,
    discountPrice: 0,
    image: '',
    base64: ''
  }

  discountValue: number = 0;
  url: string = base64Camera;
  isSubmitting: boolean = false;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService){}

  onSelected(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url = event.target.result;
        this.formData.base64 = this.url;
      }
    }
  }

  onChangeImage(){
    document.getElementById("image")?.click();
  }

  onChangePrice() {
    this.formData.discountPrice = this.formData.price;
  }

  onChangeDiscountPrice(){
    const discountValue: number = (Number(this.formData.discountType) === 2) ? (this.formData.price*this.formData.discount)/100 : this.formData.discount;
    this.formData.discountPrice = Number(this.formData.price) - Number(discountValue);
  }

  onSubmit(form: any){
    this.isSubmitting = true;
    const { name, description, price, discountType, discount, discountPrice, image ,base64 } = this.formData;
    const uniqueId = Date.now();
    const sendImage = `${image.split('\\').pop()?.split('.')[0]}_${uniqueId}`;
    this.http.post(`${baseUrl}food/create`,{ name, description, price, discountType, discount, discountPrice, image: sendImage ,base64 }).subscribe(res=>{
      this.isSubmitting = false;
      form.reset();
      this.url = base64Camera;
      this.toastr.success("Congratulations!", "Food Creation is successful.");
    });
  }
}
