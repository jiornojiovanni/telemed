import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Visit } from '../visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  getVisitList() {
    const reqHeader = this.authService.getHeaderWithBearer();

    return this.httpClient.get<any>("https://" + environment.apiLocation + ":8080" + '/visit',{
      headers: reqHeader,
      observe: 'response'
    });
  }

  createVisit(visit: Visit) {
    const reqHeader = this.authService.getHeaderWithBearer();

    return this.httpClient.put<any>("https://" + environment.apiLocation + ":8080" + '/visit', visit,{
      headers: reqHeader,
      observe: 'response'
    });
  }

  getVisitPartecipants(visitID: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("visitID", visitID);
    const reqHeader = this.authService.getHeaderWithBearer();

    return this.httpClient.get<any>("https://" + environment.apiLocation + ":8080" + '/visitpartecipants',{
      headers: reqHeader,
      params: queryParams,
      observe: 'response'
    });
  }

  updateJoinTime(visitID: number) {
    const reqHeader = this.authService.getHeaderWithBearer();
    return this.httpClient.post<any>("https://" + environment.apiLocation + ":8080" + '/updatevisit', { visitID: visitID }, {
      headers: reqHeader,
      observe: 'response'
    });
  }

  //Can be called multiple times with no problems in the same call
  startVisit(visitID: number) {
    const reqHeader = this.authService.getHeaderWithBearer();
    return this.httpClient.post<any>("https://" + environment.apiLocation + ":8080" + '/startvisit', { visitID: visitID }, {
      headers: reqHeader,
      observe: 'response'
    });
  }

  //Same for stopvisit
  stopVisit(visitID: number) {
    const reqHeader = this.authService.getHeaderWithBearer();
    return this.httpClient.post<any>("https://" + environment.apiLocation + ":8080" + '/stopvisit', { visitID: visitID }, {
      headers: reqHeader,
      observe: 'response'
    });
  }
}
