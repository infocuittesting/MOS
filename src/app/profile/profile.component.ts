import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [CommonService]
})
export class ProfileComponent implements OnInit {

  constructor(private commonsevice: CommonService, private toastr: ToastrService) { }


  public profile: any = [];
  public profile_select_param: any;

  ngOnInit() {
    this.profile_select_table()
  }

  profile_insert(param) {
    console.log('ticket number', param)
    let body = {
      "guest_name": param.name,
      "mobile": param.mobile,
      "email": param.email,
      "address": param.address,
      "business_id": "hotegm1195"
    }
    this.commonsevice.profile_create(body).subscribe((response: any) => {
      
      console.log(response)
      if (response.ReturnCode == 'RIS') {
        this.toastr.success('The Profile Created Sucessfully')
        this.profile_select_table();
      }else{
        this.toastr.success('The Profile Already Exists')
        this.profile_select_table();
      }
    })


  }

  profile_update(param) {
    console.log('ticket number', param)
    let body = {
      "guest_name": param.name,
      "mobile": param.mobile,
      "email": param.email,
      "address": param.address,
      "business_id": "hotegm1195"
    }
    this.commonsevice.profile_update_request(body).subscribe((response: any) => {
      this.toastr.success('The Profile Updated Sucessfully')
      this.profile_select_table();
      console.log(response)
    })


  }

  profile_select_table() {
    let body =
    {
      "business_id": "hotegm1195"
    }

    this.commonsevice.profile_select(body).subscribe((response: any) => {
      this.profile_select_param = response.Returnvalue
      console.log('testttttt', this.profile_select_param)
    })
  }

  public profile_edit_databind: any = {};
  public profile_edit_value: any = [];
  profile_edit(param) {
    console.log('parammmm', param)

    this.profile_edit_value.name = param.guest_name
    this.profile_edit_value.mobile = param.mobile
    this.profile_edit_value.email = param.email
    this.profile_edit_value.address = param.address

  }

}
