declare var require: any
require("dotenv").config();

const { MONGODB_URI } = process.env;
const log = console.log;

import { SocketChat } from "./chat";
import { connect, Error } from "mongoose";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

const app = new SocketChat().app;

connect(
  MONGODB_URI,
  (err: Error) => {
    if (err) {
      throw err.message;
    } else {
      log(`Connected to ${MONGODB_URI}`);
    }
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

export { app };
