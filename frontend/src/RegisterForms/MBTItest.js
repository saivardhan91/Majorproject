import React, { useState } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../routes/AuthContex";
const questions = [
  { id: 1, question: "At a party, you usually:", dichotomy: "EI", optionA: { text: "Initiate conversation and mingle", trait: "E" }, optionB: { text: "Wait for others to approach you", trait: "I" } },
  { id: 2, question: "When you have free time, you prefer:", dichotomy: "EI", optionA: { text: "Being out with friends", trait: "E" }, optionB: { text: "Being alone reading a book", trait: "I" } },
  { id: 3, question: "In group settings, you feel:", dichotomy: "EI", optionA: { text: "Energized", trait: "E" }, optionB: { text: "Drained", trait: "I" } },
  { id: 4, question: "Do you prefer:", dichotomy: "SN", optionA: { text: "Practical, concrete details", trait: "S" }, optionB: { text: "Abstract ideas and theories", trait: "N" } },
  { id: 5, question: "When making decisions, you rely on:", dichotomy: "SN", optionA: { text: "Past experiences", trait: "S" }, optionB: { text: "Future possibilities", trait: "N" } },
  { id: 6, question: "Your attention is drawn to:", dichotomy: "SN", optionA: { text: "Tangible facts", trait: "S" }, optionB: { text: "Underlying patterns", trait: "N" } },
  { id: 7, question: "In decision-making, you tend to:", dichotomy: "TF", optionA: { text: "Rely on logical analysis", trait: "T" }, optionB: { text: "Consider personal values and emotions", trait: "F" } },
  { id: 8, question: "When giving feedback, you are:", dichotomy: "TF", optionA: { text: "Direct and factual", trait: "T" }, optionB: { text: "Tactful and empathetic", trait: "F" } },
  { id: 9, question: "When resolving conflicts, you prefer to:", dichotomy: "TF", optionA: { text: "Be objective and fair", trait: "T" }, optionB: { text: "Ensure everyone’s feelings are considered", trait: "F" } },
  { id: 10, question: "Your work style is more:", dichotomy: "JP", optionA: { text: "Organized and planned", trait: "J" }, optionB: { text: "Flexible and spontaneous", trait: "P" } },
  { id: 11, question: "You prefer:", dichotomy: "JP", optionA: { text: "A clear schedule", trait: "J" }, optionB: { text: "Keeping your options open", trait: "P" } },
  { id: 12, question: "When planning events, you:", dichotomy: "JP", optionA: { text: "Set detailed plans", trait: "J" }, optionB: { text: "Go with the flow", trait: "P" } },
];

const MBTITest = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState();
  const auth=useAuth();
  const navigate=useNavigate();

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const dichotomyCounts = { EI: { E: 0, I: 0 }, SN: { S: 0, N: 0 }, TF: { T: 0, F: 0 }, JP: { J: 0, P: 0 } };
    questions.forEach((q) => {
      const selectedOption = answers[q.id];
      if (selectedOption === "A") {
        dichotomyCounts[q.dichotomy][q.optionA.trait] += 1;
      } else {
        dichotomyCounts[q.dichotomy][q.optionB.trait] += 1;
      }
    });
    const mbtiType = Object.keys(dichotomyCounts)
      .map((dicho) => (dichotomyCounts[dicho][Object.keys(dichotomyCounts[dicho])[0]] >= dichotomyCounts[dicho][Object.keys(dichotomyCounts[dicho])[1]] ? Object.keys(dichotomyCounts[dicho])[0] : Object.keys(dichotomyCounts[dicho])[1]))
      .join("");
    console.log(mbtiType);


    const mbtiPercentages = Object.keys(dichotomyCounts).reduce((arr, dicho) => {
      const traits = Object.keys(dichotomyCounts[dicho]); // e.g., ["E", "I"]
      const countA = dichotomyCounts[dicho][traits[0]];
      const countB = dichotomyCounts[dicho][traits[1]];
      // Each dichotomy has 3 questions, so compute the percentages:
      const percentageA = (countA / 3) * 100;
      const percentageB = (countB / 3) * 100;
      
      // Append the two percentages in order: [percentageA, percentageB]
      arr.push(percentageA, percentageB);
      return arr;
    }, []);
    console.log(mbtiPercentages); // This will print an array like [a, b, a, b, a, b, a, b]
    // console.log(result);
    try {
      const userId = auth?.user?.id; // Replace with actual user ID (from context or auth)
      await axios.post(`http://localhost:5000/Mbti-Result`, {
        user:userId,
        mbti: {
          res: mbtiType,
          scores: mbtiPercentages,
        },
      });

      navigate('/preference');
      
    } catch (error) {
      console.error("Error updating MBTI data:", error);
      alert("Failed to save MBTI results.");
      navigate("/mbtiTest");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f3b6a2", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ padding: 4, width: 500, borderRadius: 2, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",mt: 4 }}>
        <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>MBTI Test</Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          {questions.map((q) => (
            <FormControl key={q.id} component="fieldset" sx={{ marginBottom: 2 }}>
              <Typography>{q.id}. {q.question}</Typography>
              <RadioGroup name={`question-${q.id}`} value={answers[q.id] || ""} onChange={(e) => handleOptionChange(q.id, e.target.value)} sx={{ flexDirection: "column" }}>
                <FormControlLabel value="A" control={<Radio />} label={q.optionA.text} />
                <FormControlLabel value="B" control={<Radio />} label={q.optionB.text} />
              </RadioGroup>
            </FormControl>
          ))}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Submit</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default MBTITest;
