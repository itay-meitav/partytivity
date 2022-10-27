import { IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../dashboard/Title";

type Tprops = {
  title: string;
  des?: any;
  link: string;
};

function NewPartyHeader(props: Tprops) {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      width="100%"
    >
      <Title>{props.title}</Title>
      <Typography color="text.secondary">{props.des || ""}</Typography>
      <IconButton
        size="small"
        style={{ marginBottom: 15 }}
        aria-label="back"
        onClick={() => navigate("/dashboard/my-parties/")}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Stack>
  );
}

export default NewPartyHeader;
