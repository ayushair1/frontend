import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
// import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.css']
})
export class TaskAddEditComponent implements OnInit{
  taskForm: FormGroup;
  userIds:any[]=[];
  // assignee: String[]=[
  //   'gyani',
  //   'lokesh',
  
  // ]

  constructor(private _fb:FormBuilder,
    private _taskservice: UserService,
    private datePipe: DatePipe,
    private _dialogref: MatDialogRef<TaskAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.taskForm = this._fb.group({
      taskName: '',
      taskDescription: '',
      taskCreatedDate: '',
      taskDueDate: '',
      currentStatus: '',
      assignee: this._fb.group({
        user_id: '',
        role: 'Developer'
      })
      // assignee: '',
    });
  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.data);
    this.loadUserIdsForRole('Developer');
  }

  // formatDate(inputDate: any) {
  //   const date = new Date(inputDate); // Create a Date object from the input string
  //   if (isNaN(date.getTime())) {
  //     console.error('Invalid date');
  //     return ''; // Return an empty string or handle the error accordingly
  //   }
  
  //   const year = date.getFullYear(); // Get the year
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (adding 1 as months are zero-indexed)
  //   const day = String(date.getDate()).padStart(2, '0'); // Get the day
  
  //   return `${year}/${month}/${day}`; // Return the date in yyyy/mm/dd format
  // }

  loadUserIdsForRole(role: string): void {
    this._taskservice.getUserIdsForRole(role).subscribe(
      (data: any[]) => {
        console.log("data get userid",data);
        this.userIds = data;
      },
      (error) => {
        console.error('Error fetching user IDs:', error);
      }
    );
  }



  formatDate(event: any): void {
    if (event.value) {
      const formattedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
      this.taskForm.patchValue({ taskCreatedDate: formattedDate });
    }
  }
  formatDate2(event: any): void {
    if (event.value) {
      const formattedDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');
      this.taskForm.patchValue({ taskDueDate: formattedDate });
    }
  }


  onFormSubmit() {
    // const formattedDate = this.formatDate(this.taskForm.value.taskCreatedDate);
    // this.taskForm.patchValue({ taskCreatedDate: formattedDate });


    // const formattedDate1 = this.formatDate(this.taskForm.value.taskDueDate);
    // this.taskForm.patchValue({ taskDueDate: formattedDate1 });
    // console.log(this.taskForm.value.taskCreatedDate);

    if (this.taskForm.valid) {

      console.log("edit data update",this.data);
      if(this.data){

        console.log("task data id",this.data);
        console.log("task form data",this.taskForm.value);
        this._taskservice.updateTask(this.data.taskId, this.taskForm.value)
        .subscribe({
          next: (val: any) => {
            // alert('Task update');
            this._coreService.openSnackBar('Task update','done');
          
            this._dialogref.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          },
        });
      }else{

        console.log("hsjbxj",this.taskForm.value);
      this._taskservice.addTask(this.taskForm.value).subscribe({
        next: (val: any) => {
          // alert('Task added successfully');
          this._coreService.openSnackBar('Task added successfully','done');
          
          this._dialogref.close(true);
        },
        error: (err: any) =>{
          console.error(err);
        },
      });
    }
    }
  }


}
