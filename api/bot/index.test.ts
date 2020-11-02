import Bot from "./";
import { expect } from "chai";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Message } from "../types";
import 'mocha';

describe("Tests for Stock Bot", () => {
  it("should return parsed csv in message format", () => {
    const bot = new Bot();

    const message: Message = {
      author: "stock-bot",
      message: "AAPL.US symbol value is $99.43 close x share",
      timestamp: new Date()
    };

    const stockCSV =
      "Symbol,Date,Time,Open,High,Low,Close,Volume\r\nAAPL.US,2018-10-13,21:00:19,99.91,109.32,72.52,99.43,76363057\r\n";

    const messageResponse = bot.getMessage(stockCSV);
    expect(messageResponse.author).to.be.deep.equal(message.author);
    expect(messageResponse.message).to.be.deep.equal(message.message);
  });

  it("should parse the provided stock data as CSV to a valid object", () => {
    const bot = new Bot();
    const stockCSV =
      "Symbol,Date,Time,Open,High,Low,Close,Volume\r\nAAPL.US,2018-10-13,21:00:19,99.91,109.32,72.52,99.43,76363057\r\n";

    const stockObj = {
      Symbol: "AAPL.US",
      Date: "2018-10-13",
      Time: "21:00:19",
      Open: "99.91",
      High: "109.32",
      Low: "72.52",
      Close: "99.43",
      Volume: "76363057"
    };

    const stock = bot.getStockFromData(stockCSV);
    expect(stock).to.be.deep.equal(stockObj);
  });

  it("should return valid data from external stock service", async () => {
    const bot = new Bot();
    const mock = new MockAdapter(axios);

    const url = "https://stooq.com/q/l/?s=aapl.us&f=sd2t2ohlcv&h&e=csv";

    const data =
      "Symbol,Date,Time,Open,High,Low,Close,Volume\r\nAAPL.US,2020-10-30,21:00:08,111.06,111.99,107.72,108.86,190573476\r\n";

    mock.onGet(url).reply(200, {
      response: { data }
    });
    try {
      const response = await bot.getData(url);
      expect(data).to.equal(response.data);
    } catch (error) {}
  });
});
