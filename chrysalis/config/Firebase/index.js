import Firebase from './firebase'
import { FirebaseProvider, withFirebaseHOC } from './context'

export default Firebase

// this is kind of complex and i got it from a tutorial so I'm still trying to
// figure out what it's doing completely, but it's effectively exporting
// firebase configs and a higher order firebase component (higher order
// comp is a function that takes a component and returns a component as a method
// of padding it
export { FirebaseProvider, withFirebaseHOC }