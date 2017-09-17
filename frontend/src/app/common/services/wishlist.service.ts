import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Wish} from '../models/wish.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WishListService {

  private BASE_URL = '/backend/api';

  constructor(private http: Http) {
  }

  public getWishes(): Observable<Wish[]> {
    return this.http.get(this.BASE_URL + '?page=0&size=200')
      .map((res: Response) => res.json().content)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public postWish(wish: Wish): Observable<Wish> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.BASE_URL, wish, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteWish(wish: Wish): Observable<Wish[]> {
    return this.http.delete(this.BASE_URL + '/' + wish.id)
      .map((res: Response) => res.json().content)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteAll(): Observable<string> {
    return this.http.delete(this.BASE_URL)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
