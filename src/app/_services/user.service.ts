import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:8090/api/v1/auth';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(private httpclient: HttpClient,
    private userAuthService: UserAuthService
    
    ) { }

      public login(loginData: any) {
        // console.log(loginData);
        return this.httpclient.post(this.PATH_OF_API + '/login', loginData, {
          headers: this.requestHeader,
        });
      }

      public roleMatch(allowedRole:string): boolean {
        let isMatch = false;
        const userRole: string | null = this.userAuthService.getRole();
    
        if (userRole != null &&  userRole === allowedRole)  {
          return true;
        } else {
          return false;
        }
      }

}
