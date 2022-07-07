import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Category } from '../../store/categories/categories.type'
const firebaseConfig = {
  apiKey: 'AIzaSyBlG-ljgl_pa8dUC0dOOjbRtzBBPnDK-W8',
  authDomain: 'coolclothing-db.firebaseapp.com',
  projectId: 'coolclothing-db',
  storageBucket: 'coolclothing-db.appspot.com',
  messagingSenderId: '557910957626',
  appId: '1:557910957626:web:d8508153248acad9fadf03',
}
// Initialize Firebase
initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
export const db = getFirestore()

export type objectToAdd = {
  title: string
}
export const addCollectionAndDocuments = async <T extends objectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })
  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category)
}

export type options = {
  displayName?: string
}
export type UserData = {
  createdAt: Date
  email: string
  displayName: string
}
export const createUserDocFromAuth = async (
  userAuth: User,
  options?: options
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...options,
      })
    } catch (err) {
      console.log('error creating the user', err)
    }
  }
  console.log(userSnapshot)
  return userSnapshot as QueryDocumentSnapshot<UserData>
}
//sign up
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}
export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback)

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject
    )
  })
}
