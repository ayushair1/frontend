import { Component , OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponent } from '../task-add-edit/task-add-edit.component';
import { tap } from 'rxjs';
import { CoreService } from '../core/core.service';
import { DeveloperTaskEditComponent } from '../developer-task-edit/developer-task-edit.component';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit{


  filteredDataSource!: MatTableDataSource<any>; 
  constructor(private userAuthService:UserAuthService,
    private router:Router,
    public userService:UserService,
    private _dialog:MatDialog,
    private _coreService: CoreService
    ) {}

ngOnInit(): void {
  console.log("curendj id3",this.userService.getUserId());
  this.getTaskList(this.userId);
}
// message: any;


openAddEditTaskForm(){
  const DialogRef=this._dialog.open(DeveloperTaskEditComponent);
  DialogRef.afterClosed().subscribe({
    next:(val)=> {
      if(val) {
        this.getTaskList(this.userId);
      }
    }
  });
}

displayedColumns: string[] = [
  'taskId',
  'taskName',
  'taskDescription',
  'taskCreatedDate',
  'taskDueDate',
  'CurrentStatus',
  'user_id',
  'role',
  'action',
];

dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  tableData:any;

  userId=this.userService.getUserId();
  
  getTaskList(id:number){
    id=this.userService.getUserId();
    console.log("curendj id",this.userService.getUserId());
    console.log("current userid :",id);
    this.userService.getTaskList1(id).subscribe({
      next: (res) => {
        this.tableData=res;
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort =this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  openEditForm(data:any){
    console.log("data on click",data);
    const DialogRef=this._dialog.open(DeveloperTaskEditComponent,{
      data,

  });

    DialogRef.afterClosed().subscribe({
      next:(val)=> {
        if(val) {
          this.getTaskList(this.userId);
        }
      }
    });
    
  }

  deleteEmployee(id: number) {
    this.userService.deleteTask1(id).subscribe({
      next: (res:any) => {
        // this._coreService.openSnackBar('Employee deleted!', 'done');
        // alert('Employee deleted');
        this._coreService.openSnackBar('Task Deleted','done');
        this.getTaskList(this.userId);
      },
      error: (err) => {
        // alert('Employee deleted');
        this._coreService.openSnackBar('Task Deleted','done');
        this.getTaskList(this.userId);
        // const errorStatus = err && err.status !== undefined ? err.status : 'Unknown';
        // alert('Error occurred while deleting employee. Status: ' + errorStatus);
        // console.error('Error occurred:', err);
      }
    });
  }








}
