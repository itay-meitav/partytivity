import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { partyDetailsState } from "./PartyDetailsMain";

function PartyDetailsBasic() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const handleChange = (newValue: Dayjs | null) => {
    setPartyDetails({ ...partyDetails, date: newValue });
  };
  return (
    <div className="basicInfo">
      <div className="left-section">
        <TextField
          id="filled-textarea"
          label="Party Title"
          placeholder="Title"
          onChange={(e) => {
            const val = e.currentTarget.value.replace(/[^\w\s]/gi, "");
            setPartyDetails({ ...partyDetails, title: val });
          }}
          value={partyDetails.title}
          required
          fullWidth
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="date"
            label="Party Date"
            value={partyDetails.date}
            onChange={handleChange}
            renderInput={(params: any) => <TextField required {...params} />}
          />
        </LocalizationProvider>
      </div>
      <TextField
        id="filled-textarea"
        className="desInput"
        label="Party Description"
        onChange={(e) => {
          const val = e.currentTarget.value;
          setPartyDetails({ ...partyDetails, des: val });
        }}
        value={partyDetails.des}
        placeholder="Description"
        multiline
        minRows={5}
        maxRows={5}
      />
    </div>
  );
}

export default PartyDetailsBasic;
