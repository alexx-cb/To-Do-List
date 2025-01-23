import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { conexion } from './firebaseApiKey';




// ... other firebase imports

export const firebaseApp = initializeApp(conexion);
const authGit = getAuth(firebaseApp);
const provider = new GithubAuthProvider();

// used for the firestore refs
const db = getFirestore(firebaseApp)
export { authGit, provider };