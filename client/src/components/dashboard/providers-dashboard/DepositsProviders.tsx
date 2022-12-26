import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function DepositsProviders() {
  return (
    <React.Fragment>
      <Title>Expected Revenue</Title>
      <Typography component="p" variant="h4" sx={{ flex: 2 }}>
        $3,024.00
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
