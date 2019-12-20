import React, { createContext } from 'react'

const FirebaseContext = createContext({})


export const FirebaseProvider = FirebaseContext.Provider

export const FirebaseConsumer = FirebaseContext.Consumer

// wraps firebase consumer as a higher order component around the props
export const withFirebaseHOC = Component => props => (
    <FirebaseConsumer>
      {state => <Component {...props} firebase={state} />}
    </FirebaseConsumer>
  )