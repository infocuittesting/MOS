import { Component, OnInit } from '@angular/core';
import {Router }from '@angular/router';
import {CommonService} from '../common.service';
import {ToastrService} from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css'],
  providers:[CommonService]
})
export class UpgradeComponent implements OnInit {

  constructor(private commonsevice:CommonService,private toastr:ToastrService) { }

  public housekeeping_req:any
  public housekeeping_array_open=[];
  public housekeeping_array_close=[];

  ngOnInit() {

    this.getfrontdesk()
   
  }

  select(param){
    let body ={
      "ticket_no":param.ticket_no
    }
    this.commonsevice.housekeeping_request_close(body).subscribe((response:any)=>{
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
  
  this.commonsevice.housekeeping_request(body).subscribe((response:any)=> {

    this.housekeeping_array_open=[];
    this.housekeeping_array_close=[];

    this.housekeeping_req = response.Returnvalue.Cleaning_service
    console.log('testttttt',this.housekeeping_req)
    for(var i=0;i<this.housekeeping_req.length;i++){
      if(this.housekeeping_req[i].ticketstatus=='OPEN'){
        this.housekeeping_array_open.push(this.housekeeping_req[i])
      }else{
        this.housekeeping_array_close.push(this.housekeeping_req[i])
      }
    }
  })
}

}
