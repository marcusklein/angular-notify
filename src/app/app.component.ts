import { Component } from '@angular/core';
import { PushService } from './push.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private pushService: PushService
  ) {
    if (!('serviceWorker' in navigator)) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      console.log('push isnt supported. show error page')
      return;
    }

    if (!('PushManager' in window)) {
       // Push isn't supported on this browser, disable or hide UI.
       console.log('push isnt supported. show error page')
       return;
    }
  }

  public registerServiceWorker() {
    this.pushService.register();
  }
}
