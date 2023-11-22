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

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{
  filteredDataSource!: MatTableDataSource<any>; 
  constructor(private userAuthService:UserAuthService,
    private router:Router,
    public userService:UserService,
    private _dialog:MatDialog,
    private _coreService: CoreService
    ) {}
  // taskData: any = {
  //   taskName: '',
  //   taskDescription: '',
  //   taskDueDate: '',
  //   currentStatus: '',
  //   assignee: ''


  ngOnInit(): void{
    this.getTaskList();
  }

  openAddEditTaskForm(){
    const DialogRef=this._dialog.open(TaskAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next:(val)=> {
        if(val) {
          this.getTaskList();
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

  // openAddEditTaskForm(){
  //   this._dialog.open(TaskAddEditComponent);
  // }

  tableData:any;
  getTaskList(){
    this.userService.getTaskList().subscribe({
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


  applyFilter(event: Event) {
    console.log(Event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


  openEditForm(data:any){
    console.log("datajbjsx",data);
    const DialogRef=this._dialog.open(TaskAddEditComponent,{
      data,


  });


    DialogRef.afterClosed().subscribe({
      next:(val)=> {
        if(val) {
          console.log("call");
          this.getTaskList();
        }

      }
      
    });
    
    
  }


  


  // deleteEmployee(id: number) {
  //   this.userService.deleteTask(id).pipe(
  //     tap((res) => {
  //       console.log('Server response:', res); // Log the server response
  //       alert('Employee deleted');
  //       this.getTaskList();
  //     })
  //   ).subscribe({
  //     error: (err) => {
  //       // Check if the error is an actual error response from the server
  //       if (err.status !== 200) {
  //         // Display an alert with the error message
  //         alert('Error occurred while deleting employee: ' + err);
  //         console.error('Error occurred:', err);
  //       }
  //     }
  //   });
  // }

  deleteEmployee(id: number) {
  this.userService.deleteTask(id).subscribe({
    next: (res:any) => {
      // this._coreService.openSnackBar('Employee deleted!', 'done');
      // alert('Employee deleted');
      this._coreService.openSnackBar('Task Deleted','done');
      this.getTaskList();
    },
    error: (err) => {
      // alert('Employee deleted');
      this._coreService.openSnackBar('Task Deleted','done');
      this.getTaskList();
      // const errorStatus = err && err.status !== undefined ? err.status : 'Unknown';
      // alert('Error occurred while deleting employee. Status: ' + errorStatus);
      // console.error('Error occurred:', err);
    }
  });
}



  };


  // constructor(private userService: UserService,
  //   private userAuthService: UserAuthService,
  //   private router: Router
  // ) { }
  // createTask(): void {
  //   this.userService.createTask(this.taskData)
  //     .subscribe(
  //       response => {
  //         console.log('Task created:', response);
  //         // Optionally, perform actions after successful task creation
  //         // For example, show a success message or redirect to another page
  //       },
  //       error => {
  //         console.error('Error creating task:', error);
  //         // Handle error scenarios
  //       }
  //     );

//   }
// }


// deleteEmployee(id: number) {
//   this.userService.deleteTask(id).subscribe({
//     next: (res) => {
//       // this._coreService.openSnackBar('Employee deleted!', 'done');
//       alert('Employee deleted');
//       this.getTaskList();
//     },
//     error: (err) => {
//       // Display an alert with the error message
//       alert('Error occurred while deleting employee: ' + err);
//       // Optionally, perform additional error handling or log the error
//       console.error('Error occurred:', err);
//     }
//   });
// }