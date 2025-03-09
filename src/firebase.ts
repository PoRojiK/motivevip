// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyADxMiFA_F97J0w0x07q0-thvsMKWNpvu4',
  authDomain: 'motivevip-courses.firebaseapp.com',
  projectId: 'motivevip-courses',
  storageBucket: 'motivevip-courses.firebasestorage.app',
  messagingSenderId: '137885013808',
  appId: '1:137885013808:web:7b5a46df3f20e94e1edaf5',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);