import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilState } from "recoil";
import { Dropdown, Form } from "react-bootstrap";
import { Stack, Typography } from "@mui/material";
import { addServicesInputsState, newPartyDetailsState } from "../globalStates";
import config from "../../../assets/config";

type Tprops = {
  serviceType: string;
};

function ServiceInputs(props: Tprops) {
  const key = props.serviceType.toLowerCase().replace(" service", "Service");
  const [show, setShow] = useState(false);
  const [addServicesInput, setAddServicesInput] = useRecoilState(
    addServicesInputsState
  );
  const [servicesList, setServicesList] = useState<string[]>([]);
  const [partyDetails, setPartyDetails] = useRecoilState(newPartyDetailsState);
  const filteredOptions = servicesList.filter((service) =>
    service.toLowerCase().includes(partyDetails.services[key].toLowerCase())
  );

  useEffect(() => {
    fetch(`${config.apiHost}/api/dashboard/my-parties/new/services`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceType: key }),
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
    <Stack justifyContent={"flex-start"} alignItems={"flex-start"} spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {props.serviceType}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
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
              value={partyDetails.services[key]}
              onFocus={() => setShow(true)}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setPartyDetails({
                  ...partyDetails,
                  services: {
                    ...partyDetails.services,
                    [key]: val,
                  },
                });
              }}
              onBlur={(e) => {
                const val = e.currentTarget.value;
                if (addServicesInput.filter((x) => x == val).length) {
                  return false;
                }
                setPartyDetails({
                  ...partyDetails,
                  services: {
                    ...partyDetails.services,
                    [key]: "",
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
                      setPartyDetails({
                        ...partyDetails,
                        services: {
                          ...partyDetails.services,
                          [key]: x,
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
            setAddServicesInput(
              addServicesInput.filter((x) => x !== props.serviceType)
            );
          }}
          aria-label="delete"
          size="medium"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Stack>
  );
}

export default ServiceInputs;
