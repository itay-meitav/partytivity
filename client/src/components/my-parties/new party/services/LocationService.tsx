import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { serviceState } from "../AddServices";
import { useRecoilState } from "recoil";
import { Dropdown, Form } from "react-bootstrap";

function LocationService() {
  const [inputVal, setInputVal] = React.useState("");
  const [serviceType, setServiceType] = useRecoilState(serviceState);
  const filteredOptions = names.filter((option) =>
    option.toLowerCase().includes(inputVal.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Dropdown drop={"down"}>
        <Dropdown.Toggle variant="input" bsPrefix="p-0">
          <Form.Control
            type="search"
            className="me-1 shadow-none"
            placeholder="Location Service"
            value={inputVal}
            onChange={(e) => {
              const val = e.currentTarget.value;
              setInputVal(val);
            }}
            required
          />
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            width: "100%",
            height: "fit-content",
            maxHeight: 200,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {filteredOptions.length > 0
            ? filteredOptions.map((x, i) => (
                <Dropdown.Item
                  as="button"
                  onClick={() => {
                    setInputVal(x);
                  }}
                  style={{ whiteSpace: "initial" }}
                  key={i}
                >
                  {x}
                </Dropdown.Item>
              ))
            : ""}
        </Dropdown.Menu>
      </Dropdown>
      <IconButton
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          setServiceType(serviceType.filter((x) => x !== "Location Service"));
        }}
        aria-label="delete"
        size="medium"
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default LocationService;

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
