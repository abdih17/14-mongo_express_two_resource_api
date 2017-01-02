__Dual Resource Express API__
======
This server-side application creates a dual resource REST API using the MongoDB database to capture data on the different bank accounts customers may have as well as alerts they might receive. This project also allows users to interact with the database by from of POST, GET, PUT and DELETE requests via the terminal.

---
## Cloning the Repository
Clone down this repository:  https://github.com/abdih17/14-mongo_express_two_resource_api.git

```
$ git clone https://github.com/abdih17/14-mongo_express_two_resource_api.git
```

## Installation

Install any dependency from the `package.json` file into the project root
directory, and start the server.

```sh
$ cd lab-hawa
$ npm i
$ npm start
```

You should receive the following result: `Server up: 3000` or whichever port number you have preset as your environment variables.

You will also need to make another tab within the terminal to begin the process of running the Mongo database.

```sh
$ mongod
```

At the end of the message you should see `waiting for connections on port 27017`.

## Alert: POST, GET, PUT and DELETE Requests

**POST Request:**
The POST request must include content and timestamp parameters.

>**In an new terminal window, send a POST request by using the command:**
>`http POST localhost:3000/api/alert content="<content>" timestamp="<timestamp date>"`.

A successful response should return a JSON object with values you entered along with a unique **id number** and a status code of **200**.

**GET Request:**

>**In a new terminal window, send a `GET` request by using the command:**
>`http localhost:3000/api/alert?id=<id>`.

**PUT REQUEST:**

>**In a new terminal window, send a `GET` request by using the command:**
>`http localhost:3000/api/alert?id=<id> content="<update content>" timestamp="<update timestamp date>"`.


**DELETE Request:**

>**In a new terminal window, send a `DELETE` request by using the command:**
>`http DELETE localhost:8000/api/alert/<id>`

## Bank Account: POST, GET, PUT and DELETE Requests

**POST Request:**
The POST request must include name, bankAccount, and bankAccountName parameters.

>**In an new terminal window, send a POST request by using the command:**
>`http POST localhost:3000/api/alert/<alert id number> name="<name>" cardNumber="<a card number>"`.

A successful response should return a JSON object with values you entered along with a unique **id number** and a status code of **200**.

**GET Request:**

>**In a new terminal window, send a `GET` request by using the command:**
>`http localhost:3000/api/bankAccount?id=<id>`.

**PUT REQUEST:**

>**In a new terminal window, send a `GET` request by using the command:**
>`http localhost:3000/api/bankAccount?id=<id> name=<update name> cardNumber=<update card number>`.


**DELETE Request:**

>**In a new terminal window, send a `DELETE` request by using the command:**
>`http DELETE localhost:8000/api/bankAccount/<id>`

## Exit the Server

Go back to the terminal where your server is running with the port number and press **Ctrl+C** in order to exit the server.

---
