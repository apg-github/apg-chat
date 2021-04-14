import "./App.css";
import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { isCompositeComponent } from "react-dom/test-utils";

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

const auth = firebase.auth();
const firestore = firebase.firestore();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return auth.currentUser && <button onClick={() => auth.signOut()}>Sign out from chat</button>;
}

function ChatRoom(props) {
  const dummy = useRef();
  const messageRef =
    props.room === 1
      ? firestore.collection("channel_alpha")
      : firestore.collection("channel_beta");
  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main style={{ paddingTop: "2em" }}>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            "https://previews.123rf.com/images/juliarstudio/juliarstudio1512/juliarstudio151200391/49020838-boy-avatar-simple-icon-for-web-and-mobile-devices.jpg"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

function App() {
  const [user] = useAuthState(auth);
  const [room, changeRoom] = useState(1)
  
  return (
    <div className="App">
      <header style={{ padding: "2.5em" }}>
        <h1>⚛️🔥💬</h1>
        {user ? (
          <>
            <button onClick={() => changeRoom(1)}>Room 1</button>
            <button onClick={() => changeRoom(2)}>Room 2</button>
          </>
        ) : (
          <h1>APG Chat - sign in first</h1>
        )}

        <SignOut />
      </header>

      <section>{user ? <ChatRoom room={room} /> : <SignIn />}</section>
    </div>
  );
}

export default App;
