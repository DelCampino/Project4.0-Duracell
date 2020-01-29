import { Timestamp } from 'rxjs';

export class Message {
    constructor(
        private message: String,
        private timestamp: Date,
        private otherMessages: Array<MessageSmall>
    ) {

    }
}

export class MessageSmall {
    constructor(
        private message: String,
        private timestamp: Date,
        ) {
    }
}