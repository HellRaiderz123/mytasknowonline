import { Injectable } from '@angular/core';
import { UserDet } from '../loginService/user.model';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskUsersService {

  users!:UserDet;

  constructor(
    private http: HttpClient,
    public  router:  Router,
  ) { }

  async postUserDataOnReg(user: UserDet) {
    return this.http.post(environment.backendHost+'/api/v1/users/',user);
  }

  async postUserDataOnPersonDataProfileEdit(user: UserDet) {
    console.log("user.getUserId()" + user.userId);
    return this.http.put(environment.backendHost+'/api/v1/users/'+user.userId,user);
  }

  async getUserDataByID(userId: string) {
    this.http.get<UserDet>(environment.backendHost+'/api/v1/users/'+userId).subscribe(data => {
        this.users = data;
        localStorage.setItem('userDet',JSON.stringify(data));
        this.router.navigate(['']);
    },
    error=> {
      console.log(error);
      this.router.navigate(['error']);
    });
  }

  getUserDataByIDDet(userId: string) {
    return this.http.get<UserDet>(environment.backendHost+'/api/v1/users/'+userId);
  }
}
