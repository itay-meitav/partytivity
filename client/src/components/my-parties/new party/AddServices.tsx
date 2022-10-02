import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";


function AddServices() {
  const [serviceType, setServiceType] = useState("");
  return (
    <>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Services
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormControl
          sx={{
            width: 400,
            height: 50,
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          <InputLabel id="demo-simple-select-label">Service Type</InputLabel>
          <Select
            style={{ flex: 2 }}
            labelId="demo-simple-select-label"
            placeholder="Service Type"
            id="demo-simple-select"
            label="Service Type"
            value={serviceType}
            required
          >
            {services.map((x) => {
              return (
                <MenuItem
                  value={x}
                  onClick={() => {
                    if (serviceType == x) return false;
                    setServiceType(x);
                  }}
                >
                  <ListItemText primary={x} />
                </MenuItem>
              );
            })}
          </Select>
          <Button
            style={{ width: "max-content" }}
            variant="outlined"
            color="success"
            type="submit"
            size="small"
          >
            Add New Service
          </Button>
        </FormControl>
      </form>
    </>
  );
}

export default AddServices;

const services = [
  "Location Service",
  "Food Service",
  "Music Service",
  "Entertainment Service",
  "General Service",
];
