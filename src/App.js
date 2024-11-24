import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import AnalysisResults from "./components/AnalysisResults";
import { Container, Typography } from "@mui/material";
import "./App.css";

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <Container maxWidth="md" style={{ marginTop: "2em" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        DroidKey Android Security Analysis Tool
      </Typography>
      <UploadForm setAnalysisData={setAnalysisData} />
      {analysisData && <AnalysisResults data={analysisData} />}
    </Container>
  );
}

export default App;
