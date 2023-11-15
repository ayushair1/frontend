import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login(loginForm: NgForm) {
    // console.log(loginForm.value);
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRole(response.role);
        this.userAuthService.setToken(response.jwtToken);
        const role = response.role;
        if (role === 'Manager') {
          this.router.navigate(['/manager']);
        } else {
          this.router.navigate(['/developer']);
        }
        // console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

