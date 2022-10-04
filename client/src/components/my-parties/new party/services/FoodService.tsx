import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, TextField } from "@mui/material";

function FoodService() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [inputVal, setInputVal] = React.useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <FormControl variant="standard">
        <TextField
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={() => handleClick}
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
      </FormControl>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {names.map((x) => {
          return (
            <MenuItem
              onClick={(e) => {
                const val = e.currentTarget.value.toString();
                setInputVal(val);
                handleClose();
              }}
            >
              {x}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default FoodService;

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
