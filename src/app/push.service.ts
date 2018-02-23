import { Injectable } from '@angular/core';

export type Permission = 'granted' | 'default' | 'denied';

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

@Injectable()
export class PushService {

  private registraion: ServiceWorkerRegistration | void;

  constructor() { }

  public registerServiceWorker() {
    return navigator.serviceWorker.register('assets/service-worker.js')
    .then(function(registration) {
      console.log('Service worker successfully registered.');
      return registration;
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
  }

  public askPermission() {
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

  public subscribeUserToPush() {
    return navigator.serviceWorker.register('assets/service-worker.js')
    .then(function(registration) {

      const serverKey = urlB64ToUint8Array('BNWXqFGkpYtqq6Rx3Gd8pRK6Wje7s289jPFvfyB6KjWZDEJGtKLhTe8Pax-gWfi5xqqDSwrJkMCSwbvyaN7-U7w');

      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: serverKey
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function(pushSubscription) {
      return pushSubscription;
    });
  }
}
