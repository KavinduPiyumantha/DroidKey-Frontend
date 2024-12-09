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

  // Group recommendations by category to avoid duplication
  const groupedRecommendations =
    data.detailed_explanation.recommendations &&
    data.detailed_explanation.recommendations.reduce((acc, rec) => {
      if (!acc[rec.category]) {
        acc[rec.category] = [];
      }
      acc[rec.category].push(rec.recommendation);
      return acc;
    }, {});

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
                                  <div
                                    key={index}
                                    style={{ marginBottom: "8px" }}
                                  >
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
                                              color: getKeyStatusColor(
                                                item.status
                                              ),
                                            }}
                                          >
                                            {item.status}
                                          </span>
                                        </Typography>
                                        <br />
                                        <Typography component="span">
                                          <strong>Details:</strong>{" "}
                                          {item.details}
                                        </Typography>
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
          {groupedRecommendations && (
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
              {Object.entries(groupedRecommendations).map(
                ([category, recommendations]) => (
                  <React.Fragment key={category}>
                    <ListItem sx={{ pl: 2 }}>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {category}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {recommendations.map((recommendation, idx) => (
                      <ListItem key={idx} sx={{ pl: 4 }}>
                        <ListItemText
                          secondaryTypographyProps={{ component: "div" }}
                          secondary={
                            <>
                              {typeof recommendation === "string"
                                ? recommendation
                                : Array.isArray(recommendation)
                                ? recommendation.map((item, index) => (
                                    <div
                                      key={index}
                                      style={{ marginBottom: "8px" }}
                                    >
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
                                                color: getKeyStatusColor(
                                                  item.status
                                                ),
                                              }}
                                            >
                                              {item.status}
                                            </span>
                                          </Typography>
                                          <br />
                                          <Typography component="span">
                                            <strong>Details:</strong>{" "}
                                            {item.details}
                                          </Typography>
                                        </>
                                      )}
                                    </div>
                                  ))
                                : JSON.stringify(recommendation)}
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </React.Fragment>
                )
              )}
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
