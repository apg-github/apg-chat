import "./App.css";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Particles from "react-particles-js";
import { SignOut } from "./components/SignOut";
import { SignIn } from "./components/SignIn";
import { ChatRoom } from "./components/ChatRoom";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyApsdXWCslizIMjbe4A3RSj6eebLC7TCP8",
    authDomain: "apg-chat.firebaseapp.com",
    projectId: "apg-chat",
    storageBucket: "apg-chat.appspot.com",
    messagingSenderId: "911590173882",
    appId: "1:911590173882:web:38f73246b4d6f148e36683",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  const [room, changeRoom] = useState(1);

  return (
    <div className="App">
      <header style={{}}>
        <h1>⚛️🔥💬</h1>
        {user ? (
          <>
            <button onClick={() => changeRoom(1)}>Room 1</button>
            <button onClick={() => changeRoom(2)}>Room 2</button>
          </>
        ) : (
          <h2>APG Chat</h2>
        )}
        <SignOut />
      </header>

      <section>{user ? <ChatRoom room={room} /> : <SignIn />}</section>

      <Particles
        params={{
          particles: {
            line_linked: {
              color: "#000000",
            },
            number: {
              value: 100,
            },
            size: {
              value: 10,
            },
          },
        }}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
          height: "100vh",
          width: "100vw",
        }}
      />
    </div>
  );
}

export default App;
