import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Alert,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

const UploadForm = ({ setAnalysisData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an APK file to upload.");
      return;
    }

    setError(null);
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/upload-apk/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAnalysisData(response.data);
    } catch (err) {
      setError("An error occurred while uploading the file.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Typography variant="h6" gutterBottom>
        Select APK File
      </Typography>
      <TextField
        type="file"
        fullWidth
        onChange={handleFileChange}
        inputProps={{ accept: ".apk" }}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Upload & Analyze"}
      </Button>
    </Box>
  );
};

export default UploadForm;
