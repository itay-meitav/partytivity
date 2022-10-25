import Title from "../../../dashboard/Title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stack, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PhotosHeader() {
  const navigate = useNavigate();
  return (
    <Stack
      direction={"row"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
    >
      <div>
        <Title style={{ marginBottom: 20 }}>Party Photos</Title>
        <Typography color="text.secondary">
          Add life to your party! Try something that will get people in without
          even blinking! <br />{" "}
          <small>
            This step is optional, however you will be able to add images later.
          </small>
        </Typography>
      </div>
      <IconButton
        size="small"
        style={{ marginBottom: 15 }}
        aria-label="back"
        onClick={() => navigate("/dashboard/my-parties/new")}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Stack>
  );
}

export default PhotosHeader;
