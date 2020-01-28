import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqService {
  messages: BehaviorSubject<Array<Message>> = new BehaviorSubject([]);
  group: BehaviorSubject<String> = new BehaviorSubject("start");
  constructor() { 
  }
}
