import { auth } from "../App";

export function SignOut() {
  return (auth.currentUser && <button onClick={() => auth.signOut()}>Sign out</button>) || null;
}
