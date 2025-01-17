import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
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

// used for the firestore refs
const db = getFirestore(firebaseApp)
