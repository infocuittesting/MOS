import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [CommonService]
})
export class TableListComponent implements OnInit {

  constructor(private commonsevice: CommonService, private toastr: ToastrService) { }

  public food_and_beverage_insert_param:any
  public food_config:any=[]
  public food_select_drop_down:any=[]
  ngOnInit() {

    this.select_food_category();

  }

  food_config_insert(param) {
    console.log('food_config',param)
    
    let body =
    {
      "business_id": "hotegm1195",

        "item_name":"Milk_Shake",
        "item_image":"",
        "foodcateg_id":"mil2947",
        "item_description":"sss",
        "price":100,
        "foodtype_id":"VEG",     
        "todayspecial_id":"No",         
        "foodcateg_name":this.insertfoodimg,
        "foodcateg_image":"",
        "branch_name": "Egmore"
          
    }

    console.log('bodyyyyyyyyy',body)
    this.commonsevice.food_and_beverage_configuration(body).subscribe((response: any) => {
      //this.food_and_beverage_insert_param = response.Returnvalue
      console.log('testttttt', this.food_and_beverage_insert_param)
    })
  }

  select_food_category() {
    let body =
    {
      "business_id": "hotegm1195"
    }

    this.commonsevice.select_food_category(body).subscribe((response: any) => {
      this.food_select_drop_down = response.output
      console.log('drop down value', this.food_select_drop_down)
    })
  }


  public image:any;
  public insertfoodimg:any;

  ActiveListener($event): void {
    this.readThat($event.target);
   }
   
   readThat(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
   
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.insertfoodimg = this.image.split(",", 2)[1]
   
    }
    myReader.readAsDataURL(file);
   }


}
