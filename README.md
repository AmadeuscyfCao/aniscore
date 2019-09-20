# Aniscore
## Intro
Aniscore is an app for scoring bangumi, implemented with reactjs, nodejs, express, mongodb and redux.

## Web View
### Home Page
This is the home page of the web app
![Home Page](./screenshots/homePage.png)

### Detail Page
This is the detail page of one bangumi
![Detail Page](./screenshots/detailPage.png)

### User Page
This is user page
![User Page](./screenshots/userPage.png)

## Run App Locally
To run the app locally, secrets.js file needs to be added to config folder. Mongodb needs to be signed on [mongo alias](https://cloud.mongodb.com/v2/5cd3536d79358e6972f80720#clusters).

Then, cd to the root directory, run
```unix
npm install
```
and 

```unix
cd client 
npm install
```

Open a window, and run the command
```unix
node server.js
```

In another window, cd to the root directory and run following commands
```unix
cd client
npm start
```

## Add Data to Mongodb
To add data to the mongodb, cd to the root directory and run following commands,
```unix
cd addAnime
```
Run the three files seperately with python3, passing year and season in the main function.
The year ranges from 2005-2019.