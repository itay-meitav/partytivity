import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Title from "../dashboard/Title";

type Tprops = {
  title: string;
  link: string;
};

function NewPartyHeader(props: Tprops) {
  const navigate = useNavigate();
  return (
    <div className="newPartyHeader">
      <Title>{props.title}</Title>
      <IconButton
        size="small"
        aria-label="back"
        onClick={() => navigate(props.link)}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
}

export default NewPartyHeader;
