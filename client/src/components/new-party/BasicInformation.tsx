import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { partyDetailsState } from "./globalStates";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function BasicInformation() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const handleChange = (newValue: Dayjs | null) => {
    setPartyDetails({ ...partyDetails, date: newValue });
  };

  return (
    <Stack direction="column" spacing={5}>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Basic Information
      </Typography>
      <FormControl variant="standard">
        <Stack direction="row" spacing={2}>
          <TextField
            id="filled-textarea"
            label="Party Title"
            placeholder="Title"
            onChange={(e) => {
              const val = e.currentTarget.value;
              setPartyDetails({ ...partyDetails, title: val });
            }}
            value={partyDetails.title}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Party Date"
              value={partyDetails.date}
              onChange={handleChange}
              renderInput={(params: any) => <TextField required {...params} />}
            />
          </LocalizationProvider>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Collaborators
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={partyDetails.collaborators}
              input={<OutlinedInput label="Collaborators" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
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
        </Stack>
      </FormControl>
      <TextField
        sx={{ flex: 1 }}
        id="filled-textarea"
        label="Party Description"
        onChange={(e) => {
          const val = e.currentTarget.value;
          setPartyDetails({ ...partyDetails, des: val });
        }}
        style={{ width: 400 }}
        value={partyDetails.des}
        placeholder="Description"
        multiline
        maxRows={5}
      />
    </Stack>
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