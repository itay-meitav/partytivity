import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { serviceState } from "../AddServices";
import { atom, useRecoilState } from "recoil";
import { Dropdown, Form } from "react-bootstrap";
import { partyDetailsState } from "../BasicInformation";

function EntertainmentService() {
  const [serviceType, setServiceType] = useRecoilState(serviceState);
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const filteredOptions = names.filter((option) =>
    option
      .toLowerCase()
      .includes(partyDetails.entertainmentService.toLowerCase())
  );
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (!filteredOptions.length) {
      setShow(false);
    }
    return;
  }, [filteredOptions]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setShow(false);
      }}
    >
      <Dropdown show={show} drop={"up"}>
        <Dropdown.Toggle variant="input" bsPrefix="p-0">
          <Form.Control
            type="search"
            className="me-1 shadow-none"
            placeholder="Entertainment Service"
            value={partyDetails.entertainmentService}
            onFocus={() => setShow(true)}
            onChange={(e) => {
              const val = e.currentTarget.value;
              setPartyDetails({ ...partyDetails, entertainmentService: val });
            }}
            onBlur={(e) => {
              const val = e.currentTarget.value;
              if (names.filter((x) => x == val).length) {
                return false;
              }
              setPartyDetails({ ...partyDetails, entertainmentService: "" });
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
                  type="button"
                  as="button"
                  onClick={() => {
                    setPartyDetails({
                      ...partyDetails,
                      entertainmentService: x,
                    });
                    setShow(false);
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
          setServiceType(
            serviceType.filter((x) => x !== "Entertainment Service")
          );
        }}
        aria-label="delete"
        size="medium"
      >
        <DeleteIcon />
      </IconButton>
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
