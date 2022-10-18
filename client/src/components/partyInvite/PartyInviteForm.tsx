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

const initialRegistrationDetails = {
  partyToken: "" as string,
  name: "" as string,
  phone: "" as string,
  isComing: "" as string,
  comment: "" as string,
};

function PartyInviteForm() {
  const [registrationDetails, setRegistrationDetails] = useState(
    initialRegistrationDetails
  );
  const [checkboxes, setCheckboxes] = useState({
    sure: false,
    maybe: false,
  });
  const { token } = useParams();
  const [msg, setMsg] = useState(false);
  const error = !Object.values(checkboxes).filter((v) => v === true).length;

  async function submitRegistrationToParty() {
    setRegistrationDetails({ ...registrationDetails, partyToken: token! });
    const req = await fetch(`${config.apiHost}/api/invite/guest`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialRegistrationDetails),
    });
  }

  return (
    <Paper className="paper4" elevation={7}>
      Fill in the form below with the details
      <br /> and reserve a place right away!
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
            const val = e.currentTarget.value;
            setRegistrationDetails({ ...registrationDetails, name: val });
          }}
          placeholder="Your full name"
          required
        />
        <TextField
          type="number"
          id="filled-textarea"
          label="Phone Number"
          style={{ width: 200 }}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setRegistrationDetails({
              ...registrationDetails,
              phone: val.toString(),
            });
          }}
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
