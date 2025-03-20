import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";
import axios from "axios";

const profilesPerPage = 8;

const MatrimonialProfiles = () => {
  const [page, setPage] = useState(1);
  const [shortlisted, setShortlisted] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const [userData, setUserData] = useState({});

  const searchResults = location.state?.searchResults || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth?.user?.id) return;

        const shortlistResponse = await axios.get(
          `http://localhost:5000/shortlist/${auth?.user?.id}`
        );

        const shortlistedIds =
          shortlistResponse?.data?.shortlistedProfiles?.map(
            (profile) => profile.profileId._id
          ) || [];

        setShortlisted(shortlistedIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auth?.user?.id]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDetails = {};
      for (const profile of searchResults) {
        if (!profile?.userId) continue;
        try {
          const res = await axios.get(`http://localhost:5000/user/${profile?.userId}`);
          userDetails[profile.userId] = res.data;
          // console.log(res.data);
        } catch (error) {
          console.error(`Error fetching user data for ${profile?.userId}:`, error);
        }
      }
      setUserData(userDetails);
    
    };

    fetchUserData();
  }, [searchResults]);

  const toggleShortlist = async (userId) => {
    try {
      const userIdStr = userId?.toString();
      if (!userIdStr) return;

      if (shortlisted.includes(userIdStr)) {
        await axios.delete(
          `http://localhost:5000/shortlist/${auth?.user?.id}/${userIdStr}`
        );
        setShortlisted((prev) => prev.filter((id) => id !== userIdStr));
      } else {
        await axios.post("http://localhost:5000/shortlist/", {
          userId: auth?.user?.id,
          profileId: userIdStr,
        });
        setShortlisted((prev) => [...prev, userIdStr]);
      }
    } catch (error) {
      console.error("Error updating shortlist:", error);
    }
  };

  const startIndex = (page - 1) * profilesPerPage;
  const selectedProfiles = searchResults.slice(
    startIndex,
    startIndex + profilesPerPage
  );
  const totalPages = Math.ceil(searchResults.length / profilesPerPage);
console.log(selectedProfiles);
  const handleViewProfile = (profile) => {
    const userId = userData[profile?.userId]?._id;
    navigate(`/profile/${userId}`, { state: { profile } });
    
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "white",
          maxHeight: "160vh",
          margin: 4,
          borderRadius: 5,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Grid container spacing={3} justifyContent="space-evenly" alignItems="stretch">
          {selectedProfiles.map((profile) => {
            if (!profile) return null; // Skip invalid profiles

            return (
              <Grid item sm={4} lg={3} key={profile?._id}>
                <Box
                  sx={{
                    maxWidth: 200,
                    minHeight: 200,
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    position: "relative",
                    bgcolor: "white",
                    p: 2,
                  }}
                >
                  {profile?.image && (
                    <Box
                      component="img"
                      src={profile?.image}
                      alt={profile?.name || "Profile Image"}
                      sx={{ width: "80%", height: 150, borderRadius: 2 }}
                    />
                  )}

                  <IconButton
                    sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "white" }}
                    onClick={() => toggleShortlist(profile?._id)}
                  >
                    {shortlisted.includes(profile?._id?.toString()) ? (
                      <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "gray" }} />
                    )}
                  </IconButton>

                  <Typography variant="subtitle2" color="textSecondary">
                    Matrimonial ID: {userData[profile?.userId]?.accId || "N/A"}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                    {profile.name || "Unknown"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profile.age ? `${profile.age} yrs` : "Age not provided"} • 
                    {profile?.familyDetails?.height?.feet || "0"} ft 
                    {profile?.familyDetails?.height?.inches || "0"} inch
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profile.gender || "Gender not provided"}: {profile.motherTongue || "N/A"}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
                    <LocationOnIcon color="error" fontSize="small" />
                    <Typography variant="body2" color="textSecondary">
                      {profile?.professionalDetails?.state || "Unknown"}
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
            );
          })}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default MatrimonialProfiles;
