# Chrysalis

## Running the app

```bash
cd chrysalis && npm install && cd ios && pod install --repo-update && cd .. && npx react-native run-ios --simulator="iPhone 11"
```

## Project Structure

App.js is the root of the project and contains the main app container which is surrounded by the Firebase context provider so that every child component has access if needed.

The appcontainer looks towards the Initial tab in the navigation folder. This performs a switch function, where if the user is logged in then it'll direct him/her to the app navigator and if not to the auth navigator.

## Auth Navigator

The auth navigator consists of two views, a login screen and a signup screen, both of which reference firebase by calling useContext on the utility file in utils/firebase. The login view also has a "sign in with google" button which references the GoogleLogin button from the components section. All of the fancy styling bits were gathered from a tutorial. The signup view was similarly taken from that tutorial. We still need to refactor the input forms and associated CSS for these pages.

## App Navigator

The app navigator only has one view right now, pointing to the home screen. It's a pretty rudimentary design but connects with the Firebase app. The home screen functionally communicates with the home screen but I still want to refactor the input code and its CSS as well.

The utils folder only contains the firebase context, but when we need to create other global contexts (for auth or other reasons) I think it makes sense to put them there. Components obviously go into the components folder, and static assets into the assets one. The navigation folder is in charge of handling all logic for the app/auth navigator and switching between the two. Lastly, firebase was initialized by using react-native-config with points to the .env file, which I'm going to upload to github just so you have access to it, but with that said, I know that it's not a best practice to have all the API keys posted online so I'd like to restructure that ASAP.

I feel much more comfortable with the architecture of this app after spending hours reconfiguring it to use only functional components with react hooks. This is more or less using state of the art techniques for building react/react-native apps which avoid complex topics like higher order components and modularize almost everything into functional, "stateless" components. Let me know if you have any questions about the design as I spent hours studying it and refactoring this to build it.

## License

[USC](https://viterbi-web.usc.edu/~aaroncot/)
