import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
  Pagination,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Navbar from "./Navbar";
import { useAuth } from "../routes/AuthContex";
import { useNavigate } from "react-router-dom";
const profilesPerPage = 4;


const MatrimonialProfiles = () => {
  const [page, setPage] = useState(1);
  const [shortlistedProfiles, setShortlistedProfiles] = useState([]);
  const auth=useAuth();
  const [userData, setUserData] = useState({});
 const navigate=useNavigate();

  useEffect(() => {
    fetchShortlistedProfiles();
  }, []);

  const fetchShortlistedProfiles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/shortlist/${auth?.user?.id}`);
      console.log(response.data);
      if (response.data.shortlistedProfiles) {
        setShortlistedProfiles(response.data.shortlistedProfiles);
      }
    } catch (error) {
      console.error("Error fetching shortlisted profiles:", error);
    }
  };

  const removeFromShortlist = async (profileId) => {
    try {
      await axios.delete(`http://localhost:5000/shortlist/${auth?.user?.id}/${profileId}`);
      setShortlistedProfiles((prev) =>
        prev.filter((profile) => profile.profileId._id !== profileId)
      );
    } catch (error) {
      console.error("Error removing from shortlist:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userDetails = {}; // Initialize an empty object
  
      for (const profile of shortlistedProfiles) {
        console.log(profile);
        if (!profile?.profileId?.userId) continue;
  
        try {
          const res = await axios.get(`http://localhost:5000/user/${profile?.profileId?.userId}`);
          // console.log(res.data);
          userDetails[profile?.profileId?.userId] = res.data;
        } catch (error) {
          console.error(`Error fetching user data for ${profile?.userId}:`, error);
        }
      }
  
      // console.log("Final userDetails:", userDetails); // Print final userDetails after loop completes
      setUserData(userDetails);
    };
  
    if (shortlistedProfiles.length > 0) {
      fetchUserData();
    }
  }, [shortlistedProfiles]);
  

  const startIndex = (page - 1) * profilesPerPage;
  const selectedProfiles = shortlistedProfiles.slice(startIndex, startIndex + profilesPerPage);
  const totalPages = Math.ceil(shortlistedProfiles.length / profilesPerPage);

  const handleViewProfile = (profile) => {
    // console.log(profile);
    // const userId = userData[profile?.userId]?._id;
    navigate(`/profile/${profile?.profileId?.userId}`, { state: { profile } });
  };
  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "white", margin: 4, borderRadius: 5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}>
        <Grid container spacing={3} justifyContent="space-evenly">
          {selectedProfiles.map((profile) => (
            <Grid item sm={4} lg={3} key={profile.profileId._id}>
              <Box sx={{ maxWidth: 200, minHeight: 200, boxShadow: 3, borderRadius: 2, textAlign: "center", position: "relative", bgcolor: "white", p: 2 }}>
                <Box component="img" src={profile.profileId.image} alt={profile.profileId.name} sx={{ width: "80%", height: 150, borderRadius: 2 }} />

                <IconButton
                  onClick={() => removeFromShortlist(profile.profileId._id)}
                  sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "white" }}
                >
                  <FavoriteIcon sx={{ color: "red" }} />
                </IconButton>

                <Typography variant="subtitle2" color="textSecondary">Matrimonial ID: {userData[profile?.profileId?.userId]?.accId || "N/A"}</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>{profile.profileId.name}</Typography>
                <Typography variant="body2" color="textSecondary">{profile.profileId.age} yrs • {profile.profileId.familyDetails.height.feet}ft {profile.profileId.familyDetails.height.feet}inch</Typography>
                <Typography variant="body2" color="textSecondary">{profile.profileId.gender}: {profile.profileId.languages}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
                  <LocationOnIcon color="error" fontSize="small" />
                  <Typography variant="body2" color="textSecondary">{profile.profileId.professionalDetails.state ||"Unknow"}</Typography>
                </Box>
              <Button
                  variant="contained"
                  sx={{ mt: 2, background: "linear-gradient(45deg, #FF4081, #FF9800)" }}
                  onClick={() => handleViewProfile(profile)}
                >
                  View Profile
                </Button>
             </Box>
            </Grid>
          ))}
        </Grid>
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MatrimonialProfiles;