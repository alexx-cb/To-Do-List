import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';





// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings

    apiKey: "AIzaSyBMlcrRadZ0jlTNqMe8-NkgRw0BkDwJwWQ",
    authDomain: "testfrclase.firebaseapp.com",
    projectId: "testfrclase",
    storageBucket: "testfrclase.firebasestorage.app",
    messagingSenderId: "357066239918",
    appId: "1:357066239918:web:603fefeff23d728b4ba23f",
    measurementId: "G-QML04LB5ZL"
})
const authGit = getAuth(firebaseApp);
const provider = new GithubAuthProvider();

// used for the firestore refs
const db = getFirestore(firebaseApp)
export { authGit, provider };