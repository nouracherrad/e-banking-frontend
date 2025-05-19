import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit {

constructor(public authService : AuthService , private router: Router) {}
  ngOnInit() {
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login")
  }
}
