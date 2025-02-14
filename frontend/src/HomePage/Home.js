import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContex";
import axios from "axios";
const matches = [
  { name: "M Bala Shivangini", age: "21 Yrs", height: "5'0", img: "https://assets.entrepreneur.com/content/3x2/2000/20150820205507-single-man-outdoors-happy-bliss.jpeg" },
  { name: "Vasanta", age: "20 Yrs", height: "5'1", img: "https://beyondages.com/wp-content/uploads/2020/06/AdobeStock_71430219.jpeg" },
  { name: "Gayathri Sadanap", age: "21 Yrs", height: "5'3", img: "https://th.bing.com/th/id/OIP.1mEPKraRlY_l_KgKK6qQKwHaD4?rs=1&pid=ImgDetMain" },
  { name: "Spandana Queen", age: "19 Yrs", height: "4'8", img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/shutterstock_193527755.jpg?itok=uS1VIBoY" },
  { name: "Swetha M", age: "19 Yrs", height: "5'0", img: "https://th.bing.com/th/id/OIP.STZ0WGJNY4VXfFuqKNKbPgAAAA?rs=1&pid=ImgDetMain" },
  { name: "Priya Reddy", age: "22 Yrs", height: "5'2", img: "https://th.bing.com/th/id/OIP.1mEPKraRlY_l_KgKK6qQKwHaD4?rs=1&pid=ImgDetMain" },
  { name: "Ananya Rao", age: "24 Yrs", height: "5'5", img: "https://via.placeholder.com/150" }, // Placeholder image
];

const MatrimonyDashboard = () => {
  const auth=useAuth();
  const [user, setUser] = useState({ name: "", avatar: "" });
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/get-form/${auth?.user?.id}`); // Replace with your actual API endpoint
          
          setUser({
            name: response?.data?.data?.name, // Extract name
            avatar: response?.data?.data?.image, // Extract Base64 image
          });// Assuming response contains { name: "User Name", avatar: "image_url" }
          // console.log(user.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
  useEffect(() => {
    if (showAll) {
      navigate('/Matches');
    }
  }, [showAll, navigate]);

  const displayedMatches = matches.slice(0, 6);

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          {/* Left Sidebar - Profile Section */}
         {/* Left Sidebar - Profile Section */}
         <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Avatar
              sx={{ width: 80, height: 80, margin: "auto", bgcolor: "#ccc" }}
              src={user.avatar 
                ? (user.avatar.startsWith("data:image") ? user.avatar : `data:image/png;base64,${user.avatar}`)
                : ""}
              
            />

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>{auth?.user?.accId}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Membership: <b>Free</b>
              </Typography>
              <Button variant="contained" sx={{ mt: 1, bgcolor: "#ff9800" }}>
                Upgrade
              </Button>
              <List sx={{ mt: 2 }}>
              {[
                { text: "Edit Profile", path: "/MyProfile" },
                { text: "Edit Preferences", path: "/preferences" },
                { text: "Verify Your Profile", path: "/verify" },
                { text: "Settings", path: "/settings" },
              ].map((item, index) => (
                <ListItem key={index} button onClick={() => navigate(item.path)} sx={{cursor:"pointer"}}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>

            </Paper>
          </Grid>

          {/* Middle Section - Matches */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Your profile is pending verification!
              </Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>
                Verify Profile
              </Button>
            </Paper>

            {/* Matches Section */}
            <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                All Matches ({matches.length})
              </Typography>
              <Grid container spacing={2}>
                {displayedMatches.map((match, index) => (
                  <Grid item xs={6} md={4} key={index}>
                    <Card sx={{ textAlign: "center", padding: 1, height: 250, display: "flex", flexDirection: "column" }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={match.img}
                        alt={match.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          {match.name}
                        </Typography>
                        <Typography variant="body2">{match.age}, {match.height}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* "See All" Button */}
              {matches.length > 6 && (
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button variant="outlined" onClick={() => setShowAll(true)}>
                    See All
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Section - Advertisement */}
          <Grid item xs={12} md={3}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Step into the New Year!
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                  Get an exclusive ₹200 off on 3-month Gold
                </Typography>
                <Button variant="contained" sx={{ bgcolor: "#ff9800" }}>
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MatrimonyDashboard;
