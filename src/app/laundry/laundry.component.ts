import { Component, OnInit } from '@angular/core';
import {Router }from '@angular/router';
import {CommonService} from '../common.service';
import {ToastrService} from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.css'],
  providers:[CommonService]
})
export class LaundryComponent implements OnInit {

  constructor(private commonsevice:CommonService,private toastr:ToastrService) { }
  public laundry_req:any

  ngOnInit() {

    this.getfrontdesk()
   
  }

  select(param){
    let body ={
      "ticket_no":param.ticket_no
    }
    this.commonsevice.laundry_request(body).subscribe((response:any)=>{
        this.getfrontdesk()
//        this.toastr.success('The '+param.fditem_names+' Request from room '+param.room_no+' has been closed')
        this.toastr.success('The ticket has been closed')
      console.log(response)
    })

  }


getfrontdesk(){
  let body =
  {
    "business_id":"hotegm1195"
  }
  
  this.commonsevice.laundry_request(body).subscribe((response:any)=> {
    this.laundry_req = response.Returnvalue
    console.log('testttttt',this.laundry_req)
  })
}

public laundry_iteam:any
laundry_details:any
laundry_popup(param){
  this.laundry_iteam=param.lan_items
  this.laundry_details = param.total_amount;

}
}
