import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  constructor(private readonly router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('auth-token');

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;

        if (!token && currentUrl !== '/login') {
          this.router.navigate(['/login']);
        } else if (token && (currentUrl === '/' || currentUrl === '/login')) {
          this.router.navigate(['/projects']);
        }
      });
  }
}
