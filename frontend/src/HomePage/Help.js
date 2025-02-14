import React, { useState } from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const Help = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: -3, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        <ContactSupportIcon fontSize="large" /> Help & Support
      </Typography>
      <Typography variant="body1" paragraph>
        Find answers to common questions or contact us for support.
      </Typography>

      {/* FAQ Section */}
      <Box textAlign="left" mt={3}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How do I change my password?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>You can change your password in the settings under the "Change Password" option.</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">How do I delete my account?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Go to settings and select "Delete Account." Be careful, as this action is irreversible.</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What happens when I log out?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Logging out will end your session, and you will need to re-enter your credentials to log in again.</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Contact Support */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Need More Help?</Typography>
        <Typography variant="h6" gutterBottom>
        If you have any problems, please contact us at <strong>support@example.com</strong> with a screenshot attachment.
      </Typography>
      </Box>
    </Container>
  );
};

export default Help;
