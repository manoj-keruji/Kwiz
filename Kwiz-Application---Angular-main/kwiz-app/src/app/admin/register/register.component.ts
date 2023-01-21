import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input()
  name: string = '';
  @Input()
  email: string = '';
  @Input()
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
    console.log('checking user details from cache....');
    // try to get from localStorage
    if (this.authService.isLoggedIn()) {
      console.log('loading user details from cache redirecting....');
      // if present redirect to homepage
      this.router.navigateByUrl('/home');
    }

    this.titleService.setTitle('Join kWiz')
  }

  ngOnInit(): void {}

  register() {
    this.authService.SignUp(this.name, this.email, this.password);
  }
}
