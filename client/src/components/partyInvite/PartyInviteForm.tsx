import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../assets/config";

function PartyInviteForm() {
  const { partyToken } = useParams();
  const [registrationDetails, setRegistrationDetails] = useState({
    partyToken: partyToken as string,
    name: "" as string,
    phone: "" as string,
    isComing: "" as string,
    comment: "" as string,
  });
  const [checkboxes, setCheckboxes] = useState({
    sure: false,
    maybe: false,
  });
  const [msg, setMsg] = useState(false);
  const error = !Object.values(checkboxes).filter((v) => v === true).length;

  async function submitRegistrationToParty() {
    const req = await fetch(`${config.apiHost}/api/invite/guest`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationDetails),
    });
  }

  return (
    <Paper className="formPaper" elevation={7}>
      <p>
        Fill in the form below with the details
        <br /> and reserve a place right away!
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!error) {
            return;
            submitRegistrationToParty();
          } else {
            setMsg(true);
          }
        }}
        className="form"
      >
        <TextField
          type="text"
          id="filled-textarea"
          label="Full Name"
          style={{ width: 200 }}
          onChange={(e) => {
            const val = e.currentTarget.value.replace(/[^\w\s]|[0-9]/gi, "");
            setRegistrationDetails({ ...registrationDetails, name: val });
          }}
          value={registrationDetails.name}
          placeholder="Your full name"
          inputProps={{ maxLength: 20, minLength: 2 }}
          required
        />
        <TextField
          type="text"
          id="filled-textarea"
          label="Phone Number"
          style={{ width: 200 }}
          onChange={(e) => {
            const val = e.currentTarget.value.replace(/[^\w\s]|[a-zA-Z]$/g, "");
            setRegistrationDetails({
              ...registrationDetails,
              phone: val.toString(),
            });
          }}
          value={registrationDetails.phone}
          inputProps={{ maxLength: 10, minLength: 10 }}
          placeholder="Your phone number"
          required
        />
        <br />
        <FormControl
          required
          error={error}
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormLabel component="legend">How sure are you of coming?</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={checkboxes.maybe ? true : false}
                  onChange={() =>
                    setCheckboxes({
                      ...checkboxes,
                      sure: !checkboxes.sure,
                    })
                  }
                  color="secondary"
                />
              }
              label="For Sure"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={checkboxes.sure ? true : false}
                  onChange={() =>
                    setCheckboxes({
                      ...checkboxes,
                      maybe: !checkboxes.maybe,
                    })
                  }
                  color="secondary"
                />
              }
              label="Maybe"
            />
          </FormGroup>
          <FormHelperText
            style={msg ? { display: "unset" } : { display: "none" }}
          >
            Pick at least 1 option
          </FormHelperText>
        </FormControl>
        <TextField
          id="filled-textarea"
          label="Comment"
          style={{ width: 400 }}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setRegistrationDetails({ ...registrationDetails, comment: val });
          }}
          placeholder="Any Comment"
          multiline
          minRows={3}
          maxRows={5}
        />
        <Button type="submit" variant="contained" color="secondary">
          Let's go!
        </Button>
      </form>
    </Paper>
  );
}

export default PartyInviteForm;
