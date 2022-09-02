import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskHeaderComponent } from './task-header/task-header.component';
import { TaskHomeComponent } from './task-home/task-home.component';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { TaskLoginComponent } from './task-login/task-login.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BackendErrorComponent } from './backend-error/backend-error.component';

const firebaseConfig = {
  apiKey: "AIzaSyD0dazNOvb6bMqSNn2Qz0B7cUdtxPRGGbg",
  authDomain: "mytasknowco-9d4d5.firebaseapp.com",
  projectId: "mytasknowco-9d4d5",
  storageBucket: "mytasknowco-9d4d5.appspot.com",
  messagingSenderId: "12894406298",
  appId: "1:12894406298:web:09eaa89676904767158123"
};

@NgModule({
  declarations: [
    AppComponent,
    TaskHeaderComponent,
    TaskHomeComponent,
    TaskLoginComponent,
    BackendErrorComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
