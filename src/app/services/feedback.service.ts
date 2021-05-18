import { Injectable } from '@angular/core';

import { Feedback } from '../shared/feedback';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
      console.log('submitFeedback is working!');

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      console.log('Feedback: ', feedback);
  
      return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));

      return;
  }
}
