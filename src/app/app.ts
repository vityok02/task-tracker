import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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
    else {
      this.router.navigate(['/projects']);
    }
  }
}
