import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponse } from './models/user-response';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public userSubject$ = new BehaviorSubject<UserResponse | null>(null);
  public user$: Observable<UserResponse | null> = this.userSubject$.asObservable();

  setCurrentUser(user: UserResponse) {
    this.userSubject$.next(user);
  }
}
