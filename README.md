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
- **_Kitchen_** shows list of meals that have to be prepared by the cooks
- **_Printer_** for tickets printing on different thermal printers
- **_Assets_** for management of totem assets
- **_Secure_** backend access from external mobile app will be handled by this middleware
- **_Payments_** backend service for totem/posnet interface


### RestFULL Back-end | Server app

- Node
- express
- body-parser
- Sequelize
- MySQL
- bcrypt
- cors

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

### Front-end for Kitchen monitor | Kitchen app

- React.js
- axios
- Bootstrap
- Webpack
- Babel

### Print server | Printer app

- Node
- express
- body-parser
- node-thermal-printer

### Fiscal printer server | Fiscal Printer app

- Node
- express
- body-parser
- edge-js
- node-thermal-printer

### Assets server | Assets app

- Node
- express
- body-parser
- multer

### Payments server | Payments app

- Node
- express
- Morgan

### Secure middleware server | Secure app

- Node
- express
- jsonwebtoken
- request

## Instructions to run the system

- Clone this repo into your computer
- You will get the following sub-folders: **server**, **assets-server** **admin**, **totem**, **printer**, **fiscal-printer**, **payment-server**, **kitchen** and **client** (deprecated)

  - Inside **server** folder run:

    `npm install`

    `nodemon`

    Server will run at port 3000

    Database will be generated automatically

  - Inside **admin** folder run:

    `npm install`

    `npm run serve`

    Admin app will run at port 4000 and your browser will open automatically

  - (Deprecated) Inside **client** run:

    `npm install`

    `npm run dev`

    Client app will run at port 8090 and your browser will open automatically

  - Inside **totem** run:

    `npm install`

    `npm run serve`

    Totem app will run at port 5000

  - Inside **turns** run:

    `npm install`

    `npm run start:dev`

    Turns app will run at port 5030

  - Inside **kitchen** run:

    `npm install`

    `npm run start:dev`

    Kitchen app will run at port 5020

  - Inside **printer** folder run:

    `npm install`

    `nodemon`

    Print server will run at port 3020

  - Inside **fiscal-printer** folder run:

    `npm install`

    `nodemon`

    Fiscal printer server will run at port 3060

  - Inside **assets-server** folder run:

    `npm install`

    `nodemon`

    Assets server will run at port 3010

  - Inside **secure-server** folder run:

    `npm install`

    `nodemon`

    Secure server will run at port 3040

  - Inside **payment-server** folder run:

    `npm install`

    `nodemon`

    Secure server will run at port 3030
