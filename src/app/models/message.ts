import { Timestamp } from 'rxjs';

export class Message {
    constructor(
        private message: String,
        private timestamp: Date,

    ) {

    }
}
