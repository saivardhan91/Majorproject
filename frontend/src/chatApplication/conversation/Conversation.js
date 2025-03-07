import {
    Box, Stack, styled, Avatar, Badge, Typography,
    IconButton, TextField, InputAdornment,Modal
  } from '@mui/material';
  import React, { useEffect, useRef, useState, useCallback,useMemo } from 'react';
  import { Image, Smiley, PaperPlaneTilt, Phone, Info } from '@phosphor-icons/react';
  import Messages from './message';
  // import Picker from '@emoji-mart/react';
  import EmojiPicker from 'emoji-picker-react';

  import { Contact } from '../ContactDetails/contact';
  import { useAuth } from '../../routes/AuthContex';
  import axios from 'axios';
  import { io } from "socket.io-client";
  import close from '../images/close.png';
  import { Close, Start } from '@mui/icons-material';
import socket from '../../socket';
const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '30px',
    marginLeft: '5px',
    flexGrow: 1,
    width: '97.5%',
    marginTop: '3px',
  },
  '& .MuiInputBase-input': {
    paddingTop: '15px',
    paddingBottom: '15px',
    alignItems: 'center',
    paddingLeft: '5px',
    flexGrow: 1,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));




const ChatInput = ({ setOpenPicker, newMessage, setNewMessage, handleSendMessage, receiverBlocked,conversation,refreshConversation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null); // Add ref to file input
  
  useEffect(() => {
    // Listen for the blockeduser event
    socket.on("blockeduser", (receiverId) => {
        refreshConversation()
    });

    // Listen for the unblockeduser event
    socket.on("unblockeduser", (receiverId) => {
       refreshConversation();
    });

    // Clean up on unmount
    return () => {
      socket.off("blockeduser");
      socket.off("unblockeduser");
    };
  }, [conversation]);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log('Selected image:', file);
    }
  };  

  const sendMessage = () => {
    if ((!newMessage.trim() && !selectedImage) ) return;

    // Include both message and image in the handleSendMessage call
    handleSendMessage(newMessage, selectedImage);
    setNewMessage('');
    setSelectedImage(null);

    // Reset file input so it can detect the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent newline in input
      sendMessage();
    }
  };

  return (
    <Stack position={'relative'}>
      {selectedImage && (
        <Stack style={{ display: 'flex', gap: '8px', position: 'absolute', bottom: '50px', left: '30px', flexDirection: 'row' }}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ width: '70px', height: '70px', borderRadius: '8px' }}
          />
          <Stack sx={{ display: 'flex', justifyContent: 'start', bottom: '46px', position: 'absolute', left: '60px' }}>
            <IconButton onClick={removeImage}>
              <Close color="gray" />
            </IconButton>
          </Stack>
        </Stack>
      )}
      <Stack style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <StyledInput
          fullWidth
          placeholder="Write a message..."
          variant="filled"
          value={newMessage}  // Ensure controlled input
          onChange={(e) => setNewMessage(e.target.value)}  
          onKeyDown={handleKeyDown}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <Stack sx={{ width: 'max-content' }}>
                <InputAdornment>
                  <IconButton component="label">
                    <Image color="black" />
                    {/* Hidden file input with ref */}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef} // Attach ref here
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </InputAdornment>
              </Stack>
            ),
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={() => setOpenPicker((prev) => !prev)}>
                  <Smiley color="black" />
                </IconButton>
                {/* Disable the send button if `receiverBlocked` is true or no message is typed */}
                <IconButton
                  onClick={sendMessage}
                  disabled={(!newMessage.trim() && !selectedImage)}
                >
                  <PaperPlaneTilt color={newMessage.trim() || selectedImage ? 'blue' : 'gray'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
};



export default function Conversation({ conversation, open, CUser, fetchConversations,online }) {
    const [openPicker, setOpenPicker] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState(null);
    
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const messagesEndRef = useRef(null);
    const [receiver, setReceiver] = useState(null);
    const auth = useAuth();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isBlocked, setIsBlockedLocal] = useState(false);
    const [receiverBlocked,setReceiverBlocked]=useState(false);
    const [userData, setUserData] = useState(null);
   const[friend,setfriendId]=useState(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUserOnline, setIsUserOnline] = useState(false);
    // Function to open image in modal
    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setImageModalOpen(true);
    };
console.log(online);
    const closeImageModal = () => {
        setImageModalOpen(false);
        setSelectedImage(null);
    };

    console.log(auth.user.id);
   
    // console.log("ConversationMembers:",conversation);
    useEffect(() => {
      // Socket event listeners for block/unblock
      socket.on("blockeUser", () => {
       
          
            console.log("blockeduserfrom socket");
              setIsBlockedLocal(true);
              // handleSendMessage();
              // setReceiverBlocked(true);
              // getUsersData();
              // refreshConversation();
          
      },);

      socket.on("UnblockUser", (data) => {
            console.log("Unblockeduserfrom socket");
            if (auth.user && auth.user?._id=== data.receiverId){
              setIsBlockedLocal(false);
              // setReceiverBlocked(false);
              // getUsersData();
              // refreshConversation();
              // handleSendMessage();
            }
      });

      return () => {
          // socket.off("blockeduser");
          // socket.off("unblockeduser");
      };
  }, []);

  useEffect(() => {
    if (auth?.user?.id) {
      // Add current user to online users list via socket
      socket.emit("addUser", auth?.user?.id);
  
      // Listen for updated list of online users
      socket.on("getUsers", (data) => {
        setOnlineUsers(data);
  
        // Check if the friend's ID is in the online users list
        const friendId = conversation?.members.find((m) => m !== CUser?._id);
        const isFriendOnline = data.some((onlineUser) => onlineUser.userId === friendId);
  
        // Update the `isUserOnline` state accordingly
        setIsUserOnline(isFriendOnline);
      });
    }
  
    // Cleanup the socket listener on component unmount
    return () => {
      socket.off("getUsers");
    };
  }, [auth?.user?._id, conversation]);// Added friend to dependencies if it changes
// Add `friend` to the dependency array if it can change



    // Handle receiving messages
    // Handle receiving messages (including images)


// Update conversation messages when a new message arrives
useEffect(() => {
  const handleGetMessage = (message) => {
    
      if ((message.conversationId === conversation?._id)) {
          setArrivalMessage(message);
          // setUnreadCount((prevCount) => prevCount + 1);
          // console.log(unreadCount);
          console.log(arrivalMessage);
          
      }
  };

  socket.on("getMessage", handleGetMessage);
  return () => {
      socket.off("getMessage", handleGetMessage);
  };
}, [conversation]);
useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/CreateProfile/profile/${user?.email}`);
      setUserData(response.data);
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (user?.email) {
    fetchUserProfile();
  }
}, [user?.email]);
useEffect(() => {
  if (arrivalMessage) {
      setConversationMessages((prevMessages) => [
          ...prevMessages,
          {
              ...arrivalMessage,
              text: arrivalMessage.text || '',
              image: arrivalMessage.image ? `${arrivalMessage.image}` : null, // Use the correct format here
              read: false,
              createdAt: arrivalMessage.createdAt || new Date(),
          },
      ]);
  }
}, [arrivalMessage]);


    // Fetch the user data of the conversation (other participant)
    useEffect(() => {
        const getUser = async () => {
            if (!conversation) return;
          
            try {
                const friendId = conversation?.members.find((m) => m !== auth?.user?.id);
                // console.log(CUser);
                const res = await axios.get(`http://localhost:5000/get-form/${friendId}`);
                setReceiver(friendId);
                console.log("res",res.data);
                setUser(res.data.data);
                // console.log(user);

                // setBlockData(res.data.block);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getUser();
    }, [conversation, CUser]);

  //   useEffect(() => {
  //     const handleGetUsers = (users) => {
  //         console.log("Online users:", users);
  //         setOnlineUsers(users.map((user) => user.userId));
  //     };
  
  //     socket.on("getusers", handleGetUsers);
  
  //     // Cleanup to remove listener on component unmount
  //     // return () => {
  //     //     socket.off("getusers", handleGetUsers);
  //     // };
  // }, []);

    // Add the current user to the socket's active user list
  //   useEffect(() => {
  //     if (CUser?._id) {
  //         // Emit the addUser event with the current user's ID
  //         socket.emit("addUser", CUser._id);
          
  //         // Set up the listener for getUsers
  //         const handleGetUsers = (users) => {
  //             setOnlineUsers(users.map((user) => user.userId));
  //         };
  //         socket.on("getUsers", handleGetUsers);
         
  //     }
  // }, [CUser]);



// Handle message read/unread notification
// useEffect(() => {
//   const markMessageAsRead = async (messageId) => {
//       socket.emit("markAsRead", { messageId, conversationId: conversation._id });
//       setConversationMessages((prevMessages) =>
//           prevMessages.map((msg) =>
//               msg._id === messageId ? { ...msg, read: true } : msg
//           )
//       );
//       setUnreadCount(0); // Reset unread count
//   };

//   const handleMessageRead = ({ messageId }) => {
//       markMessageAsRead(messageId);
//   };

//   socket.on("messageRead", handleMessageRead);

//   return () => {
//       socket.off("messageRead", handleMessageRead);
//   };
// }, [conversation]);
    // Handle sending messages
    const handleSendMessage = async (message, image) => {
 console.log(message);
    if (message.trim() || image) {
        const tempMessage = {
            conversationId: conversation._id,
            sender: CUser._id,
            receiver:receiver,
            text: message || '',
            type: 'msg',
            subtype: image ? 'image' : 'TextMessage',
            read: false,
            createdAt: new Date(),
        };

        setConversationMessages((prev) => [...prev, tempMessage]);

        // if (image) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         const base64data = reader.result.split(',')[1]; // Get only the base64 string without the prefix
        //         socket.emit('sendMessage', { ...tempMessage, image: base64data, receiverId: receiver });
        //     };
        //     reader.readAsDataURL(image);
        // } else {
        //     socket.emit('sendMessage', { ...tempMessage, receiverId: receiver });
        // }
          try {
              const formData = new FormData();
              formData.append('conversationId', conversation._id);
              formData.append('sender', auth?.user?.id);
              formData.append('type', 'msg');
              formData.append('subtype', image ? 'image' : 'TextMessage');
              if (image) formData.append('image', image);
              if (message) formData.append('text', message);
    
              const startTime = Date.now();
              const res = await axios.post('http://localhost:5000/conversation/messages/', formData);
              const updatedMessage = { ...tempMessage, _id: res.data._id }
              if (image) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result.split(',')[1]; // Get only the base64 string without the prefix
                    socket.emit('sendMessage', { ...updatedMessage, image: base64data, receiverId: receiver });
                    // setUnreadCount(0);
                };
                reader.readAsDataURL(image);
            } else {
                socket.emit('sendMessage', { ...updatedMessage, receiverId: receiver });
                // setUnreadCount(0);
            }
              const endTime = Date.now();
    
              console.log(`Message sent in ${endTime - startTime}ms`);
    
              // Update with server-confirmed message
              setConversationMessages((prev) =>
                  prev.map((msg) => (msg === tempMessage ? res.data : msg))
              );
              socket.emit("conversationUpdated", { receiverId: receiver, conversationId: conversation?._id });
              socket.emit("newConversation",{receiverId:receiver,conversationId:conversation?._id});
              fetchConversations();
             await refreshConversation();
              setNewMessage('');
          } catch (error) {
              console.error('Error sending message:', error);
              alert('Error sending message. Please try again.');
              setConversationMessages((prev) => prev.filter((msg) => msg !== tempMessage));
          }
      }
    };
  //   const markAllAsRead = () => {
  //     conversationMessages.forEach((msg) => {
  //         if (!msg.read && msg.sender !== CUser._id) {
  //           console.log("help");
  //             socket.emit("markAsRead", { messageId: msg._id, conversationId: conversation._id });
  //         }
  //     });
  //     setUnreadCount(0); // Reset unread count
  // };

  // Mark all messages as read when conversation is open
  // useEffect(() => {
  //   console.log("hii");
  //     if (open) {
  //       console.log(open);
  //         markAllAsRead();
  //     }
  // }, [open]);
    useEffect(() => {
      const handleMessageDeleted = ({ messageId }) => {
        console.log("messid",messageId);
        refreshConversation();
      };

      socket.on("messageDeleted", handleMessageDeleted);
      
      // Cleanup function to remove the listener when the component unmounts or CUser changes
      return () => {
          socket.off("messageDeleted", handleMessageDeleted);
      };
  }, [conversation]);


  
  
    // // Scroll to the bottom of the messages when they change
    // useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [conversationMessages]);

    // Fetch block status when the conversation changes
  

    // Fetch new messages when the conversation changes
   // Inside your Conversation component:
   useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
}, [conversationMessages]);


// Ensure that fetching the conversation only triggers when the conversation ID changes
useEffect(() => {
  if (conversation) {
      const refreshMessages = async () => {
          try {
              const res = await axios.get(
                  `http://localhost:5000/conversation/messages/${conversation._id}`
              );
              setConversationMessages(res.data);

              console.log("conver",conversationMessages);
          } catch (error) {
              console.error('Error fetching messages:', error);
          }
      };

      refreshMessages();
      // console.log(conversationMessages);
  }
}, [conversation?._id]);  // Dependency on conversation._id instead of the whole conversation object


    // Function to refresh conversation messages
    const refreshConversation = async () => {
      if (conversation) {
          try {
              const res = await axios.get(
                  `http://localhost:5000/conversation/messages/${conversation._id}`
              );
              setConversationMessages(res.data);
          } catch (error) {
              console.error('Error refreshing conversation:', error);
          }
      }
  };
  useEffect(() => {
    const handleMessageReaction = ({ messageId }) => {
      console.log("reactionmessid",messageId);
      refreshConversation();
    };

    socket.on("getReaction", handleMessageReaction);
    
    // Cleanup function to remove the listener when the component unmounts or CUser changes
    return () => {
        socket.off("getReaction", handleMessageReaction);
    };
}, [conversation]);


console.log(friend)
console.log(onlineUsers.includes(friend));

console.log(userData);


    return (
      <Stack height="90%" maxHeight="100vh" sx={{ width: '100%' }}>
      {conversation ? (
          <>
              {/* Header section */}
              <Box p={1} sx={{ height: 70, width: '100%', borderBottom: '1px solid black' }}>
                  <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ width: '100%', height: '100%' }}>
                      <Stack direction="row" spacing={2}>
                          <Box>
                              {/* Display user's avatar */}
                              <Badge
                                  overlap="circular"
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                  variant={isUserOnline ? 'dot' : 'undefined'}
                                  sx={{ '& .MuiBadge-badge': { backgroundColor: '#44b700', color: '#44b700' } }}
                              >
                                  <Avatar alt="User Avatar" src={user?.image || ''} />
                              </Badge>
                          </Box>
                          <Stack spacing={0.3}>
                              {/* User's name and online status */}
                              <Typography variant="subtitle2">{user?.name}</Typography>
                              {isUserOnline? 'Online' : 'Offline'}
                          </Stack>
                      </Stack>
                      
                  </Stack>
                  {/* Pass refreshConversation to Contact component */}
                 
              </Box>
              <Contact 
                      showInfo={showInfo} 
                      setShowInfo={setShowInfo} 
                      isBlocked={isBlocked} 
                      setIsBlocked={setIsBlockedLocal} 
                      receiver={receiver} 
                      CurrentUser={CUser} 
                      refreshConversation={refreshConversation} 
                      conversation={conversation}
                      IsUserOnline={isUserOnline}
                  />
  
              {/* Messages section */}
              <Box ref={messagesEndRef} sx={{ width: '100%', height: 'calc(100vh - 70px)', backgroundColor: '#F0F4FA', overflowY: 'auto' }}>
              {conversationMessages.map((m) => (
                
                  <div key={m._id}>
                      <Messages message={m} own={m.sender === auth.user.id} receiver={receiver} refreshConversation={refreshConversation} fetchConversations={fetchConversations}  openImageModal={openImageModal}  />
                  </div>
              ))}
          </Box>

  
              {/* Input section */}
              
                  <Box sx={{ height: 70, width: '100%' }} p={1}>
                      <Stack direction="row" alignItems="center" spacing={3}>
                          <Box width="100%">
                          <ChatInput
                            newMessage={newMessage}
                            setNewMessage={setNewMessage}
                            handleSendMessage={handleSendMessage}
                            setOpenPicker={setOpenPicker}
                            receiverBlocked={receiverBlocked}
                            conversation={conversation}
                            refreshConversation={refreshConversation}
                        />

                            {openPicker && (
                                <Box sx={{ display: 'inline', zIndex: 10, position: 'fixed', bottom: 81, right: 100 }}>
                                    <EmojiPicker onEmojiClick={(emojiObject) => setNewMessage((prev) => prev + emojiObject.emoji)} />

                                </Box>
                                
                            )}

                          </Box>
                      </Stack>
                  </Box>
              
              
              <Modal
                        open={imageModalOpen}
                        onClose={closeImageModal}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Box sx={{ maxWidth: '90vw', maxHeight: '90vh' }}>
                            <img src={selectedImage} alt="Enlarged" style={{ width: '100%', height: '500px' }} />
                        </Box>
                    </Modal>
                </>
      ) : (
          <Stack justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h6" color="textSecondary">
                  Start Conversation
              </Typography>
          </Stack>
      )}
  </Stack>
    )}