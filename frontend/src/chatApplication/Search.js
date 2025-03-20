import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Stack, Typography, Avatar } from '@mui/material';
import close from '../chatApplication/images/close.png';
import socket from '../socket';
import { useAuth } from '../routes/AuthContex';

// Function to convert byte array to base64
const byteArrayToBase64 = (byteArray) => {
  if (!Array.isArray(byteArray)) {
    console.error('Provided data is not an array');
    return null;
  }
  const binaryString = byteArray.map(byte => String.fromCharCode(byte)).join('');
  return btoa(binaryString);
};

// Chat Account Component
const ChatAccounts = ({ user, onClick }) => {
  const [userSearchData, setUserSearchData] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/get-form/${user?._id}`);
        setUserSearchData(res.data.data);
       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (user?._id) {
      fetchdata();
    }
  }, [user?._id]);

  // Convert user image to base64
  const imageUrl = userSearchData.image;
    

  return (
    <Box
      onClick={onClick}
      sx={{
        width: '100%',
        borderRadius: 2,
        backgroundColor: '#fff',
        '&:hover': { backgroundColor: 'lightgray' },
        cursor: 'pointer',
        mb: 1,
      }}
      p={1}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Avatar src={imageUrl} />
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{user?.name || 'User'}</Typography>
            <Typography variant="caption">{user.username}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

ChatAccounts.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Fetch or create a new chat
const fetchOrCreateChat = async (senderId, receiverId, fetchConversations) => {
  
  try {
    console.log("Fetching or creating chat...");
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    const res = await axios.get(`http://localhost:5000/conversation`, {
      params: { senderId, receiverId },
    });

    fetchConversations();

    if (res.data) {
      console.log("Existing Conversation ID:", res.data._id);
      await axios.put(`http://localhost:5000/UpdateConversationDate/${res.data._id}`);
      return res.data; // Return existing conversation
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // If conversation doesn't exist, create a new one
      const newConversation = await axios.post(`http://localhost:5000/conversation`, {
        senderId,
        receiverId,
      });
      console.log("New Conversation Created:", newConversation);
      fetchConversations();
      return newConversation.data; // Return new conversation
    } else {
      console.error('Error fetching or creating conversation:', error);
    }
  }
};

// Search and Chat Component
const SearchAndChat = ({ handleClose, CUser, onSelectChat, fetchConversations }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const auth = useAuth();
  const currentUserId=auth?.user?.id;
  // Fetch users for search
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching search data...");
        const res = await axios.get("http://localhost:5000/Search");
        console.log("Search Data:", res.data);
        setResults(res.data);
      } catch (error) {
        console.error('Error fetching search data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle input change for search
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInput(newValue);
    if (newValue) {
      const filtered = results.filter((user) =>
        user?.name.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  // Handle clicking on a user to start a chat
  const handleChatClick = async (receiverId) => {
    console.log(receiverId);
    console.log("Auth User ID:", currentUserId);
    if (!currentUserId) {
      console.error("Current user (CUser) is undefined");
      return;
    }

    if (receiverId === currentUserId) {
      alert('Cannot start a conversation with yourself.');
      return;
    }

    try {
      const conversation = await fetchOrCreateChat(currentUserId, receiverId, fetchConversations);
      onSelectChat(conversation);
      handleClose();
    } catch (error) {
      console.error('Error initiating chat:', error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 90,
        left: 280,
        height: "490px",
        width: "390px",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="newChat"
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">New Chat</Typography>
        <img
          src={close}
          alt="close"
          width={"20px"}
          height={"20px"}
          style={{ cursor: "pointer" }}
          onClick={handleClose}
        />
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search Users..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          color: "black",
        }}
      />

      {/* Search Results */}
      {input && (
        <div
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((user) => (
              <div key={user._id} onClick={() => handleChatClick(user._id)}>
                <ChatAccounts user={user} />
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "10px",
                textAlign: "center",
                color: "#888",
              }}
            >
              No user found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchAndChat.propTypes = {
  handleClose: PropTypes.func.isRequired,
  CUser: PropTypes.object.isRequired,
  onSelectChat: PropTypes.func.isRequired,
  fetchConversations: PropTypes.func.isRequired,
};

export default SearchAndChat;
