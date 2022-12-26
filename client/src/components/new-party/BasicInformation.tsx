import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { newPartyDetailsState } from "./globalStates";

function BasicInformation() {
  const [partyDetails, setPartyDetails] = useRecoilState(newPartyDetailsState);
  const handleChange = (newValue: Dayjs | null) => {
    setPartyDetails({ ...partyDetails, date: newValue });
  };

  return (
    <div className="basicInformation">
      <div className="left-section">
        <TextField
          id="filled-textarea"
          label="Party Title"
          placeholder="Title"
          onChange={(e) => {
            const val = e.currentTarget.value.replace(/[^\s\w_]/gi, "");
            setPartyDetails({ ...partyDetails, title: val });
          }}
          value={partyDetails.title}
          fullWidth
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Party Date"
            value={partyDetails.date}
            onChange={handleChange}
            renderInput={(params: any) => (
              <TextField fullWidth required {...params} />
            )}
          />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="test-select-label">Collaborators</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={partyDetails.collaborators}
            label="Collaborators"
            placeholder="Collaborators"
            input={<OutlinedInput label="Collaborators" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {names.map((name, i) => (
              <MenuItem
                key={i}
                value={name}
                onClick={() => {
                  if (partyDetails.collaborators.includes(name)) {
                    setPartyDetails({
                      ...partyDetails,
                      collaborators: partyDetails.collaborators.filter(
                        (x: any) => x !== name
                      ),
                    });
                  } else {
                    setPartyDetails({
                      ...partyDetails,
                      collaborators: [...partyDetails.collaborators, name],
                    });
                  }
                }}
              >
                <ListItemText secondary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <TextField
        id="filled-textarea"
        label="Party Description"
        onChange={(e) => {
          const val = e.currentTarget.value;
          setPartyDetails({ ...partyDetails, des: val });
        }}
        value={partyDetails.des}
        className="desInput"
        placeholder="Description"
        multiline
        minRows={7}
        maxRows={7}
      />
    </div>
  );
}

export default BasicInformation;

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
