# totem

### A web app for kiosks/totems

It is a requirement from a fast food owner to allow
customers to buy food from a kiosk/totem

The application is compossed of 3 apps:

- **_Server_** for the backend
- **_Admin_** for front-end general features management
- **_Client_** (deprecated) for customer purchase of products that will run on the kiosk/totem
- **_Totem_** for customer products purchase. It will run on the kiosk/totem hardware. It replaces Client front-end app
- **_Turns_** shows the current order under preparation and the done ones
- **_Printer_** for tickets printing on different thermal printers

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
- Babel

### (Deprecated) Front-end for Kiosk | Client app

- Vue.js
- Vuex
- axios
- Vue Material
- Webpack
- Babel

### Front-end for Kiosk | Client app

- Vue.js
- Vuex
- axios
- Vuetify
- Webpack
- Babel

### Front-end for Turns monitor | Turns app

- React.js
- axios
- Bootstrap
- Webpack
- Babel

### Print server | Printer app

- Node
- Express
- node-thermal-printer

## Instructions to run the system

- Clone this repo into your computer
- You will get the following sub-folders: **server**, **admin**, **totem**, **printer** and **client** (deprecated)

  - Inside **server** folder run:

    `npm install`

    `nodemon`

    Server will run at port 3000

    Database will be generated automatically

  - Inside **admin** folder run:

    `npm install`

    `npm run serve`

    Admin app will run at port 8070 and your browser will open automatically

  - (Deprecated) Inside **client** run:

    `npm install`

    `npm run dev`

    Client app will run at port 8090 and your browser will open automatically

  - Inside **totem** run:

    `npm install`

    `npm run serve`

    Totem app will run at port 8080

  - Inside **turns** run:

    `npm install`

    `npm run start:dev`

    Totem app will run at port 3006

  - Inside **printer** folder run:

    `npm install`

    `nodemon`

    Print server will run at port 9000

[![DeepScan grade](https://deepscan.io/api/teams/2060/projects/3518/branches/31329/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2060&pid=3518&bid=31329)
