import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input()
  email: string = '';
  @Input()
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Sign in to kWiz')
  }

  ngOnInit(): void {
    console.log('checking user details from cache....');
    // try to get from localStorage
    if (this.authService.isLoggedIn()) {
      console.log('loading user details from cache redirecting....');
      // if present redirect to homepage
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    this.authService.SignIn(this.email, this.password);
  }
}
