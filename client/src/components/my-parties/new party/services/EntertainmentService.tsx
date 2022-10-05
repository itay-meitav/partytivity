import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, TextField } from "@mui/material";

function EntertainmentService() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");
  const anchorRef = React.useRef<HTMLInputElement>(null);
  return (
    <div>
      <FormControl variant="standard">
        <TextField
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={() => setOpenMenu(true)}
          onBlur={() => setOpenMenu(false)}
          ref={anchorRef}
          id="filled-textarea"
          label="Entertainment Service"
          placeholder="Service"
          value={inputVal}
          onChange={(e) => {
            const val = e.currentTarget.value;
            setInputVal(val);
          }}
          multiline
          required
        />

        <Menu
          anchorEl={anchorRef.current}
          id="basic-menu"
          open={openMenu}
          MenuListProps={{
            "aria-labelledby": "filled-textarea",
          }}
        >
          {names
            .filter((x) => x.includes(inputVal))
            .map((x, i) => {
              return (
                <MenuItem
                  key={i}
                  onClick={(e) => {
                    const val = e.currentTarget.value.toString();
                    setInputVal(val);
                    setOpenMenu(false);
                  }}
                >
                  {x}
                </MenuItem>
              );
            })}
        </Menu>
      </FormControl>
    </div>
  );
}

export default EntertainmentService;

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
