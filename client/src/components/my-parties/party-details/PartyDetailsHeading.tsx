import { IconButton, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../../dashboard/Title";
import { useNavigate } from "react-router-dom";

function PartyDetailsHeading() {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Title>Party Details</Title>
      <IconButton
        size="small"
        style={{ marginBottom: 15 }}
        aria-label="back"
        onClick={() => navigate("/dashboard/my-parties")}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Stack>
  );
}

export default PartyDetailsHeading;
