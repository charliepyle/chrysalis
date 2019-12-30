import React from 'react';
import FirebaseProvider from './utils/firebase'
import AppContainer from './navigation';


// firebase provider is a global container around the app to provide global vars
// app container is pulled from the navigation folder, that folder first looks 
// at index.js. check there for further detail.
export default function App() {
  return (
    <FirebaseProvider >
      <AppContainer />
    </FirebaseProvider>
  );
}