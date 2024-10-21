import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const UploadForm = ({ setAnalysisData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

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
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select APK File</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload & Analyze
      </Button>
    </Form>
  );
};

export default UploadForm;
