import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Title from "../dashboard/Title";

function MyPartiesHeading() {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Title>My Parties</Title>
      <Button
        onClick={() => navigate("/dashboard/my-parties/new")}
        color="secondary"
        title="Create New Party"
      >
        New Party
      </Button>
    </Stack>
  );
}

export default MyPartiesHeading;
