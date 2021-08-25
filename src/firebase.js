import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'


const app = firebase.initializeApp({
    apiKey: "AIzaSyA7_ykSQCDK0BCNJt5AZujTrOnN-NoaHSc",
    authDomain: "moowy-d0120.firebaseapp.com",
    projectId: "moowy-d0120",
    storageBucket: "moowy-d0120.appspot.com",
    messagingSenderId: "203513909591",
    appId: "1:203513909591:web:7859633d663d3bcc922e12"
});

export const auth = app.auth();

const firestore = app.firestore();

export const database = {
    users: firestore.collection('users'),
    cowalks: firestore.collection('cowalks'),
    locations: firestore.collection('locations'),
    membersPending: cowalkId => {
        return firestore.collection('cowalks').doc(cowalkId).collection('membersPending');
    },
    membersApproved: cowalkId => {
        return firestore.collection('cowalks').doc(cowalkId).collection('membersApproved');
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    formatDoc: doc => {
        return {
            id:doc.id,
            ...doc.data()
        }
    },
}