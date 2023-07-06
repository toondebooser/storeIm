import { useAuth } from "../context/AuthContext";

export default function Home() {
  const {currentUser,foo} = useAuth();
  console.log(foo ,"here")
  return (
    <>
      <img
        className="welcomeLogo"
        src="./src/assets/android-chrome-512x512.png"
        alt="here should be a logo"
      />
      <h1 className="welcomeHeader">Store&lt;Im/&gt;</h1>
    </>
  );
}
