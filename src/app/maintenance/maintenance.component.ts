import { Component, OnInit } from '@angular/core';
import {Router }from '@angular/router';
import {CommonService} from '../common.service';
import {ToastrService} from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
  providers:[CommonService]
})
export class MaintenanceComponent implements OnInit {

  constructor(private commonsevice:CommonService,private toastr:ToastrService) { }

  public maintenance_req:any
  public maintenance_array_open=[];
  public maintenance_array_close=[];

  ngOnInit() {

    this.getfrontdesk()
  }

  select(param){
    let body ={
      "ticket_no":param.ticket_no
    }
    this.commonsevice.maintenance_request_close(body).subscribe((response:any)=>{
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
  
      this.maintenance_array_open=[];
      this.maintenance_array_close=[];
  
      this.maintenance_req = response.Returnvalue.Maintenance_Service
      console.log('testttttt',this.maintenance_req)
      for(var i=0;i<this.maintenance_req.length;i++){
        if(this.maintenance_req[i].ticketstatus=='OPEN'){
          this.maintenance_array_open.push(this.maintenance_req[i])
        }else{
          this.maintenance_array_close.push(this.maintenance_req[i])
        }
      }
    })
  }

}
