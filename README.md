# stock
stock project contains three different components:

* A NodeJS + Socket.IO + Typescript based API that provides a chatroom API to get access to stock quote data through symbol codes.
* A React + Typescript based client to visualize room and get access to it.
* A NodeJS based bot that is able to send messages to the external quote source and process messages.


## Local Setup

* Prerequisite 1: a local MongoDB instance
* Prerequisite 2: NodeJS 11+

1. Clone code from repo
2. cd into api folder and run:

    ```sh
     cp .env.example .env
    ```

3. cd into api folder, and run:

   ```sh
     npm install
   ```

   and then run

   ```sh
     npm start
   ```

4. cd into app folder, and run:

   ```sh
     npm install
   ``
   and then run
   ```sh
     npm start
   ```

## Dev comments

In order to accomplish as much as possible considering time restrictions, I've not implemented the authententication and message broker requirements (total time invested: ~4.5hs).
