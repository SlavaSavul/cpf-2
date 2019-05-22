import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    if(localStorage.getItem('role') === 'admin') {
      return true;
    }
    this.router.navigate(['/notfound'], {
      queryParams: {
        return: state.url
      }
    });
    return false;
  }
}
