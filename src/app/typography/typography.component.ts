import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css'],
  providers: [CommonService]
})
export class TypographyComponent implements OnInit {

  constructor(private commonsevice: CommonService, private toastr: ToastrService) { }

  public food_request_param: any

  public food_req:any
  public food_array_open=[];
  public food_array_close=[];

  ngOnInit() {
    this.get_food_request()
  }

  select(param) {
    console.log('ticket number', param)
    let body = {
      "ticket_no": param
    }
    this.commonsevice.food_request_close(body).subscribe((response: any) => {
      if (response.ReturnCode == 'RUS') {
        this.get_food_request()
        //        this.toastr.success('The '+param.fditem_names+' Request from room '+param.room_no+' has been closed')
        this.toastr.success('The ticket has been closed')
        console.log(response)
      }
    })


  }

  get_food_request() {
    let body =
    {
      "business_id": "hotegm1195"
    }

    this.commonsevice.food_request(body).subscribe((response: any) => {
      this.food_request_param = response.Returnvalue
      console.log('testttttt', this.food_request_param)


      this.food_req = response.Returnvalue
      console.log('testttttt', this.food_req)
      for (var i = 0; i < this.food_req.length; i++) {
        if (this.food_req[i].ticketstatus == 'OPEN') {
          this.food_array_open.push(this.food_req[i])
        } else {
          this.food_array_close.push(this.food_req[i])
        }
      }
    })
  }

  public food_iteam: any
  public food_details: any
  public close_ticket: any

  food_popup(param) {
    console.log("thrrrrrrrrrrrr", param)
    this.food_iteam = param.food_items
    this.food_details = param.total_amount;
    this.close_ticket = param.ticket_no

  }

}
