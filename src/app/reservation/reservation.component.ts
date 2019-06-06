import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [CommonService]
})
export class ReservationComponent implements OnInit {

  constructor(private commonsevice: CommonService, private toastr: ToastrService) { }


  reservation:any=[]
  ngOnInit() {
    this.reservation_select_room();
    this.reservation_show();
  }

  reservation_insert(param) {
    console.log('ticket number', param)
    let body = {
      "room_no":param.room_no,
      "mobile_no": param.mobile,
      "checkin_date": param.Checkin,
      "checkout_date": param.CheckOut,
      "adult": param.Adults,
      "child": param.Child,
      "business_id": "hotegm1195"
    }
    console.log('body',body)
    this.commonsevice.reservation_create(body).subscribe((response: any) => {
      
      console.log(response)
      this.reservation_show();
      if (response.ReturnCode == 'RIS') {
        this.toastr.success('The Reservation Created Sucessfully')
      }else{
        this.toastr.success('The Room Is Occupied Please Try Some Other')
      }
    })


  }

  public room_select:any;
  reservation_select_room() {
    let body =
    {
      "business_id": "hotegm1195"
    }

    this.commonsevice.reservation_select_room(body).subscribe((response: any) => {
      this.room_select = response.ReturnValue
      console.log('testttttt', this.room_select)
    })
  }

  public reservation_return_details:any;
  reservation_show() {
    let body =
    {
      "business_id": "hotegm1195"
    }

    this.commonsevice.reservation_details(body).subscribe((response: any) => {
      this.reservation_return_details = response.Returnvalue
      console.log('reservation_return_details', this.reservation_return_details)
    })
  }

  public edit_reservation:any=[];
  reservation_edit_details(param){
    console.log("edit_reservation",param)

    this.edit_reservation.mobile = param.mobile_no
    this.edit_reservation.Adults = param.adult
    this.edit_reservation.Child = param.child

    this.edit_reservation.Checkin = param.checkin_date
    this.edit_reservation.CheckOut = param.checkout_date
    this.edit_reservation.room_no = param.room_no


  }

  reservation_update_details(param) {
    console.log('ticket number', param)
    let body = {
      "guest_id":param.guest_id,
      "room_no": param.room_no,
      "guest_name": param.guest_name,
      "mobile_no": param.mobile_no,
      "checkin_date": param.checkin_date,
      "checkout_date": param.checkout_date,
      "adult": param.adult,
      "child": param.child,
      "business_id": "hotegm1195"
    }
    console.log('body',body)
    this.commonsevice.reservation_update_details(body).subscribe((response: any) => {
      
      console.log(response)
      this.reservation_show();
      if (response.ReturnCode == 'RUS') {
        this.toastr.success('The Reservation Updated Sucessfully')
      }else{
        this.toastr.success('The Room Is Occupied Please Try Some Other')
      }
    })


  }
}
