import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    let v = this.authService.getUserStore();
    if (v instanceof Subject) {
      console.log("UserStore not yet initialized using observable instead")
      return v.pipe(
        take(1),
        map((user) => {
          console.log('checking for admin');
          console.log(user);
          if (user?.isAdmin) {
            return true;
          }
          console.log('not an admin user redirecting to home...');
          this.router.navigateByUrl('/');
          return false;
        })
      );
    }

    return v.isAdmin
  }
}
