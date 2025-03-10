import React from 'react';
import { Box, Stack } from '@mui/material';
import Conversation from './conversation/Conversation';

export default function Chat({ conversation, open,CUser,fetchConversations,online}) {
  
  console.log("online in Chat.js:", online);  // Debugging log
  return (
    <Stack>
      <Box sx={{ height: '100%', width: 'calc(100vw - 420px)', backgroundColor: '#fff' }}>
        <Conversation conversation={conversation} open={open} CUser={CUser} fetchConversations={fetchConversations}   online={online}/>
      </Box>
    </Stack>
  );
}
