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
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [markedCollaborators, setMarkedCollaborators] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [des, setDes] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("details")) {
      const details = JSON.parse(localStorage.getItem("details")!);
      setMarkedCollaborators(details.collaborators);
      setTitle(details.title);
      setDes(details.description);
    }
    setCollaborators(names);
  }, []);

  return (
    <Stack direction="column" spacing={0.1}>
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
            defaultValue={title}
            onBlur={(e) => {
              localStorage.setItem(
                "details",
                JSON.stringify({
                  title: e.currentTarget.value,
                  description: des,
                  collaborators: markedCollaborators,
                })
              );
            }}
            multiline
            required
          />
          <TextField
            sx={{ flex: 1 }}
            id="filled-textarea"
            label="Party Description"
            onChange={(e) => {
              const val = e.currentTarget.value;
              setDes(val);
            }}
            onBlur={(e) => {
              localStorage.setItem(
                "details",
                JSON.stringify({
                  title: title,
                  description: e.currentTarget.value,
                  collaborators: markedCollaborators,
                })
              );
            }}
            defaultValue={des}
            placeholder="Description"
            multiline
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Collaborators
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              onBlur={() => {
                localStorage.setItem(
                  "details",
                  JSON.stringify({
                    title: title,
                    description: des,
                    collaborators: markedCollaborators,
                  })
                );
              }}
              value={markedCollaborators}
              input={<OutlinedInput label="Collaborators" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {collaborators.map((name, i) => (
                <MenuItem
                  key={i}
                  value={name}
                  onClick={() => {
                    if (markedCollaborators.includes(name)) {
                      setMarkedCollaborators(
                        markedCollaborators.filter((x) => x !== name)
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
