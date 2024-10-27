import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const AnalysisResults = ({ data }) => {
  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Analysis Results
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="App Name" secondary={data.app_name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Version" secondary={data.version_name} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Final Security Score"
              secondary={`${data.final_score} / 100`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Trackers Found" secondary={data.trackers} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Hardcoded Keys"
              secondary={
                data.detailed_scores["Data Storage"].no_hardcoded_keys.details
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
