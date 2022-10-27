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
import { atom, useRecoilState } from "recoil";
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
  const [serviceType, setServiceType] = useRecoilState<string[]>(
    addServicesInputsState
  );

  function switchCaseService(serviceType: string, i: number) {
    switch (serviceType) {
      case "Entertainment Service":
        return <ServiceInputs serviceType={"entertainmentService"} key={i} />;
      case "Food Service":
        return <ServiceInputs serviceType={"foodService"} key={i} />;
      case "Music Service":
        return <ServiceInputs serviceType={"musicService"} key={i} />;
      case "General Service":
        return <ServiceInputs serviceType={"generalService"} key={i} />;
      case "Location Service":
        return <ServiceInputs serviceType={"locationService"} key={i} />;
    }
  }

  return (
    <div>
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
              At this stage you can add up to 5 services only, as well as <br />
              one service of each type. You will be able to add more later.
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
              if (markedService) {
                if (serviceType.length < 5) {
                  if (!serviceType.find((x) => x == markedService)) {
                    setServiceType([...serviceType, markedService]);
                  } else {
                    setMsg(true);
                    setTimeout(() => {
                      setMsg(false);
                    }, 4000);
                  }
                }
              }
              return false;
            }}
          >
            Add New Service
          </Button>
        </OverlayTrigger>
      </FormControl>
    </div>
  );
}

export default ServicesMain;
