import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponent } from '../task-add-edit/task-add-edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private userAuthService:UserAuthService,
    private router:Router,
    public userService:UserService,
    private _dialog:MatDialog
    ) {}

  ngOnInit(): void{
    // this.getTaskList();
  }

   public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }


  openAddEditTaskForm(){
    // this._dialog.open(TaskAddEditComponent);
    // console.log("data curre");
    const DialogRef=this._dialog.open(TaskAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next:(val)=> {
        if(val) {
          console.log("true hai kya",val);
        }
      }
    });
  }





  // openAddEditTaskForm(){
  //   const DialogRef=this._dialog.open(TaskAddEditComponent);
  //   DialogRef.afterClosed().subscribe({
  //     next:(val)=> {
  //       if(val) {
  //         this.getTaskList();
  //       }
  //     }
  //   })
  // }

  // getTaskList(){
  //   this.userService.getTaskList().subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }
  
}
