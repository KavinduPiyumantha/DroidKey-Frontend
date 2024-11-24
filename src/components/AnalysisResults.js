import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
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

  const getKeyStatusColor = (status) => {
    switch (status) {
      case "Restricted":
        return "green";
      case "Unrestricted":
        return "red";
      case "Unknown":
        return "orange";
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

          {/* Detailed information for each category */}
          {categories.map((category) => {
            const criteria = data.detailed_scores[category];
            return (
              <React.Fragment key={category}>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {category}
                      </Typography>
                    }
                  />
                </ListItem>
                {Object.entries(criteria).map(([criterionName, criterion]) => (
                  <ListItem key={criterionName} sx={{ pl: 4 }}>
                    <ListItemText
                      primary={criterionName}
                      secondaryTypographyProps={{ component: "div" }}
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
                              ? criterion.details.map((item, index) => (
                                  <div key={index}>
                                    {typeof item === "string" ? (
                                      item
                                    ) : (
                                      <>
                                        {Object.entries(item).map(
                                          ([key, value]) => (
                                            <div key={key}>
                                              <strong>{key}:</strong> {value}
                                            </div>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                ))
                              : JSON.stringify(criterion.details)}
                          </Typography>
                          {/* Display hardcoded keys in a scrollable box */}
                          {criterion.keys && criterion.keys.length > 0 && (
                            <>
                              <br />
                              <Typography component="span">
                                <strong>Hardcoded Keys:</strong>
                              </Typography>
                              <Paper
                                variant="outlined"
                                sx={{
                                  maxHeight: 200,
                                  overflow: "auto",
                                  mt: 1,
                                  p: 1,
                                }}
                              >
                                {criterion.keys.map((keyItem, idx) => (
                                  <Typography key={idx} variant="body2">
                                    {keyItem.key}
                                  </Typography>
                                ))}
                              </Paper>
                            </>
                          )}
                          {criterion.recommendation && (
                            <>
                              <br />
                              <Typography component="span">
                                <strong>Recommendation:</strong>{" "}
                                {criterion.recommendation}
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

          {/* Overall Recommendations */}
          {data.detailed_explanation.recommendations && (
            <>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      Overall Recommendations
                    </Typography>
                  }
                />
              </ListItem>
              {data.detailed_explanation.recommendations.map((rec, index) => (
                <ListItem key={index} sx={{ pl: 4 }}>
                  <ListItemText
                    primary={rec.category}
                    secondaryTypographyProps={{ component: "div" }}
                    secondary={
                      <>
                        {typeof rec.recommendation === "string"
                          ? rec.recommendation
                          : Array.isArray(rec.recommendation)
                          ? rec.recommendation.map((item, idx) => (
                              <div key={idx} style={{ marginBottom: "8px" }}>
                                {typeof item === "string" ? (
                                  item
                                ) : (
                                  <>
                                    <Typography component="span">
                                      <strong>Key:</strong> {item.key}
                                    </Typography>
                                    <br />
                                    <Typography component="span">
                                      <strong>Status:</strong>{" "}
                                      <span
                                        style={{
                                          color: getKeyStatusColor(item.status),
                                        }}
                                      >
                                        {item.status}
                                      </span>
                                    </Typography>
                                    <br />
                                    <Typography component="span">
                                      <strong>Details:</strong> {item.details}
                                    </Typography>
                                  </>
                                )}
                              </div>
                            ))
                          : JSON.stringify(rec.recommendation)}
                      </>
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
