import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase (same config as in server)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);

// Function to sign in with Google
const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const idToken = await result.user.getIdToken();

        // Send ID token to backend for verification
        const response = await fetch('/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        const data = await response.json();
        console.log('User authenticated:', data);
    } catch (error) {
        console.error('Error during Google sign-in:', error);
    }
};
