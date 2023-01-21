import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { auth } from 'firebase';
import { Observable, Subject } from 'rxjs';
import { AttemptedQuiz } from '../_models/attempted-quiz';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Observable<firebase.User | null>;
  private userDetails: firebase.User | null = null;
  private userStore: User | null = null;
  private userStoreSubject = new Subject<User>();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // save UserCredential in localStorage when SignIn
    angularFireAuth.setPersistence(auth.Auth.Persistence.LOCAL);
    this.user = this.angularFireAuth.authState;

    console.log('Auth Service Initialized');
    // check in localStorage
    var json = localStorage.getItem('user');
    if (json != null) {
      let user = JSON.parse(json);
      if (user != null) {
        console.log('cache hit');
        this.userDetails = user;
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    // subscribe for user changes i.e login, signout
    // and update the same to localStorage
    this.user.subscribe((user) => {
      // load from localStorage if present
      if (user) {
        this.userDetails = user;
        localStorage.setItem('user', JSON.stringify(user));
        var docRef = this.firestore.collection('users').doc(user.uid);
        docRef.get().subscribe((doc) => {
          if (doc.exists) {
            console.log('user have store object...');
            this.userStore = doc.data() as User;
          } else {
            console.log('user not have store object creating...');
            this.userStore = { ...new User(user.uid) };
            docRef.set(this.userStore);
          }
          this.userStoreSubject.next(this.userStore);
        });
      } else {
        this.userDetails = null;
        localStorage.removeItem('user'); // messes JSON.parse()
      }
    });
  }

  SignUp(displayName: string, email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user: auth.UserCredential) => {
        user.user
          ?.updateProfile({
            displayName: displayName,
          })
          .catch((err) => console.log('error adding displayName' + err));
        console.log(user);
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  SignOut() {
    // remove user from local storage
    localStorage.clear();
    this.userDetails = this.userStore = null;
    this.angularFireAuth.signOut();
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    let str = localStorage.getItem('user');
    if (str) return JSON.parse(str) != null;
    return false;
  }

  getUserStore() {
    if(this.userStore)
      return this.userStore
    return this.userStoreSubject;
  }

  // getUserDetails mean't for value read
  getUserDetails() {
    if (this.userDetails == null) throw new Error('Not Authenticated');
    return this.userDetails;
  }

  // getUser useful for subscribing changes to object
  getUser() {
    if (this.user == null) throw new Error('Not Authenticated');
    return this.user;
  }

  getDisplayName() {
    return this.getUserDetails().displayName;
  }

  getEmail() {
    return this.getUserDetails().email;
  }

  getPhotoUrl() {
    return this.getUserDetails().photoURL;
  }

  addUser(user: User) {
    return this.firestore
      .collection('users')
      .doc(user.uid)
      .set({ ...user });
  }

  getUserById(uid: string) {
    return this.firestore.collection('users').doc(uid).get();
  }

  /*
   * Get the Quiz + user value combined so that no need to get multiple times
   */
  getAttemptedQuizes() {
    return this.firestore
      .doc(`/users/${this.userDetails!.uid}`)
      .snapshotChanges();
  }

  addQuizAttempt(quiz: AttemptedQuiz) {
    if (this.userStore)
      return this.firestore.doc(`/users/${this.userDetails!.uid}`).update({
        attemptedQuizes: firebase.firestore.FieldValue.arrayUnion({
          ...quiz,
        }),
      });
    return Promise.reject(new Error('Not Authenticated'));
  }

  updateDisplayName(displayName: string) {
    if (this.userDetails)
      return this.userDetails.updateProfile({
        displayName: displayName,
      });
    return Promise.reject(new Error('Not Authenticated'));
  }

  updatePassword(newPassword: string) {
    return this.userDetails?.updatePassword(newPassword);
  }

  updatePhotoUrl(photoURL: string) {
    return this.userDetails?.updateProfile({
      photoURL: photoURL,
    });
  }
}
