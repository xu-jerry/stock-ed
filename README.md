# StockEd

<img src="public/logo512.png" alt="logo" height="100"/>

\
StockEd is a group project created for UCLA's CS35L spring 2021 course. It is a fun, interactive web app that helps users of all ages develop financial literacy by mimicking the fluctuations of the stock market and allowing users to simulate realistic experiences in the stock market without having to suffer the potential financial consequences.

# Usage
To run StockEd on your local computer, here are the steps you should take.
1. First clone the repo to your local drive with Github Desktop or navigate to the directory you wish to download the repository to. Then, type this into your terminal or command line: 
    ```
    git clone https://github.com/xu-jerry/stock-ed.git 
    ``` 
2. Navigate into the directory witht the following command: 
    ```
    cd stock-ed
    ```
2. Now enter the following command to install all the required node dependencies (Make sure you have both Node and npm installed!):
    ```
    npm install
    ```
3. Before running the app, you must first create a file named `.env` in the project with the Firebase config object. For more on setting up a Firebase project refer to [here](https://firebase.google.com/docs/web/setup#add_firebase_to_your_app). The instructions on getting the Firebase config object can be found [here](https://support.google.com/firebase/answer/7015592#zippy=%2Cin-this-article). 

4. After getting the Firebase config, the `.env` file should be formated like this: (the provided values from your Firebase config can be placed between the double quotes for each field):
    ```
    REACT_APP_DB_API_KEY=""
    REACT_APP_DB_AUTH_DOMAIN=""
    REACT_APP_DB_DATABASE_URL=""
    REACT_APP_DB_PROJECT_ID=""
    REACT_APP_DB_STORAGE_BUCKET=""
    REACT_APP_DB_MESSAGING_SENDER_ID=""
    REACT_APP_DB_APP_ID=""
    REACT_APP_DB_MEASUREMENT_ID=""
    ```
5. Then, Email/Password should be enabled as a sign-in provider in the Firebase console (under the **Auth** section, on the **Sign in method** tab)
6. Navigate to the Firestore Database section and create a new collection called **Users**.
7. Now use the following command: 
    ```
    npm run dev
    ```
    This will run both the front-end React app on port 3000 and back-end Express.js server on port 3001.

Now, your website should be visible at http://localhost:3000. Check out the about page, create an account and log in to see more of the features! Congrats on taking your first step to greater financial literacy.

# Contributors
Thank you to the following for creating this project:  
[Jason Tay](https://github.com/jason2020)  
[Kevin Wang](https://github.com/kwang1083)  
[Arpit Jalan](https://github.com/arpitjalan18)  
[James Guo](https://github.com/jamesg6197)  
[Annie Wang](https://github.com/anicawang)  
[Jerry Xu](https://github.com/xu-jerry)