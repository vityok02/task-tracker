import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }
}
