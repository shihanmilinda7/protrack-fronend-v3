// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3003");

// const Chatbox = () => {
//   const { data: session, status } = useSession();
//   const userRole = session?.user?.role;
//   const userNameIn = session?.user?.username;

//   const [room, setRoom] = useState("");
//   const [userName, setUserName] = useState("dddd"); // Added user name state
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);

//   const joinRoom = () => {
//     // socket.emit("join-room", room, userName); // Include the user's name
//     socket.emit("join-room", room, userName); // Include the user's name
//   };

//   const leaveRoom = () => {
//     socket.emit("leave-room", room, userName);
//   };

//   const sendMessage = () => {
//     if (message.startsWith("/pm ")) {
//       const parts = message.split(" ");
//       const to = parts[1];
//       const text = parts.slice(2).join(" ");
//       socket.emit("message", room, { user: userName, text, to });
//     } else {
//       socket.emit("message", room, { user: userName, text: message });
//     }
//     setMessage("");
//   };

//   useEffect(() => {
//     socket.on("room-joined", (roomName) => {
//       console.log("roomName", roomName);
//       setRoom(roomName);
//     });

//     socket.on("user-joined", (user) => {
//       setParticipants((prev) => [...prev, user]);
//     });

//     socket.on("user-left", (user) => {
//       setParticipants((prev) => prev.filter((u) => u !== user));
//     });

//     socket.on("message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     setUserName(userNameIn);
//   }, [userNameIn]);

//   return (
//     <div>
//       <h1>Chat Room: {room}</h1>
//       <div>
//         <label htmlFor="roomName">Room Name:</label>
//         <input
//           type="text"
//           id="roomName"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <label htmlFor="userName">Your Name:</label>
//         <input
//           type="text"
//           id="userName"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <button onClick={joinRoom}>Join Room</button>
//         <button onClick={leaveRoom}>Leave Room</button>
//       </div>
//       <div>
//         <h2>Participants:</h2>
//         <ul>
//           {participants.map((participant, index) => (
//             <li key={index}>{participant}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2>Chat:</h2>
//         <div>
//           {messages.map((msg, index) => (
//             <div key={index}>
//               <strong>{msg.user}:</strong> {msg.text}
//             </div>
//           ))}
//         </div>
//         <input
//           type="text"
//           placeholder="Type your message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chatbox;
