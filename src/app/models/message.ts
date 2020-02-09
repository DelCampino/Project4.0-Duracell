import { Timestamp } from 'rxjs';

export class Message {
    constructor(
        public message: String,
        public timestamp: Date
    ) {

    }
}