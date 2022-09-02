import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import * as auth from 'firebase/auth';
// import { User } from  'firebase';
import { UserDet } from './user.model';
import { TaskUsersService } from '../userService/task-users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskBasicAuthService {

  authUser: any;
  users!: UserDet;
 

 constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public taskUsersService: TaskUsersService
  ) { 

      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.authUser = user;
          localStorage.setItem('user', JSON.stringify(this.authUser));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    }

   basicAuthService(username:string, password: string): boolean {
    if(username=='admin@xyz.com' && password =='root123') 
      return true;
    else
      return false;
  }


  async login(email: string, password: string){
    await this.afAuth.signInWithEmailAndPassword(email, password);
    return new Promise ( resolve => {
      this.afAuth.authState.subscribe(async user => {
        if (user){
          // this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          //Need to get User Det with User iD and set to localStorage
          await this.taskUsersService.getUserDataByID(JSON.parse(JSON.stringify(user)).uid);
        }
        else {
          localStorage.setItem('user', 'null');
        }
        })
      });
  }

  async register(email: string, password: string, fullName: string) {
     var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
     this.sendEmailVerification();
     this.afAuth.authState.subscribe(async user => {
      if (user){
        localStorage.setItem('user', "");
        //this.user = user;
        //User - add details Api call
        this.authUser = JSON.parse(JSON.stringify(user));
        this.users.userId = (this.authUser.uid);
        this.users.userEmail = (this.authUser.email);
        this.users.userName = (fullName);
        //calling end point
        (await this.taskUsersService.postUserDataOnReg(this.users)).subscribe();
      } else {
        localStorage.setItem('user', "");
      }
    });
    this.router.navigate(['']);
  }

  async sendEmailVerification() {
    return this.afAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
}

async logout(){
  await this.afAuth.signOut().then( () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userDet');
  });

}

get isLoggedIn(): boolean{
  const  user  =  JSON.parse(localStorage.getItem('userDet')!);
  // console.log('here in isLOggedIN and return ' +  (user  !==  null));
  return  user  !==  null;
}

async  loginWithGoogle(){
  await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  this.router.navigate(['admin/list']);
}

getUserDetails() : UserDet {
  return this.users;
}

}
