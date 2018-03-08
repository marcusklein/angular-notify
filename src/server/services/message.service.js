const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: 'BNWXqFGkpYtqq6Rx3Gd8pRK6Wje7s289jPFvfyB6KjWZDEJGtKLhTe8Pax-gWfi5xqqDSwrJkMCSwbvyaN7-U7w',
  privateKey: 'NofXXuzXBl37J6eospxPAaA7v0S2LrZ0E6nwGS4-g2k'
};

function sendMessage (sub, message) {

  if (!message) {
    message = 'default message TODO: CHANGE ME'
  }

  console.log('sending message..');
  webpush.setGCMAPIKey('AIzaSyAP14UxZ_4cgGC4RFWFMFSib8TgmMtAJj4');
  webpush.setVapidDetails(
    'mailto:marcusklein@me.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  return webpush.sendNotification(sub, message);
}

module.exports = {
  sendMessage: sendMessage
};
