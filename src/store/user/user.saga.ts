import { takeLatest, call, all, put } from 'typed-redux-saga/macro'
import { USER_ACTION_TYPE } from './user.type'
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from './user.action'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  getCurrentUser,
  options,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.utils'
import { User } from 'firebase/auth'
export function* getSnapshotFromUserAuth(userAuth: User, options?: options) {
  try {
    const userSnapshot = yield* call(createUserDocFromAuth, userAuth, options)
    if (userSnapshot)
      // id is not in the userSnapshot.data() ,have to manually add it
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    yield* put(signInFailed(err as Error))
  }
}
export function* isUserAuth() {
  try {
    const user = yield* call(getCurrentUser)
    if (!user) return
    yield* call(getSnapshotFromUserAuth, user)
  } catch (err) {
    yield* put(signInFailed(err as Error))
  }
}
export function* emailSignIn({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    )
    if (userCredential) {
      const { user } = userCredential
      yield* call(getSnapshotFromUserAuth, user)
    }
  } catch (err) {
    yield* put(signInFailed(err as Error))
  }
}
export function* googleSignIn() {
  try {
    const { user } = yield* call(signInWithGooglePopup)
    yield* call(getSnapshotFromUserAuth, user)
  } catch (err) {
    yield* put(signInFailed(err as Error))
  }
}
export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    )
    if (userCredential) {
      const { user } = userCredential
      yield* put(signUpSuccess(user, { displayName }))
    }
  } catch (err) {
    yield* put(signUpFailed(err as Error))
  }
}

export function* SignOut() {
  try {
    yield* call(signOutUser)
    yield* put(signOutSuccess())
  } catch (err) {
    yield* put(signOutFailed(err as Error))
  }
}

export function* signInAfterSignUp({
  payload: { user, options },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, options)
}
export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuth)
}
export function* onEmailSignIn() {
  yield* takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, emailSignIn)
}
export function* onGoogleSignIn() {
  yield* takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, googleSignIn)
}
export function* onSignUp() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp)
}
export function* onSignOut() {
  yield* takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, SignOut)
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailSignIn),
    call(onGoogleSignIn),
    call(onSignUp),
    call(onSignUpSuccess),
    call(onSignOut),
  ])
}
