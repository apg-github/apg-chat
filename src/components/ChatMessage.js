import { auth } from "../App";

export function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const checkValidUrl = (url) => {
    var pattern = /^((http|https|ftp):\/\/)/;
    if (!pattern.test(url)) {
      return "http://" + url;
    } else {
      return url;
    }
  };

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            "https://previews.123rf.com/images/juliarstudio/juliarstudio1512/juliarstudio151200391/49020838-boy-avatar-simple-icon-for-web-and-mobile-devices.jpg"
          }
        />
        <p>
          {text.match(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
          ) ? (
            <a href={checkValidUrl(text)} target="_blank" rel="noreferrer">
              {text}
            </a>
          ) : (
            text
          )}
        </p>
      </div>
    </>
  );
}
