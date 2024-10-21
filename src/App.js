import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import AnalysisResults from "./components/AnalysisResults";
import "./App.css";

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="App container mt-5">
      <h1>Android Security Analysis</h1>
      <UploadForm setAnalysisData={setAnalysisData} />
      {analysisData && <AnalysisResults data={analysisData} />}
    </div>
  );
}

export default App;
