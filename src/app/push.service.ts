import { Injectable } from '@angular/core';

@Injectable()
export class PushService {

  private registraion: ServiceWorkerRegistration | void;
  private permission: NotificationPermission | void;

  constructor() { }

  private registerServiceWorker() {
    return navigator.serviceWorker.register('assets/service-worker.js')
    .then(function(registration) {
      console.log('Service worker successfully registered.');
      return registration;
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
  }

  private askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
  }

  public async register() {
    this.registerServiceWorker().then(reg => {
      this.registraion = reg;
      console.log(this.registraion);
      this.askPermission().then(permission => {
        this.permission = permission;
        console.log(this.permission);
      });
    });
  }

}
