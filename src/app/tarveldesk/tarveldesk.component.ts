import { Component, OnInit } from '@angular/core';
import {Router }from '@angular/router';
import {CommonService} from '../common.service';
import {ToastrService} from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-tarveldesk',
  templateUrl: './tarveldesk.component.html',
  styleUrls: ['./tarveldesk.component.css'],
  providers:[CommonService]
})
export class TarveldeskComponent implements OnInit {

  constructor(private commonsevice:CommonService,private toastr:ToastrService) { }

  public traveldesk_req:any
  public traveldesk_array_open=[];
  public traveldesk_array_close=[];


  ngOnInit() {

    
    this.gettraveldesk()
  }

  select(param){
    let body ={
      "ticket_no":param.ticket_no
    }
    this.commonsevice.traveldesk_request(body).subscribe((response:any)=>{
        this.gettraveldesk()
//        this.toastr.success('The '+param.fditem_names+' Request from room '+param.room_no+' has been closed')
        this.toastr.success('The ticket has been closed')
      console.log(response)
    })

  }


gettraveldesk(){
  let body =
  {
    "business_id":"hotegm1195"
  }
  
  this.commonsevice.traveldesk_request(body).subscribe((response:any)=> {

    this.traveldesk_array_open=[];
    this.traveldesk_array_close=[];

    this.traveldesk_req = response.Returnvalue.Travel_Desk_Service
    console.log('testttttt',this.traveldesk_req)
    for(var i=0;i<this.traveldesk_req.length;i++){
      if(this.traveldesk_req[i].ticketstatus=='OPEN'){
        this.traveldesk_array_open.push(this.traveldesk_req[i])
      }else{
        this.traveldesk_array_close.push(this.traveldesk_req[i])
      }
    }
  })
}

}
