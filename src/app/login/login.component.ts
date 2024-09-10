import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ''
})
export class LoginComponent implements OnInit {
  message: string = "Vous êtes déconnecté : pikachu/pikachu";
  name: string;
  password: string;
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  login() {
    this.authService.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          this.password = '';
          this.router.navigate(['/login']);
        }
      });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}