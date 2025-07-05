import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../../features/auth/token.service';
import { UserService } from '../../../features/user/user.service';
import { CurrentUserService } from '../../../features/user/current-user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);
  private readonly currentUserService = inject(CurrentUserService);

  protected user = this.currentUserService.user$;

  ngOnInit(): void {
    const claims = this.tokenService.parseToken();

    if (claims) {
      this.userService.getById(claims?.userId).subscribe(user => {
        this.currentUserService.setCurrentUser(user);
      });
    }
  }
}
