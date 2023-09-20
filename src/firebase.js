import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyBJSAAfVeB2fylgYAXCBUW-0TR1P2UmDoU",
  authDomain: "hng-image-gallery.firebaseapp.com",
  projectId: "hng-image-gallery",
  storageBucket: "hng-image-gallery.appspot.com",
  messagingSenderId: "631460387099",
  appId: "1:631460387099:web:5e33c95f03a0422ab6dbbe",
  measurementId: "G-HR58SLS3WB"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };