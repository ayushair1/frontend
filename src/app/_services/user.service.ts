import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/auth';
  apiUrl = 'http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/manager/task';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(private httpclient: HttpClient,
    private userAuthService: UserAuthService
    
    ) { }

    public userId:any;

    setUserId(userId:any): void {
    this.userId = userId;
    }

    getUserId():any | null {
      return this.userId;
    }

      public login(loginData: any) {


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



      addUser(data:any):Observable<any>{
        return this.httpclient.post('http://184.72.194.67:8081/api/v1/auth/signup',data);
      }





      addTask(data:any):Observable<any>{
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        console.log(auth_token);
        console.log(data);
        console.log(this.apiUrl);
        return this.httpclient.post(this.apiUrl,data,{ headers: headers });
      }

      updateTask(id:number,data:any):Observable<any>{
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        // console.log(auth_token);
        console.log(data,id);
        
        // console.log(this.apiUrl);
        return this.httpclient.put(`http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/manager/task/${id}`,data,requestOptions);
      }


      updateTaskDev(id:number,data:any):Observable<any>{
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        // console.log(auth_token);
        console.log(data,id);
        
        // console.log(this.apiUrl);
        return this.httpclient.put(`http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/developer/task/${id}`,data,requestOptions);
      }
      // public createTask(taskData: any): Observable<any> {
      //   return this.httpclient.post<any>(this.apiUrl, taskData);
      // }
      getTaskList():Observable<any>{
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        console.log(auth_token);
        return this.httpclient.get(this.apiUrl,{ headers: headers });
      }

      deleteTask(id: number): Observable<any> {
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        console.log(auth_token);
        return this.httpclient.delete(`http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/manager/task/${id}`,requestOptions);
      }
      getUserIdsForRole(role: string): Observable<any[]> {
        console.log("husx");
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        console.log(auth_token);
        return this.httpclient.get<any[]>(`http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/manager/task/role/${role}`,requestOptions);
      }







      updateTask1(id:number,data:any):Observable<any>{
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        // console.log(auth_token);
        console.log(data,id);
        
        // console.log(this.apiUrl);
        return this.httpclient.put(`http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/developer/task/${id}`,data,requestOptions);
      }
      // public createTask(taskData: any): Observable<any> {
      //   return this.httpclient.post<any>(this.apiUrl, taskData);
      // }
      getTaskList1(id:number):Observable<any>{
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        console.log("id curre",id);
        // return this.httpclient.get('http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/developer/task',{ headers: headers });
        return this.httpclient.get(`http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/developer/user/${id}`,{ headers: headers });
      }

      deleteTask1(id: number): Observable<any> {
        const auth_token=sessionStorage.getItem("token")
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        const requestOptions = { headers: headers };
        console.log(auth_token);
        return this.httpclient.delete(`http://ec2-18-209-172-205.compute-1.amazonaws.com:8090/api/v1/developer/task/${id}`,requestOptions);
      }

}
