import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqService {

  
  messages: BehaviorSubject<Array<Array<Message>>> = new BehaviorSubject([]);
  group: BehaviorSubject<String>;
  constructor() { 

      var afdeling = localStorage.getItem('afdeling');

      if(afdeling != null){
        this.group = new BehaviorSubject(afdeling);
      }else{
        this.group = new BehaviorSubject('start');
      }
  }
}
