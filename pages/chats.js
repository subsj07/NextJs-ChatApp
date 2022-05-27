import React from "react";
import { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { Context } from "../context";
import { useRouter } from "next/router";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFromSocial = () =>
  import("react-chat-engine").then((module) => module.MessageFromSocial);

export default function Chats() {
  const [userName, secret] = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }

    if (!showChat) return <div />;
  }, []);

  useEffect(() => {
    if (userName.length === 0 || secret.length === 0) router.push("/");
  }, []);

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="clac(100vh - 200px)"
          projectId="789eb031-fcfd-4aba-9be3-228b67575ee9"
          userName={userName}
          userSecret={secret}
          renderNewMessageFrom={() => <MessageFromSocial />}
        />
      </div>
    </div>
  );
}
