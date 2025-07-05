import { Component, inject, input, OnInit, signal } from '@angular/core';
import { UserResponse } from '../models/user-response';
import { UserService } from '../user.service';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile-page.component.html',
  styles: ``
})
export class ProfilePageComponent implements OnInit {
  private readonly userService = inject(UserService);
  protected id = input.required<string>();

  private readonly currentUserService = inject(CurrentUserService);
  protected user = signal<UserResponse | null>(null);

  ngOnInit() {
    this.loadUser();

    this.currentUserService.user$.subscribe(user => {
      this.user.set(user);
    });
  }

  protected uploadFile(event: any) {
    const file: File = event.target.files[0];

    if (!file) {
      return;
    }

    this.userService.uploadAvatar(file).subscribe(response => {
      const user = this.currentUserService.userSubject$.value;

      if (user) {
        const updatedUser = { ...user, avatarUrl: response.fileUrl + '?t=' + Date.now() };
        this.currentUserService.setCurrentUser(updatedUser);
      }
    });
  }

  private loadUser() {
    this.userService.getById(this.id()).subscribe(user => {
      this.currentUserService.setCurrentUser(user);
    });
  }
}
