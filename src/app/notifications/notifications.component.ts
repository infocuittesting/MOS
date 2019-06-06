import { Component, OnInit } from '@angular/core';
import {Router }from '@angular/router';
import {CommonService} from '../common.service';
import {ToastrService} from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers:[CommonService]
})
export class NotificationsComponent implements OnInit {

  constructor(private commonsevice:CommonService,private toastr:ToastrService) { }

  public frontdesk_req:any
  public frontdesk_array_open=[];
  public frontdesk_array_close=[];

  ngOnInit() {

    this.getfrontdesk()
   
  }

  select(param){
    let body ={
      "ticket_no":param.ticket_no
    }
    this.commonsevice.frontdesk_request_close(body).subscribe((response:any)=>{
      if(response.ReturnCode=='RUS'){
        this.getfrontdesk()
//        this.toastr.success('The '+param.fditem_names+' Request from room '+param.room_no+' has been closed')
        this.toastr.success('The ticket has been closed')

      }
      console.log(response)
    })

  }


getfrontdesk(){
  let body =
  {
    "business_id":"hotegm1195"
  }
  
  this.commonsevice.frontdesk_request(body).subscribe((response:any)=> {

    this.frontdesk_array_open=[];
    this.frontdesk_array_close=[];

    this.frontdesk_req = response.Returnvalue
    console.log('testttttt',this.frontdesk_req)
    for(var i=0;i<this.frontdesk_req.length;i++){
      if(this.frontdesk_req[i].ticketstatus=='OPEN'){
        this.frontdesk_array_open.push(this.frontdesk_req[i])
      }else{
        this.frontdesk_array_close.push(this.frontdesk_req[i])
      }
    }
  })
}
}


