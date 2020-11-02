import React from "react";
import moment from "moment";
import "./chat.css";
import { Message, State } from "../../socket/types";
import { Context } from "../../socket/context";

class Chat extends React.Component {
  static contextType = Context;
  el: any;
  state: State & any = {
    messages: [
      {
        message:
          "Welcome to Stock Chat application. Please provide a command and/or message to start using it.",
        author: "stock-app",
      },
    ],
    input: "",
    author: "",
    startChat: false,
  };

  componentDidMount() {
    this.context.init();
    const observable = this.context.onMessage();
    observable.subscribe((m: Message) => {
      let messages = this.state.messages;
      messages.push(m);
      this.setState({ messages: messages.slice(-50) });
    });
  }

  componentWillUnmount() {
    this.context.disconnect();
  }

  render() {
    const updateInput = (e: React.ChangeEvent<HTMLInputElement>): void =>
      this.setState({ input: e.target.value });

    const updateAuthorInput = (e: React.ChangeEvent<HTMLInputElement>): void =>
      this.setState({ author: e.target.value });

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) =>
      e.key === "Enter" && handleMessage();

    const handleKeyPressStart = (e: React.KeyboardEvent<HTMLInputElement>) =>
      e.key === "Enter" && handleStart();

    const handleStart = (): void => this.setState({ startChat: true });

    const handleMessage = (): void => {
      const author: string = this.state.author || "Unknown";
      if (this.state.input !== "") {
        this.context.send({
          message: this.state.input,
          author,
        });
        this.setState({ input: "" });
      }
    };

    return (
      <div className="App">
        <div className="App-container">
          {this.state.messages.map((msg: Message, idx: number) => {
            return (
              <div
                className={
                  msg.author === this.state.author ? "owner-message" : ""
                }
                key={idx}
              >
                <div>
                  <p>{msg.author}</p>
                  <p style={{ fontSize: "smaller" }}>
                    {moment(msg.timestamp).format("LT")}
                  </p>
                  <p>{msg.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        {!this.state.startChat && (
          <>
            <input
              className="App-Textarea"
              placeholder="Please type your name..."
              onChange={updateAuthorInput}
              onKeyPress={handleKeyPressStart}
              value={this.state.author}
            />
            <button
              onClick={() => {
                handleStart();
              }}
            >
              Send
            </button>
          </>
        )}
        {this.state.startChat && (
          <>
            <input
              className="App-Textarea"
              placeholder="Please type your message..."
              onChange={updateInput}
              onKeyPress={handleKeyPress}
              value={this.state.input}
            />
            <p>
              <button
                onClick={() => {
                  handleMessage();
                }}
              >
                Send
              </button>
            </p>
          </>
        )}
      </div>
    );
  }
}

export default Chat;
