import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const MyTaskCard = ({taskID,taskDescription}) => {
    return (
        <div>
        <Typography />
        <ListItem button>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <ListItemText
               
                secondary={taskID}
              />
            </Grid>
            <Grid item xs={6}>
              <ListItemText
              
                secondary={taskDescription}
              />
            </Grid>
           
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
};

export default MyTaskCard;
