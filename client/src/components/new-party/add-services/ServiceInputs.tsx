import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState } from "recoil";
import { Dropdown, Form } from "react-bootstrap";
import { Typography } from "@mui/material";
import { addServicesInputsState, partyDetailsState } from "../globalStates";
import config from "../../../assets/config";

type Tprops = {
  serviceType: string;
};

function ServiceInputs(props: Tprops) {
  const [servicesList, setServicesList] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [serviceType, setServiceType] = useRecoilState(addServicesInputsState);
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const [inputVal, setInputVal] = useState(
    JSON.parse(localStorage.getItem("details")!)[props.serviceType] || ""
  );
  const filteredOptions = servicesList.filter((service) =>
    service.toLowerCase().includes(inputVal.toLowerCase())
  );

  useEffect(() => {
    fetch(`${config.apiHost}/api/dashboard/my-parties/new/services`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceType: props.serviceType }),
    })
      .then(async (res) => {
        const data = await res.json();
        setServicesList(data.services.map((x: any) => x.title));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!filteredOptions.length) {
      setShow(false);
    }
  }, [filteredOptions]);

  return (
    <div>
      <Typography
        variant="body2"
        style={{ marginLeft: 7, padding: 0 }}
        color="text.secondary"
      >
        {props.serviceType}
      </Typography>
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
              placeholder={props.serviceType}
              value={inputVal}
              onFocus={() => setShow(true)}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setInputVal(val);
              }}
              onBlur={(e) => {
                const val = e.currentTarget.value;
                if (servicesList.filter((x) => x == val).length) {
                  return false;
                }
                setInputVal("");
                setPartyDetails({
                  ...partyDetails,
                  services: {
                    ...partyDetails.services,
                    [props.serviceType]: "",
                  },
                });
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
                      setInputVal(x);
                      setPartyDetails({
                        ...partyDetails,
                        services: {
                          ...partyDetails.services,
                          [props.serviceType]: x,
                        },
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
            setServiceType(serviceType.filter((x) => x !== props.serviceType));
          }}
          aria-label="delete"
          size="medium"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ServiceInputs;
