export interface Message {
  author: string;
  message: string;
  timestamp?: Date;
}

export interface State {
  input: string;
  messages: Message[];
  author: string;
}