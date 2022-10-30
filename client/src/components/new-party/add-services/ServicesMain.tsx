import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ServiceInputs from "./ServiceInputs";
import { addServicesInputsState } from "../globalStates";

const services = [
  "Location Service",
  "Food Service",
  "Music Service",
  "Entertainment Service",
  "General Service",
];

function ServicesMain() {
  const [msg, setMsg] = useState<boolean>(false);
  const [markedService, setMarkedService] = useState<string>("");
  const [addServicesInput, setAddServicesInput] = useRecoilState(
    addServicesInputsState
  );

  return (
    <Stack alignItems={"flex-start"} justifyContent={"flex-start"} spacing={5}>
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
              You can add one service of each type
            </Tooltip>
          }
        >
          <Button
            style={{ width: "max-content" }}
            variant="outlined"
            color="success"
            size="small"
            type="button"
            onClick={() => {
              if (addServicesInput.find((x) => x == markedService)) {
                setMsg(true);
                setTimeout(() => {
                  setMsg(false);
                }, 5000);
              } else {
                setAddServicesInput([...addServicesInput, markedService]);
              }
            }}
          >
            Add New Service
          </Button>
        </OverlayTrigger>
      </FormControl>
      {addServicesInput.map((x, i) => (
        <ServiceInputs serviceType={x} key={i} />
      ))}
    </Stack>
  );
}

export default ServicesMain;
