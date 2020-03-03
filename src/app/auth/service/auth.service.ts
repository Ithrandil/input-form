import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { AuthRootState, AuthSaveIdentity, AuthSaveToken } from './../store/auth.store';

@Injectable()
export class AuthService {
  private apiUrl: string = 'environment.api.authUrl';
  private loginEndpoint: string;
  private refreshTokenEndpoint: string;
  private accountEndpoint: string;

  @Select((state: AuthRootState) => state.auth.sessionToken)
  $token: Observable<string>;

  @Select((state: AuthRootState) => state.auth.identity)
  $userIdentity: Observable<any>;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {
    this.loginEndpoint = this.apiUrl + 'auth/authorize';
    this.refreshTokenEndpoint = this.apiUrl + 'auth/refresh-token';
    this.accountEndpoint = this.apiUrl + 'practitioners/me';
  }

  /**
   * This methods is used to login and extract JWT from response
   */
  public login(credentials): Observable<any> {
    return this.http
      .post(this.loginEndpoint, credentials, { observe: 'response' })
      .pipe(
        switchMap((response: HttpResponse<any>) => {
          const jwt: any = response.body;
          if (jwt) {
            return this.storeAuthenticationToken(jwt);
          }
          return of(true);
        }),
        switchMap(() => {
          return this.getIdentity();
        }),
        map(account => {
          if (account) {
            this.store.dispatch(new AuthSaveIdentity(account));
            // this.logger.debug('Authenticating user: ' + account.email);
          }
          return account;
        }),
      );
  }

  /**
   *     This methods is used to logout user from server
   *     and remove JWT from localstorage
   */
  public logout(): Observable<boolean> {
    this.devalidateSession();
    return of(true);
  }

  public devalidateSession(): void {
    this.storeAuthenticationToken(null).subscribe();
    this.store.dispatch(new AuthSaveIdentity(null));
  }

  public refreshToken(): Observable<string> {
    let token: string;
    if (localStorage.getItem('refreshToken') === null) {
      return of(null);
    }
    return this.http
      .get(this.refreshTokenEndpoint, {
        observe: 'response',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('refreshToken'),
        },
      })
      .pipe(
        switchMap((response: HttpResponse<any>) => {
          token = response.body;
          const jwt: any = response.body;
          if (jwt) {
            return this.storeAuthenticationToken(jwt);
          }
          return of(true);
        }),
        switchMap(() => {
          return this.getIdentity();
        }),
        map(account => {
          if (account) {
            this.store.dispatch(new AuthSaveIdentity(account));
            // this.logger.debug('Authenticating user: ' + account.email);
          }
          return token;
        }),
      );
  }

  // This will load the user identity from server if needed and return boolean
  public isAuthenticated(): Observable<boolean> {
    // We check if token is available first
    // We wait for the previous loading to finish before loading again
    // to avoir calling the server multiple times
    return this.$token.pipe(
      distinctUntilChanged(),
      switchMap(token => {
        if (!token || token === 'null') {
          if (localStorage.getItem('refreshToken') !== 'null') {
            return this.refreshToken();
          }
        }
        return of(token);
      }),
      switchMap(token => {
        if (!token) {
          return of(false);
        }
        return this.$userIdentity.pipe(
          switchMap(identity => {
            if (identity) {
              return of(true);
            } else {
              return this.getIdentity().pipe(
                switchMap(account => {
                  if (account) {
                    this.store.dispatch(new AuthSaveIdentity(account));
                    // this.logger.debug('Authenticating user: ' + account.login);
                    return of(true);
                  } else {
                    this.devalidateSession();
                    return of(false);
                  }
                })
              );
            }
          })
        );
      })
    );
  }


  // *****************************
  // Private methods
  // *****************************

  private getIdentity(): Observable<any> {
    return this.http.get<any>(this.accountEndpoint);
  }

  private storeAuthenticationToken(jwt: any): Observable<void> {
    if (jwt !== null) {
      localStorage.setItem('refreshToken', jwt.refreshToken);
      return this.store.dispatch(new AuthSaveToken(jwt));
    } else {
      localStorage.setItem('refreshToken', null);
      return this.store.dispatch(new AuthSaveToken(null));
    }
  }
}
