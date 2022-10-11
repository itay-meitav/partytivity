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
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

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

export const desState = atom({
  key: "des",
  default: localStorage.getItem("details")
    ? JSON.parse(localStorage.getItem("details")!).description
    : "",
});
export const markedCollaboratorsState = atom({
  key: "markedCollaborators",
  default: localStorage.getItem("details")
    ? JSON.parse(localStorage.getItem("details")!).collaborators
    : [],
});
export const titleState = atom({
  key: "title",
  default: localStorage.getItem("details")
    ? JSON.parse(localStorage.getItem("details")!).title
    : "",
});
export const dateState = atom({
  key: "date",
  default: localStorage.getItem("details")
    ? JSON.parse(localStorage.getItem("details")!).date
    : "",
});

function BasicInformation() {
  const [des, setDes] = useRecoilState(desState);
  const [title, setTitle] = useRecoilState(titleState);
  const [markedCollaborators, setMarkedCollaborators] = useRecoilState(
    markedCollaboratorsState
  );
  const [date, setDate] = useRecoilState<Dayjs | null>(dateState);
  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  useEffect(() => {
    localStorage.setItem(
      "details",
      JSON.stringify({
        title: title,
        description: des,
        collaborators: markedCollaborators,
        date: date,
      })
    );
  }, [markedCollaborators, title, des, date]);

  return (
    <Stack direction="column" spacing={3}>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Basic Information
      </Typography>
      <FormControl variant="standard">
        <Stack style={{ marginTop: 30 }} direction="row" spacing={1}>
          <TextField
            id="filled-textarea"
            label="Party Title"
            placeholder="Title"
            onChange={(e) => {
              const val = e.currentTarget.value;
              setTitle(val);
            }}
            value={title}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Party Date"
              value={date}
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
              value={markedCollaborators}
              input={<OutlinedInput label="Collaborators" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {names.map((name, i) => (
                <MenuItem
                  key={i}
                  value={name}
                  onClick={() => {
                    if (markedCollaborators.includes(name)) {
                      setMarkedCollaborators(
                        markedCollaborators.filter((x: any) => x !== name)
                      );
                    } else {
                      setMarkedCollaborators([...markedCollaborators, name]);
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
          setDes(val);
        }}
        style={{ width: 400 }}
        value={des}
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
