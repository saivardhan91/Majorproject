import React,{useEffect, useState} from 'react';
import { Box } from '@mui/material';
import Chatlist from "./chatList";
import Navbar from "./nav";
import Chat from "./chat";
import socket from '../socket';
import { useAuth } from '../Routes/AuthContex';
export default function GenerateChatApp() {
  const auth=useAuth();
  const [online,setOnline]=useState([]);
  useEffect(() => {
    if (auth?.user?._id) {
        console.log('User ID:', auth?.user?._id); // Debugging log
        console.log('User Id:',auth?.user?._id)
        socket.emit("addUser", auth?.user?._id);
        socket.on("getUsers", (data)=>{
          setOnline(data);
          console.log(online);
        });
        
        // Set up the listener for getUsers if necessary
        // socket.on("getUsers", (users) => {
        //     console.log("Connected users:", users); // For debugging
        // });
    } else {
        console.log('No user found or user ID is undefined'); // Debugging log
    }
}, [auth?.user?._id]);
  return (
    <Box sx={{ display: 'flex',flexDirection:'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Chatlist /> 
        <Chat online={online} /> 
      </Box>
    </Box>
  );
}
