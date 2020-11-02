import { Message, Stock } from "../types";
import axios from "axios";
const author = "stock-bot";

const COMMAND_IS_NOT_VALID: Message = {
  author,
  message: "Provided command is not valid.",
  timestamp: new Date(),
};

const REQUEST_EXECUTION_FAILED: Message = {
  author,
  message: "Command execution failed.",
  timestamp: new Date(),
};

class Bot {
  url = (code: string) =>
    `https://stooq.com/q/l/?s=${code}&f=sd2t2ohlcv&h&e=csv`;

  getStockFromData(data: string): Stock {
    const headersData = data.split("\r\n")[0].split(",");
    const stock: Stock & any = {};
    data
      .split("\r\n")[1]
      .split(",")
      .forEach((item, idx) => {
        stock[headersData[idx]] = item;
      });

    return stock;
  }

  getMessage(csv: any): Message {
    const { Symbol, Close } = this.getStockFromData(csv);
    return {
      author,
      message: `${Symbol} quote is $${Close} per share`,
      timestamp: new Date(),
    };
  }

  getStockCodeFromMessage(msg: Message) {
    const { message } = msg;
    let code;
    if (message.startsWith("/stock_code=")) {
      code = message.split("=")[1];
      if (code && code !== "") return code;
      throw new Error(REQUEST_EXECUTION_FAILED.message);
    }

    if (message.startsWith("/")) throw new Error(COMMAND_IS_NOT_VALID.message);

    return null;
  }

  async getData(command: string) {
    return axios.get(this.url(command));
  }
}

export default Bot;
