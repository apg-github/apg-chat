import { auth, firebaseApp } from "../App";

export function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <button className="sign-in" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}
