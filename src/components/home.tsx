import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData, logout } from "../appwrite";
import "./style.css";
export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Models.User<Models.Preferences>>();
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    getUserData()
      .then((account) => setUser(account))
      .catch(() => navigate("/login"));
  }, []);

  const handleLogOut = () => logout().then(() => navigate("/login"));

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => setIsCopied(false), 3000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const copyToClipboard = () => {
    const token = window.token;
    navigator.clipboard.writeText(token);
    setIsCopied(true);
  };
  if (!user) return <p>You aren't logged in.</p>;

  return (
    <div>
      <p>
        Logged in as {user.email}
        <br />
        <button
          className={`copyButtton ${isCopied ? "copied" : ""}`}
          onClick={copyToClipboard}
        >
          Copy Token to Clipboard!
          <span className="tooltip">Token Copied!</span>
        </button>
      </p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}
