import { Component } from '@angular/core';
import { PushService } from './push.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private pushService: PushService,
    private http: HttpClient
  ) {
    if (!('serviceWorker' in navigator)) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      console.log('push isnt supported. show error page')
      return;
    }

    if (!('PushManager' in window)) {
       // Push isn't supported on this browser, disable or hide UI.
       console.log('push isnt supported. show error page');
       return;
    }
  }

  public registerServiceWorker() {
    this.pushService.registerServiceWorker()
    .then(this.pushService.askPermission)
    .then(this.pushService.subscribeUserToPush)
    .then(sub => {
      console.log('sending.. ', sub);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      return this.http.post<any>(`http://localhost:3000/sub`, sub, httpOptions);
    })
    .then(result => {
      result.subscribe(back => console.log(back));
    });
  }
}
