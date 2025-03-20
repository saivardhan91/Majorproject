import React from 'react';
import { Box, Stack } from '@mui/material';
import Conversation from './conversation/Conversation';
import { useAuth } from '../routes/AuthContex';

export default function Chat({ conversation, open,CUser,fetchConversations,online}) {
   const auth=useAuth();
   const  CurrentUser=auth?.user?.id;
  // console.log("online in Chat.js:", CurrentUser);  // Debugging log
  return (
    <Stack>
      <Box sx={{ height: '100%', width: 'calc(100vw - 360px)', backgroundColor: '#fff' }}>
        <Conversation conversation={conversation} open={open} CUser={CurrentUser} fetchConversations={fetchConversations}   online={online}/>
      </Box>
    </Stack>
  );
}
