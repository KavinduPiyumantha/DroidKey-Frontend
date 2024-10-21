import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const AnalysisResults = ({ data }) => {
  return (
    <Card className="mt-5">
      <Card.Header>Analysis Results</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>App Name: </strong> {data.app_name}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Version: </strong> {data.version_name}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Final Security Score: </strong> {data.final_score} / 100
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Trackers Found: </strong> {data.trackers}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Hardcoded Keys: </strong>{" "}
          {data.detailed_scores["Data Storage"].no_hardcoded_keys.details}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default AnalysisResults;
