import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import { firestore, auth } from "../App";
import React, { useRef, useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";

export function ChatRoom(props) {
  const dummy = useRef();
  const messageRef =
    props.room === 1 ? firestore.collection("channel_alpha") : firestore.collection("channel_beta");
  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  });

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
          placeholder="How are you?"
        />
        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}
