"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import { ChatEngine } from "react-chat-engine";

export default function ChatPage() {
  const { username, secret } = useGlobalContext();
  const [showChat, setShowChat] = useState<boolean>(false);
  console.log(username, secret);

  useEffect(() => {
    if (typeof document !== null) {
      setShowChat(true);
    }
  });

  if (!showChat) return <div>Loading...</div>;

  return (
    <div>c'est la page chat</div>
    // <ChatEngine
    //   height="calc(100vh - 200px)"
    //   projectID=" f12eef51-cffc-432d-8751-9a76f4ae53ad"
    //   userName={username}
    //   userSecret={secret}
    // />
  );
}
