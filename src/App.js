import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';




firebase.initializeApp({
  apiKey: "AIzaSyBO_30BAfaYRqDNtuUx5FLv-YRr01ntJ_A",
  authDomain: "react-chat-bfc10.firebaseapp.com",
  projectId: "react-chat-bfc10",
  storageBucket: "react-chat-bfc10.appspot.com",
  messagingSenderId: "287308918702",
  appId: "1:287308918702:web:6723ae27eeff801650e23f",
  measurementId: "G-H869KGH99E"
}) 

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
    
  );
}

function SignIn () {

  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <button onClick={SignInWithGoogle}>Sign In With Google</button>
  )
}

function ChatRoom () {
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('created-at').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      </div>

     
    </>
  )
}

function SignOut () {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  ) 
}

function ChatMessage (props) {
  const {text, uid} = props.message;

  return (
    
      <p>{text}</p>
    
  )
}

export default App;
