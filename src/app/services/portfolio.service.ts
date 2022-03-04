import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiURL = "http://localhost:5000/"

  constructor(private http:HttpClient) { }

  obtenerDatos(s:string):Observable<any>{
    return this.http.get(this.apiURL + s);
  }

  delete(elemento:any, s:string):Observable<any>{
    const url = `${this.apiURL + s}/${elemento.id}`
    return this.http.delete<any>(url);
  }
}
