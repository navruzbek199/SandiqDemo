// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging } from "firebase/messaging";
// import { getToken} from 'firebase/messaging';
// import {onMessage } from 'firebase/messaging';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD7nMPsDwe7wtrdvBFUZTZQelzW1voAya0",
//     authDomain: "civic-indexer-357414.firebaseapp.com",
//     projectId: "civic-indexer-357414",
//     storageBucket: "civic-indexer-357414.appspot.com",
//     messagingSenderId: "792577360567",
//     appId: "1:792577360567:web:66f69606c90139f84f4332",
//     measurementId: "G-DLH4RR6F74"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const messaging = getMessaging();
// //......

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("payload", payload)
//       resolve(payload);
//     });
// });
// export const requestForToken = () => {
//     return getToken(messaging, { vapidKey: "BLgWBjpuanQtTKGrzqhsetaRCUPSHXoLpaQpgaF58FaV38PGzdNoZDl9VZqzG-9ubnVmyNOQwbB6ifxg3ffqSig" })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log('current token for client: ', currentToken);
//           // Perform any other neccessary action with the token
//         } else {
//           // Show permission request UI
//           console.log('No registration token available. Request permission to generate one.');
//         }
//       })
//       .catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//       });
//   };


  

// //......

