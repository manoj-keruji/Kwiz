import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userDetails: firebase.User | null = null;
  username: string = '';
  photourl!: string | '';

  constructor(public authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) {
      authService
        .getUser()
        .subscribe((userDetails) => (this.userDetails = userDetails));
    }
    this.authService.getUser().subscribe((userDetails) => {
      if (userDetails) this.username = userDetails.displayName || '';
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((userDetails) => {
      if (userDetails) this.photourl = userDetails.photoURL || '../../assets/User.png';
    });
  }

  SignOut() {
    this.userDetails = null;
    this.authService.SignOut();
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
