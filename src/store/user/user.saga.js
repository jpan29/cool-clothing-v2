import { takeLatest, call, all, put } from 'redux-saga/effects'
import { USER_ACTION_TYPE } from './user.type'
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSuccess
} from './user.action'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser
} from '../../utils/firebase/firebase.utils'
export function* getSnapshotFromUserAuth (userAuth, options = {}) {
  try {
    const userSnapshot = yield call(createUserDocFromAuth, userAuth, options)
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))

  } catch (err) {
    yield put(signInFailed(err))
  }
}
export function* isUserAuth () {
  try {
    const user = yield call(getCurrentUser)
    if (!user) return
    yield call(getSnapshotFromUserAuth, user)

  }
  catch (err) {
    yield put(signInFailed(err))
  }
}
export function* emailSignIn ({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
    yield call(getSnapshotFromUserAuth, user)


  } catch (err) {
    yield put(signInFailed(err))
  }
}
export function* googleSignIn () {
  try {
    const { user } = yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUserAuth, user)


  } catch (err) {
    yield put(signInFailed(err))
  }
}
export function* signUp ({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
    yield put(signUpSuccess(user, { displayName }))
  } catch (err) {
    yield put(signUpFailed(err))
  }
}

export function* SignOut () {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (err) {
    yield put(signOutFailed(err))

  }

}

export function* signInAfterSignUp ({ payload: { user, options } }) {
  yield call(getSnapshotFromUserAuth, user, options)
}
export function* onSignUpSuccess () {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
}


export function* onCheckUserSession () {
  yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuth)
}
export function* onEmailSignIn () {
  yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, emailSignIn)
}
export function* onGoogleSignIn () {
  yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, googleSignIn)
}
export function* onSignUp () {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp)
}
export function* onSignOut () {
  yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, SignOut)
}


export function* userSaga () {
  yield all([call(onCheckUserSession),
  call(onEmailSignIn),
  call(onGoogleSignIn),
  call(onSignUp),
  call(onSignUpSuccess),
  call(onSignOut)])

}