// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyD7nMPsDwe7wtrdvBFUZTZQelzW1voAya0",
//     authDomain: "civic-indexer-357414.firebaseapp.com",
//     projectId: "civic-indexer-357414",
//     storageBucket: "civic-indexer-357414.appspot.com",
//     messagingSenderId: "792577360567",
//     appId: "1:792577360567:web:66f69606c90139f84f4332",
//     measurementId: "G-DLH4RR6F74"
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);
//  // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });