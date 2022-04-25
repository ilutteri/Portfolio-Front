import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProfile(): Observable<profile[]> {
    return this.http.get<profile[]>(`${this.apiURL}profile/get`);
  }

  public addProfile(experience: profile): Observable<profile> {
    return this.http.post<profile>(`${this.apiURL}profile/add`, experience);
  }

  public updateProfile(experience: profile): Observable<profile> {
    return this.http.put<profile>(`${this.apiURL}profile/update`, experience);
  }

}
