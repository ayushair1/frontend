import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
// import { DialogRef } from '@angular/cdk/dialog';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-developer-task-edit',
  templateUrl: './developer-task-edit.component.html',
  styleUrls: ['./developer-task-edit.component.css']
})
export class DeveloperTaskEditComponent {

  taskForm: FormGroup;

  constructor(private _fb:FormBuilder,
    private _taskservice: UserService,
    private datePipe: DatePipe,
    private _dialogref: MatDialogRef<DeveloperTaskEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.taskForm = this._fb.group({
      taskName: '',
      taskDescription: '',
      currentStatus: ''
    });
  }



  onFormSubmit() {

    if (this.taskForm.valid) {

      console.log("edit data update",this.data);
      if(this.data){

        console.log("task data id",this.data);
        console.log("task form data",this.taskForm.value);
        this._taskservice.updateTaskDev(this.data.taskId, this.taskForm.value)
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

    }
    }
  }



}
