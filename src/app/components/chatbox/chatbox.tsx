"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Chatbox = () => {
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const [room, setRoom] = useState("");

  // const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [rmessage, setRmessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const leaveRoom = () => {
    if (room !== "") {
      socket.emit("leave_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setRmessage(data.message);
      // alert(data.message);
    });
  }, [socket]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      socket.emit('disconnecting', { userId: 'yourUserId' });
      socket.disconnect();
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  return (
    <div className="flex flex-col">
      <h1>Chat app</h1>
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <button onClick={leaveRoom}> Leave Room</button>
      <input
        className="w-1/4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="w-1/4" onClick={sendMessage}>
        send
      </button>
      <span>Recevied: {rmessage}</span>
      {/* <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div> */}
    </div>
  );
};

export default Chatbox;
