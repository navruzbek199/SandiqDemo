// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
// const firebaseConfig = {
//     apiKey: "AIzaSyD7nMPsDwe7wtrdvBFUZTZQelzW1voAya0",
//     authDomain: "civic-indexer-357414.firebaseapp.com",
//     projectId: "civic-indexer-357414",
//     storageBucket: "civic-indexer-357414.appspot.com",
//     messagingSenderId: "792577360567",
//     appId: "1:792577360567:web:66f69606c90139f84f4332",
//     measurementId: "G-DLH4RR6F74"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// function requestPermission() {
//   // console.log("Requesting permission...");
//   Notification.requestPermission().then((permission) => {
//     if (permission === "granted") {
//       // console.log("Notification permission granted.");
//       const messaging = getMessaging(app);
//       getToken(messaging, {
//         vapidKey:
//           "BLgWBjpuanQtTKGrzqhsetaRCUPSHXoLpaQpgaF58FaV38PGzdNoZDl9VZqzG-9ubnVmyNOQwbB6ifxg3ffqSig",
//       })
//         .then((currentToken) => {
//           if (currentToken) {
//             localStorage.setItem("worker-token", currentToken);
//           } else {
//             console.log("No token");
//           }
//         })
//         .catch((err) => {
//           console.log("An error occurred while retrieving token. ", err);
//         });
//     } else {
//       console.log("Do not have permission! ");
//     }
//   });
// }
// requestPermission();
