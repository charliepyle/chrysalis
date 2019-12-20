# Chrysalis

## Running the app

```bash
cd chrysalis && npm install && cd ios && pod install --repo-update && cd .. && npx react-native run-ios --simulator="iPhone 11"
```

## Project Structure

this project is an amalgamation of three or four tutorials and a few hundred lines of code that i've written myself. until this point i'd never really made a react app before, let alone a react native one, so most of the confusion comes from the amalgamation of strategies that the different tutorials used to set it up. with that said, i've tried to not get too far into this project with bad practices, and as such here's the structure built so far

the project starts like all of them at App.js, which shows the appcontainer being wrapped by the firebase configs so that they can be passed around the app. the appcontainer looks at the navigation folder, specifically the index.js file, which uses the logic in initial to determine whether it should send the user to the login/register page (auth) or the home page (app)

these are all in the navigation folder because they're all built on react navigation, the industry best-practice for native apps. it treats the screens on the app like a stack, so whenever the user navigates to a new screen it'll add a new screen to the stack and whenever they press the back button it'll pop it off the stack. the minor additional detail here is that the user shouldn't be able to press the back button on the bottom of the stack once they're logged in, for the only way to navigate to the auth page should be by pressing logout.

those pages reference the the screens of the app which can be found in the views folder.

the components folder holds components for the project. at least, that's what it will eventually do. right now there are several components that I haven't integrated into this folder as they're still tied with other pages and it'll take another few hours to reorganize all the functions and styles into here.

the config folder is a way to organize all integrations with external apps. always start with index.js when you're reading a folder cause that's where the program will start reading. this contains the firebase configs and then wraps that with a firebase higher order component. a higher order component is a function that takes in a component and decorates it with some additional functionality. there's also a createContext() call in here to provide a context API for this. 

then there's a hooks folder. to be honest i don't think i've really integrated this into the project but i modeled it off of this tutorial: https://www.freecodecamp.org/news/build-a-react-hooks-front-end-app-with-routing-and-authentication/ which is also where the reducers and actions come from.

in fact, that tutorial above motivates the reasoning behind most of this project structure. I'd skim over it to familiarize yourself with how react hooks can be used and how i'll likely integrate that into the rest of the app I've configured (the rest of the app meaning the image uploading and email authentication)

## License

[USC](https://viterbi-web.usc.edu/~aaroncot/)
