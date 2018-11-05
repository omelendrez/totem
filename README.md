# totem
### A web app for kiosks/totems
It is a requirement from a fast food owner to allow
customers to buy food from a kiosk/totem

The application is compossed of 3 apps:
- ***Server*** for the backend
- ***Admin*** for front-end general features management
- ***Client*** for customer purchase of products that will run on the kiosk/totem

### RestFULL Back-end | Server app
- Node
- Express
- Sequelize
- MySQL


### Front-end for app Administration | Admin app
- Vue.js
- axios
- Vue Material
- Webpack

### Front-end for the Kiosk | Client app
- Vue.js
- Vuex
- axios
- Vue Material
- Webpack

## Instructions to run the system
- Clone this repo into your computer
- You will get the following sub-folders: **server**, **admin** and **client**

  - Inside **server** folder run:

    `npm install`

    `nodemon`

    Server will run at port 3000

    Database will be generated automatically

  - Inside **admin** folder run:

    `npm install`

    `npm run dev`

    Admin app will run at port 8080 and your browser will open automatically

  - Inside **client** run:

    `npm install`

    `npm run dev`

    Client app will run at port 8090 and your browser will open automatically

[![DeepScan grade](https://deepscan.io/api/teams/2060/projects/3518/branches/31329/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2060&pid=3518&bid=31329)