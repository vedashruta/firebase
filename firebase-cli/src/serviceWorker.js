import { setupNotification } from "./firebase/firebase";

export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
        setupNotification()
      })
      .catch((error) => {
        console.error('Error registering service worker:', error);
      });
  }
}