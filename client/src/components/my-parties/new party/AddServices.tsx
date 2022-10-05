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
import { atom, RecoilState, useRecoilState } from "recoil";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const services = [
  "Location Service",
  "Food Service",
  "Music Service",
  "Entertainment Service",
  "General Service",
];

export const serviceState = atom({
  key: "service" as string,
  default: [] as string[],
});

function AddServices() {
  const [msg, setMsg] = useState<boolean>(false);
  const [markedService, setMarkedService] = useState<string>("");
  const [serviceType, setServiceType] = useRecoilState<string[]>(serviceState);
  return (
    <>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Services
      </Typography>
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
          value={markedService}
        >
          {services.map((x, i) => {
            return (
              <MenuItem
                value={x}
                key={i}
                onClick={() => {
                  setMarkedService(x);
                }}
              >
                <ListItemText primary={x} />
              </MenuItem>
            );
          })}
        </Select>
        <OverlayTrigger
          placement="top"
          show={msg}
          overlay={
            <Tooltip id="button-tooltip-2">
              At this stage you can add up to 5 services only. <br />
              You will be able to add more later.
            </Tooltip>
          }
        >
          <Button
            style={{ width: "max-content" }}
            variant="outlined"
            color="success"
            size="small"
            onClick={() => {
              if (serviceType.length < 5) {
                setServiceType([...serviceType, markedService]);
              } else {
                setMsg(true);
                setTimeout(() => {
                  setMsg(false);
                }, 4000);
              }
            }}
          >
            Add New Service
          </Button>
        </OverlayTrigger>
      </FormControl>
    </>
  );
}

export default AddServices;