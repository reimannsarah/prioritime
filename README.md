# Prioritime
#### By Kyle Crawford, Emma Gerigscott, Thomas McDowell, Sarah Reimann

![sample of webapge](./src/assets/images/prioritime1.gif)
![sample of webpage](./src/assets/images/prioritime2.gif)

#### An app to help you make the most out of your free time.



## Technologies Used

* _HTML_
* _CSS_
* _JavaScript_
* _Webpack_
* _Dotenv_
* _npm_
* _Babel_
* _ESLint_
* _Jest_
* _Pantry_

## Description
In this app, you can enter the amount of free time you have on any given day of the week. It will then return an interactive card with your entered free time split into 15 minute blocks (demonstrated by small green squares). You can then add any activities or tasks you would like to accomplish and add and remove time blocks from the listed tasks. There is functionality to create a profile and save your data to that profile. If you leave and come back, you are able to enter the name of your profile and access the data you previously created. 

## Setup/Installation Requirements

* Clone this repository to your desktop.
* Navigate to the root of the project directory
* Install all packages with $ npm install.
* Create a .env file in the root of the project to save the Pantry ID
* Navigate to https://getpantry.cloud/#
* Enter you email address, then a name for your Pantry
* Save the generated Pantry ID in the .env file as such:

_.env_
```javascript
PANTRY_KEY={YOUR PANTRY KEY HERE}
```
* Start a development server with $ npm run start

## Known Bugs

* _When accessing an existing user profile, if you add another day, it writes over any day data that user previously had_
* _When accessing an exisiting user profile, you cannot add more activities to the day object that already exists in that profile_
*__

## License
Copyright (c) 2023 Kyle Crawford, Emma Gerigscott, Thomas McDowell, Sarah Reimann