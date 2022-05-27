import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
  const { userName, setUserName, secret, setSecret } = useContext(Context);
  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();

    if (userName.length === 0 || secret.length === 0) return;

    axios
      .put(
        "https://api.chatengine.io/users/",
        { userName, secret },
        {
          headers: {
            "Private-key": "4c2ab7cb-31a9-406c-ae6c-829efcddcaa5",
          },
        }
      )
      .then((r) => router.push("/chats"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form
          className="auth-form"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <div className="auth-title"> Next Js Chat</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div className="input-container">
            <input
              placeholder="Password"
              className="text-input"
              onChange={(e) => {
                setSecret(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="submit-button">
            Login/Signup
          </button>
        </form>
      </div>
    </div>
  );
}
