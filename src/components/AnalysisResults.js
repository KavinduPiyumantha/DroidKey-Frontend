import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const AnalysisResults = ({ data }) => {
  const categories = Object.keys(data.detailed_scores);

  const getStatusColor = (status) => {
    switch (status) {
      case "Passed":
      case "Enabled":
      case "Disabled": // Assuming "Disabled" is positive in this context
        return "green";
      case "Failed":
      case "Insecure":
      case "Unknown":
        return "red";
      default:
        return "black";
    }
  };

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
              secondary={`${data.final_score.toFixed(2)} / 100`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Total Trackers Found"
              secondary={data.total_trackers}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Findings Summary"
              secondary={data.detailed_explanation.findings_summary}
            />
          </ListItem>
          {categories.map((category) => {
            const criteria = data.detailed_scores[category];
            return (
              <React.Fragment key={category}>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={category}
                    primaryTypographyProps={{ variant: "h6" }}
                  />
                </ListItem>
                {Object.entries(criteria).map(([criterionName, criterion]) => (
                  <ListItem key={criterionName} sx={{ pl: 4 }}>
                    <ListItemText
                      primary={criterionName}
                      secondary={
                        <>
                          <Typography component="span">
                            <strong>Status:</strong>{" "}
                            <span
                              style={{
                                color: getStatusColor(criterion.status),
                              }}
                            >
                              {criterion.status}
                            </span>
                          </Typography>
                          <br />
                          <Typography component="span">
                            <strong>Details:</strong>{" "}
                            {typeof criterion.details === "string"
                              ? criterion.details
                              : Array.isArray(criterion.details)
                              ? criterion.details
                                  .map((item) =>
                                    typeof item === "string"
                                      ? item
                                      : JSON.stringify(item)
                                  )
                                  .join(", ")
                              : JSON.stringify(criterion.details)}
                          </Typography>
                          {criterion.recommendation && (
                            <>
                              <br />
                              <Typography component="span">
                                <strong>Recommendation:</strong>{" "}
                                {typeof criterion.recommendation === "string"
                                  ? criterion.recommendation
                                  : Array.isArray(criterion.recommendation)
                                  ? criterion.recommendation
                                      .map((item) =>
                                        typeof item === "string"
                                          ? item
                                          : JSON.stringify(item)
                                      )
                                      .join(", ")
                                  : JSON.stringify(criterion.recommendation)}
                              </Typography>
                            </>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </React.Fragment>
            );
          })}
          {data.detailed_explanation.recommendations && (
            <>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Overall Recommendations"
                  primaryTypographyProps={{ variant: "h6" }}
                />
              </ListItem>
              {data.detailed_explanation.recommendations.map((rec, index) => (
                <ListItem key={index} sx={{ pl: 4 }}>
                  <ListItemText
                    primary={rec.category}
                    secondary={
                      typeof rec.recommendation === "string"
                        ? rec.recommendation
                        : Array.isArray(rec.recommendation)
                        ? rec.recommendation
                            .map((item) =>
                              typeof item === "string"
                                ? item
                                : `${item.key} - ${item.status}: ${item.details}`
                            )
                            .join("\n")
                        : JSON.stringify(rec.recommendation)
                    }
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
