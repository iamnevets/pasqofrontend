import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './components/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkLogin(route);
  }

  private checkLogin(route: ActivatedRouteSnapshot): boolean {
    if (route.url[0].path === 'login') {
      if (this.loginService.isLoggedIn()) {
        this.router.navigate(['/dasboarddisplay']);
        return false;
      }
      return true;
    }

    if (this.loginService.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl('home');
    return false;
  }
}
