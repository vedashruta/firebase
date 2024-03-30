// firebase.js
import { initializeApp } from "@firebase/app";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import firebaseConfig from "./config";
import logo from  '../assets/notification_logo.png'

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const setupNotification = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Notification permission granted.");
      // Get the FCM token
      await getToken(messaging, {
        vapidKey:
          "BMpYNBLF0xKAH2d8e0HQLNEfNXGu5oPrTAlpKBHSunHR-n5E7mm-8inyQQeIGYynt-27IZY5MQkQf3T_-2ew9zY",
      }).then((token) => {
        if (token) {
          console.log("FCM Token:", token);
        } else {
          console.log("No registration token available");
        }
      });
    } else {
      console.log("Notification permission denied.");
    }
    // Handle foreground notifications
    // onMessage(messaging, (payload) => {
    //   const title = payload.notification.title;
    //   const additionals = {
    //     body: payload.notification.body,
    //     icon: logo
    //   }
    //   console.log("Incoming message : ",payload);
    //   navigator.serviceWorker.ready.then((worker)=>{
    //     worker.showNotification(title,additionals)
    //   })
    // });
  } catch (error) {
    console.error("Error setting up notifications:", error);
  }
};
export { messaging, setupNotification };
