import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestReaderService {

  // constructor(private http: HttpClient) { }

  // getLocalJSON$(): Observable<any>{
  //   return this.http.get(`../assets/tests-base/designer.json`);
  // }

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
        // console.log(data);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("../assets/tests-base/designer.json");
  }

}