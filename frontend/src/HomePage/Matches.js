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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContex";

const profilesPerPage = 8;

const MatrimonialProfiles = () => {
  const [page, setPage] = useState(1);
  const [matches, setMatches] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth?.user?.id) return;

        // Fetch shortlisted profiles
        
        // Fetch matches
        const matchesResponse = await axios.get(
          `http://localhost:5000/matches/${auth.user.id}`
        );

        setMatches(matchesResponse?.data?.data || []);

        const shortlistResponse = await axios.get(
          `http://localhost:5000/shortlist/${auth.user.id}`
        );

      //  console.log(shortlistResponse.data);
       const shortlistedIds = shortlistResponse?.data?.shortlistedProfiles?.map(
        (profile) => profile.profileId._id
      ) || [];

      setShortlisted(shortlistedIds);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auth?.user?.id]);

  const toggleShortlist = async (profileId) => {
    try {
      const profileIdStr = profileId.toString();
  
      if (shortlisted.includes(profileIdStr)) {
        // Remove from shortlist
        await axios.delete(
          `http://localhost:5000/shortlist/${auth?.user?.id}/${profileIdStr}`
        );
        setShortlisted((prev) => prev.filter((id) => id !== profileIdStr));
      } else {
        // Add to shortlist
        await axios.post("http://localhost:5000/shortlist/", {
          userId: auth?.user?.id,
          profileId: profileIdStr,
        });
        setShortlisted((prev) => [...prev, profileIdStr]);
      }
    } catch (error) {
      console.error("Error updating shortlist:", error);
    }
  };
  

  const startIndex = (page - 1) * profilesPerPage;
  const selectedProfiles = matches.slice(startIndex, startIndex + profilesPerPage);
  const totalPages = Math.ceil(matches.length / profilesPerPage);

  const handleViewProfile = (profile) => {
    navigate(`/profile/${profile._id}`, { state: { profile } });
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "white", maxHeight: "160vh", margin: 4, borderRadius: 5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}>
        <Grid container spacing={3} justifyContent="space-evenly" alignItems="stretch">
          {selectedProfiles.map((profile) => (
            <Grid item sm={4} lg={3} key={profile._id}>
              <Box sx={{ maxWidth: 200, minHeight: 200, boxShadow: 3, borderRadius: 2, textAlign: "center", position: "relative", bgcolor: "white", p: 2 }}>
                <Box component="img" src={profile.image} alt={profile.name} sx={{ width: "80%", height: 150, borderRadius: 2 }} />
                
                <IconButton
                  sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "white" }}
                  onClick={() => toggleShortlist(profile._id)}
                >
                  {shortlisted.includes(profile._id.toString()) ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "gray" }} />
                  )}
                </IconButton>

                <Typography variant="subtitle2" color="textSecondary">
                  Matrimonial ID: {profile.id}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                  {profile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.age} yrs • {profile?.familyDetails?.height?.feet}ft {profile?.familyDetails?.height?.inches} inch
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {profile.gender}: {profile.languages}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
                  <LocationOnIcon color="error" fontSize="small" />
                  <Typography variant="body2" color="textSecondary">
                    {profile.professionalDetails.state || "Unknown"}
                  </Typography>
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default MatrimonialProfiles; 