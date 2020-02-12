import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqService {

  messages: BehaviorSubject<Array<Array<Message>>> = new BehaviorSubject([]);
  group: BehaviorSubject<String>;
  
  constructor(private _httpClient: HttpClient) { 

      var afdeling = localStorage.getItem('afdeling');

      if(afdeling != null){
        this.group = new BehaviorSubject(afdeling);
      }
      else{
        this.group = new BehaviorSubject('start');
      }



      /*this.getAfdelingen().subscribe(result => {
        var groups = result;
        console.log(groups);
      });*/
  
  }

  /*getAfdelingen(){
    return this._httpClient.get("http://team4:team4@81.82.52.102:15672/api/exchanges/team4vhost");
  }*/

}
