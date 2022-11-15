import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
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
  const [messages, setMessages] = useState({
    message1: false,
    message2: false,
  });
  const [markedService, setMarkedService] = useState<string>("");
  const [addServicesInput, setAddServicesInput] = useRecoilState(
    addServicesInputsState
  );

  return (
    <Stack alignItems={"flex-start"} justifyContent={"flex-start"} spacing={5}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={1}
      ></Stack>
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
          show={messages.message2}
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
              if (!markedService) {
                return false;
              } else if (addServicesInput.find((x) => x == markedService)) {
                setMessages({ ...messages, message2: true });
                setTimeout(() => {
                  setMessages({ ...messages, message2: false });
                }, 5000);
              } else {
                setAddServicesInput([...addServicesInput, markedService]);
              }
            }}
            onBlur={() => setMessages({ ...messages, message2: false })}
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
