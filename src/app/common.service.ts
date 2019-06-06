import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  Trace():  Observable<object[]> {
       
    // const headers = new Headers({'Content-Type':'application/json'})
    // const options = new RequestOptions({ headers: headers });
    return this.http.get('https://hotel360.herokuapp.com/Hotel_RES_Get_Select_QueryGuestTraces')
       .map(this.extractData)
       //.catch(this.handleErrorObservable);
  }
  

 frontdesk_request(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Query_Front_Desk_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

frontdesk_request_close(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Close_Front_Desk_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

housekeeping_request(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Query_Hk_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

housekeeping_request_close(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Close_HK_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

traveldesk_request(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Query_Categorywise_Front_Desk_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

laundry_request(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Query_Laundry_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

food_request(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Query_Foodandbeverage_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

food_request_close(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Close_Foodandbeverage_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

maintenance_request(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Query_Hk_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

maintenance_request_close(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Close_HK_Request',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

profile_create(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Insert_Guest_Profile',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

profile_select(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Select_Guest_Profile',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

profile_update_request(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Update_Guest_profile',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

reservation_create(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Add_Guest_Details',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

reservation_select_room(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Select_Hotel_Room',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

reservation_details(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Query_Guest_Details',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

reservation_update_details(param):  Observable<object[]> {
       
  const headers = new Headers({'Content-Type':'application/json'})
  const options = new RequestOptions({ headers: headers });
 return this.http.post('https://mos-android.herokuapp.com/Edit_Guest_Details',param,options)
    .map(this.extractData)
    //.catch(this.handleErrorObservable);
}

  private extractData(res: Response) {
    //alert('hai20')
    console.log('res========---===='+res);
    let body = res.json();   
    //alert(JSON.stringify(body))
    console.log(JSON.stringify(body));
        return body;
    }

}
