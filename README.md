# Chrysalis

## Running the app

```bash
cd chrysalis && npm install && cd ios && pod install --repo-update && cd .. && npx react-native run-ios --simulator="iPhone 11"
```

## Project Structure

App.js is the root of the project and contains the main app container which is surrounded by the Firebase context provider so that every child component has access if needed.

The appcontainer looks towards the Initial tab in the navigation folder. This performs a switch function, where if the user is logged in then it'll direct him/her to the app navigator and if not to the auth navigator.  

The server directory has access to the git module for the image processing, run in a docker container.  
The backend directory has three components to it. There's the application server, which runs on GraphQL-Yoga and lives on port 4000.  
The application server needs to talk through a data access layer to a DB and does so through Prisma server. The Prisma server is connected with a local MySQL database. Both of these live on docker, where the Prisma server sits on port 4466 and the MySQL database sits on port 3306. Instructions for running all three servers should be run as

```bash
cd backend && docker-compose up -d && node src/index.js
```

## Auth Navigator

The auth navigator consists of two views, a login screen and a signup screen, both of which reference firebase by calling useContext on the utility file in utils/firebase. The login view also has a "sign in with google" button which references the GoogleLogin button from the components section and a "sign in with facebook" button that does the same from the FB component. The style has largely been ignored for later as we've focused on the initial functionality and infrastructure to begin.

## App Navigator

The app navigator moves between the feed, swap, and home screens. The home screen allows users to see a feed of popular swapped images and upload photos of their own. tapping on an image in the swap screen sends the image to the server for modification. lastly, the profile page displays all swapped images created by the user.

The utils folder only contains the firebase context, but when we need to create other global contexts (for auth or other reasons) they should be put there. Components obviously go into the components folder, and static assets into the assets one. The navigation folder is in charge of handling all logic for the app/auth navigator and switching between the two. Lastly, firebase was initialized by using react-native-config with points to the .env file, which is uploaded to github so we all have access to it, but with that said, I know that it's not a best practice to have all the API keys posted online so I'd like to restructure that ASAP.

Find instructions for how to run the server in the server submodule of the app. i.e. click on the 'server' folder and there will be a readme in there with instructions. run the server on port 5000 as that's the way our file axios is configured to talk to it.

Cheers

## License

[USC](https://viterbi-web.usc.edu/~aaroncot/)
