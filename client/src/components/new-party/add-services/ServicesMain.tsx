import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useRecoilState } from "recoil";
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
  const [message, setMessage] = useState(false);
  const [markedService, setMarkedService] = useState<string>("");
  const [addServicesInput, setAddServicesInput] = useRecoilState(
    addServicesInputsState
  );

  return (
    <>
      <div className="addServices">
        <FormControl size="medium" fullWidth>
          <InputLabel id="demo-simple-select-label">Service Type</InputLabel>
          <Select
            className="selectService"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder="Service Type"
            label="Service Type"
            value={markedService}
          >
            {services.map((x, i) => (
              <MenuItem
                value={x}
                key={i}
                onClick={() => {
                  setMarkedService(x);
                }}
              >
                <ListItemText primary={x} />
              </MenuItem>
            ))}
            ;
          </Select>
        </FormControl>
        <Tooltip
          open={message}
          onOpen={() => setMessage(true)}
          onClose={() => setMessage(false)}
          title="You can add one service of each type"
          placement="top"
        >
          <Button
            variant="outlined"
            color="success"
            size="medium"
            className="addButton"
            onClick={() => {
              if (!markedService) {
                return false;
              } else if (addServicesInput.find((x) => x == markedService)) {
                return false;
              } else {
                setAddServicesInput([...addServicesInput, markedService]);
              }
            }}
          >
            Add New Service
          </Button>
        </Tooltip>
      </div>
      {addServicesInput.map((x, i) => (
        <ServiceInputs serviceType={x} key={i} />
      ))}
    </>
  );
}

export default ServicesMain;
