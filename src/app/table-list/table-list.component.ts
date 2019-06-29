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

  public food_and_beverage_insert_param: any
  public food_config: any = []
  public food_select_drop_down: any = []; roomcon: any = []; user:any=[];
  public roomtypecon: any = []; rmtype: any; rooms: any;
  public showhideinput:boolean=true;showhidedrop:boolean=true;

  ngOnInit() {

    this.select_food_category();
    this.select_roomtype();
    this.select_room();
    this.select_laundary();
    this.select_food_iteam();
  }
  showinput(){
    this.showhidedrop=false;
  }
  showdropdown(){
    this.showhideinput=false;
  }

  //Insert roomconfig
  insertroom(param,param1) {
    let body = {
      "room_no": param.Room_no,
      "business_id": "hotegm1195",
      "roomtype_id": param.Room_type,
      "price": param.Room_price,
      "room_password": param.Room_password
    }
    param1.reset();
    this.commonsevice.inroom(body).subscribe((resp: any) => {
      console.log(resp)
      this.select_room();
    })
  }

  // Select Roomconfigure
  select_room() {
    let body =
    {
      "business_id": "hotegm1195"
    }

    this.commonsevice.select_room(body).subscribe((response: any) => {
      this.rooms = response.ReturnValue;
      console.log(' value', this.rooms)
    })
  }

  //Insert roomtype
  insertrmty(param, param1) {
    let body = {
      "roomtype_name": param,
      "business_id": "hotegm1195",
      "roomtype_image": " ",
      "branch_name": "Egmore"
    }
    param1.reset();
    this.commonsevice.inrmty(body).subscribe((resp: any) => {
      if (resp.ReturnCode == "RIS") {
        this.select_roomtype();
      }
    })
  }

  // Select Room Type
  select_roomtype() {
    let body =
    {
      "business_id": "hotegm1195"
    }

    this.commonsevice.select_rmtype(body).subscribe((response: any) => {
      this.rmtype = response.output
      console.log(' value', this.rmtype)
    })
  }

    // Select launadrconfigure
    public laundary_array:any;
    landryitem:any;
    select_laundary() {
      this.landryitem=[];
      let body =
      {
        "business_id": "hotegm1195"
      }
  
      this.commonsevice.select_laundary(body).subscribe((response: any) => {
        this.laundary_array = response.ReturnValue;
        for(var i=0;i<this.laundary_array.length;i++){
          for(var j=0;j<this.laundary_array[i].laundry_items.length;j++){
            this.landryitem.push(this.laundary_array[i].laundry_items[j])
          }
        }
        console.log(' value launadr', this.laundary_array)
      })
    }

    //Insert launadry configuration

    insertlaunadryitem(param1,param,param2){
      if(this.landraycatimage === undefined || this.landraycatimage === null){
        this.landraycatimage = "";
      }
      if(this.landrayitemcatimage === undefined || this.landrayitemcatimage === null){
        this.landrayitemcatimage = "";
      }
      
    this.showhidedrop=true;
    this.showhideinput=true;
    param2.reset();
    var Regex= /^[A-Za-z]+$/;
    if(param.match(Regex)){
    let body={    
      "ldryitem_name":param1.ldryitem_name,
      "ldryitem_image":this.landrayitemcatimage,
      "ldrycateg_id":"",
      "business_id":"hotegm1195",
      "ldryitem_description":param1.ldryitem_description,
      "price":param1.price,
      "ldrycateg_name":param,
      "branch_name": "Egmore",
      "ldrycateg_image":this.landraycatimage    
  }
  console.log("teeeeee",JSON.stringify(body))
  this.commonsevice.insertlaundry(body).subscribe((response: any) => {
    if(response.ReturnCode=="RIS"){
      this.select_laundary();
      this.toastr.success("The Laundary Item is Created Successfully")
    }else{
      this.toastr.error("The Item is Already exist");
      }
  })
    }else{
      let body={    
        "ldryitem_name":param1.ldryitem_name,
        "ldryitem_image":this.landrayitemcatimage,
        "ldrycateg_id":param,
        "business_id":"hotegm1195",
        "ldryitem_description":param1.ldryitem_description,
        "price":param1.price,
        "branch_name": "Egmore",
        "ldrycateg_image":"",
        "ldrycateg_name":this.landraycatimage    
    }
  console.log("teeeeee",JSON.stringify(body))
    this.commonsevice.insertlaundry(body).subscribe((response: any) => {
      if(response.ReturnCode=="RIS"){
        this.select_laundary();
        this.toastr.success("The Laundary Item is Created Successfully")
    }else{
    this.toastr.error("The Item is Already exist");
    }
    })
    }
  }

//select laundary item to edit
public laundary_edit:any=[];
laundryselectedit(param){
console.log("test laundry",param)
this.laundary_edit=param;
}
  //image for category laundary
  public landraycatimage:any;
  ActiveListenerlaundry($event): void {
    this.readThatlaundry($event.target);
  }

  readThatlaundry(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.landraycatimage = this.image.split(",", 2)[1];
    }
    myReader.readAsDataURL(file);
  }

  //image for category laundary
  public landrayitemcatimage:any;
  ActiveListenerlaundryitem($event): void {
    this.readThatlaundryitem($event.target);
  }

  readThatlaundryitem(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.landrayitemcatimage = this.image.split(",", 2)[1];
    }
    myReader.readAsDataURL(file);
  }


  public image: any;
  public insertfoodimg: any;
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


   public image1:any;
   public insertfoodimg1:any;
 
   ActiveListener1($event): void {
     this.readThat1($event.target);
    }
    
    readThat1(inputValue: any): void {
     var file: File = inputValue.files[0];
     var myReader: FileReader = new FileReader();
    
     myReader.onloadend = (e) => {
       this.image1 = myReader.result;
       this.insertfoodimg1 = this.image1.split(",", 2)[1]
    
     }
     myReader.readAsDataURL(file);
    }
 

    public var_cate_name:any
    public new_food_img:any
    food_config_insert(param) {
      console.log('food_config',param.cate_name_1)
      
      if(this.insertfoodimg1 === undefined || this.insertfoodimg1 === null){
        this.insertfoodimg1 = "";
      }
      if(this.insertfoodimg === undefined || this.insertfoodimg === null){
        this.insertfoodimg = "";
      }
      if(param.cate_name_1 != undefined || param.cate_name_1 != null){    
        let body =
      {
        "business_id": "hotegm1195",
          "item_name":param.item_name,
          "item_image":this.insertfoodimg1,
          "foodcateg_id":"",
          "item_description":param.iteam_description,
          "price":param.rate,
          "foodtype_id":param.food_type,     
          "todayspecial_id":param.today_spl,    
          "foodcateg_name":param.cate_name_1,             
          "foodcateg_image":this.insertfoodimg,
          "branch_name": "Egmore"          
      }
      console.log('food_config',body)
      this.commonsevice.food_and_beverage_configuration(body).subscribe((response: any) => {
        //this.food_and_beverage_insert_param = response.Returnvalue
        
        if(response.ReturnCode=="RIS"){
          this.toastr.success('Record Inserted Sucessfully')
          this.select_food_iteam();
        }else{
          this.toastr.success('Record NOT Inserted Please Try Latter')
        }

        console.log('testttttt', this.food_and_beverage_insert_param)
      })
  
  
      }else{
        console.log('else if')
      let body =
      {
        "business_id": "hotegm1195",
          "item_name":param.item_name,
          "item_image":this.insertfoodimg1,
          "foodcateg_id":param.cate_name,
          "item_description":param.iteam_description,
          "price":param.rate,
          "foodtype_id":param.food_type,     
          "todayspecial_id":param.today_spl,            
          "foodcateg_image":this.insertfoodimg,
          "foodcateg_name":"",
          "branch_name": "Egmore"
            
      }
  
      console.log('bodyyyyyyyyy',body)
      this.commonsevice.food_and_beverage_configuration(body).subscribe((response: any) => {
        //this.food_and_beverage_insert_param = response.Returnvalue
        if(response.ReturnCode=="RIS"){
          this.toastr.success('Record Inserted Sucessfully')
          this.select_food_iteam();
        }else{
          this.toastr.success('Record NOT Inserted Please Try Latter')
        }
        console.log('testttttt', this.food_and_beverage_insert_param)
      })
    }
    }

    public food_iteam_select:any
    select_food_iteam(){
      let body =
      {
        "business_id": "hotegm1195"
      }
  
      this.commonsevice.select_food_iteam(body).subscribe((response: any) => {
        this.food_iteam_select = response.ReturnValue
        console.log('food iteam', this.food_iteam_select)
      })
    }

    public food_data_bind_value:any=[]
    food_iteam_select_details_edit(param){
      console.log('select',param)
     // this.food_data_bind_value=param;
      this.food_data_bind_value.item_name_edit = param.item_name
      this.food_data_bind_value.cate_name_edit = param.foodcategory_id
      this.food_data_bind_value.iteam_description_edit = param.item_description

      this.food_data_bind_value.rate_edit = param.price
      this.food_data_bind_value.food_type_edit = param.foodtype_id
      this.food_data_bind_value.today_spl_edit = param.todayspecial_id

      this.food_data_bind_value.fbitem_id = param.fbitem_id;
      this.food_data_bind_value.foodcategory_id = param.foodcategory_id

    }


    // update food and beverage

    public image1_edit:any
    public insertfoodimg2:any
    ActiveListener2($event): void {
      this.readThat1($event.target);
     }
     
     readThat2(inputValue: any): void {
      var file: File = inputValue.files[0];
      var myReader: FileReader = new FileReader();
     
      myReader.onloadend = (e) => {
        this.image1_edit = myReader.result;
        this.insertfoodimg2 = this.image1_edit.split(",", 2)[1]
     
      }
      myReader.readAsDataURL(file);
     }

     public image_edit:any
     public insertfoodimg3:any
     ActiveListener3($event): void {
       this.readThat1($event.target);
      }
      
      readThat3(inputValue: any): void {
       var file: File = inputValue.files[0];
       var myReader: FileReader = new FileReader();
      
       myReader.onloadend = (e) => {
         this.image_edit = myReader.result;
         this.insertfoodimg3 = this.image_edit.split(",", 2)[1]
      
       }
       myReader.readAsDataURL(file);
      }

    food_config_update(param){
      console.log('param',param)
      if(this.insertfoodimg2 === undefined || this.insertfoodimg2 === null){
        this.insertfoodimg2 = "";
      }
      if(this.insertfoodimg3 === undefined || this.insertfoodimg3 === null){
        this.insertfoodimg3 = "";
      }
      let body =
      {
        "fbitem_id":this.food_data_bind_value.fbitem_id,
          "item_name":param.item_name_edit,
          "item_image":this.insertfoodimg2,
          "foodcateg_id":param.cate_name_edit,
          "business_id":"hotegm1195",
          "item_description":param.iteam_description_edit,
          "price":param.rate_edit,
          "foodtype_id":param.food_type_edit,                        
          "todayspecial_id":param.today_spl_edit,                  
          "foodcateg_image":this.insertfoodimg3,
          "branch_name": "Egmore"
          
      }

      console.log('update value',body)
      this.commonsevice.update_food_category(body).subscribe((response: any) => {
        //this.profile_select_param = response.Returnvalue
        if(response.ReturnCode=="RUS"){
          this.toastr.success('Record Updated Sucessfully')
          this.select_food_iteam();
        }else{
          this.toastr.success('Record NOT Updated')
        }
        console.log('testttttt', response.Return)
      })
    }
  
}
