import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private builder: FormBuilder, private service: UserService, private router: Router
) {
 
  }
  departmentList : any = []
 
  ngOnInit(): void {
  
   
  }
  
  
 
  registerform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    role: this.builder.control('', Validators.required), 
  });
  proceedregister() {
    console.log("this.registerform",this.registerform.value)
    // if (this.registerform.valid) {
      console.log("registerform",this.registerform.value)
      this.service.addUser(this.registerform.value).subscribe(result => {
        this.router.navigate(['login'])
      });
    // } else {
      
    //   alert("please enter valid data")
    // }
  }

}
