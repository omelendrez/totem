# totem

### A web app for kiosks/totems

It is a requirement from a fast food owner to allow
customers to buy food from a kiosk/totem

The application is compossed of 3 apps:

- **_Server_** for the backend
- **_Admin_** for front-end general features management
- **_Client_** (deprecated) for customer purchase of products that will run on the kiosk/totem
- **_Totem_** for customer products purchase. It will run on the kiosk/totem hardware. It replaces Client front-end app

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

### (Deprecated) Front-end for the Kiosk | Client app

- Vue.js
- Vuex
- axios
- Vue Material
- Webpack

### Front-end for the Kiosk | Client app

- Vue.js
- axios
- Vuetify
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

  - (Deprecated) Inside **client** run:

    `npm install`

    `npm run dev`

    Client app will run at port 8090 and your browser will open automatically

  - Inside **totem** run:

    `npm install`

    `npm run dev`

    Totem app will run at port 8081 and your browser will open automatically

[![DeepScan grade](https://deepscan.io/api/teams/2060/projects/3518/branches/31329/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2060&pid=3518&bid=31329)
