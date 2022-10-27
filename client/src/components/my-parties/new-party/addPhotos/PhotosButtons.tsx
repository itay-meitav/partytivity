import { Button, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState } from "recoil";
import config from "../../../../assets/config";
import { partyDetailsState } from "../NewParty";
import DeleteIcon from "@mui/icons-material/Delete";

function PhotosButtons() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const [files, setFiles] = useState<FormData>(new FormData());
  const [settings, setSettings] = useState({
    errorMessage: "",
    tooltipMessage: false,
    disable: false,
  });

  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(partyDetails));
  }, [partyDetails]);

  async function submitFiles() {
    if (partyDetails.photos.length) {
      const names = JSON.parse(localStorage.getItem("names")!);
      fetch(`${config.apiHost}/api/photos/remove`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ photos: names }),
      }).then((res) => {
        if (!res.ok) {
          setSettings({
            ...settings,
            errorMessage: "There is a problem with changing the images.",
          });
          return;
        }
      });
    }
    const req = await fetch(`${config.apiHost}/api/photos`, {
      method: "post",
      credentials: "include",
      body: files,
    });
    const data = await req.json();
    if (data.success) {
      console.log(data.files);

      localStorage.setItem("names", JSON.stringify(data.names));
      setPartyDetails({ ...partyDetails, photos: data.files });
      console.log(partyDetails);
      // localStorage.setItem("src", JSON.stringify(data.files.map((x: any) =>
      //     x.path.replaceAll("src", `http:${config.apiHost}`)
      //     )
      //   ));
      // window.location.reload();
    } else {
      setSettings({ ...settings, errorMessage: data.massage });
    }
  }
  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        submitFiles();
      }}
    >
      <Stack
        direction="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={1}
      >
        <IconButton
          onClick={() => {
            const names = JSON.parse(localStorage.getItem("names")!);
            fetch(`${config.apiHost}/api/photos/remove`, {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ photos: names }),
            }).then((res) => {
              if (!res.ok) {
                setSettings({
                  ...settings,
                  errorMessage: "There is a problem with deleting the images.",
                });
              } else {
                setPartyDetails({
                  ...partyDetails,
                  photos: [],
                });
                localStorage.removeItem("names");
              }
            });
          }}
          size="large"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
        <OverlayTrigger
          placement="top"
          show={settings.tooltipMessage}
          overlay={
            <Tooltip id="button-tooltip-2">
              You can add up to four photos only. Try again.
            </Tooltip>
          }
        >
          <Button
            style={{ width: "max-content" }}
            variant="outlined"
            component="label"
          >
            Choose Photos
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              name="files"
              onChange={(e: any) => {
                if (e.target.files.length > 4) {
                  setSettings({
                    errorMessage: "",
                    disable: true,
                    tooltipMessage: true,
                  });
                  setTimeout(() => {
                    setSettings({
                      errorMessage: "",
                      disable: true,
                      tooltipMessage: false,
                    });
                  }, 3000);
                } else {
                  setSettings({
                    ...settings,
                    errorMessage: "",
                    disable: false,
                  });
                  const formData = new FormData();
                  for (let i = 0; i < e.target.files.length; i++) {
                    formData.append("files", e.target.files[i]);
                  }
                  setFiles(formData);
                }
              }}
            />
          </Button>
        </OverlayTrigger>
        <Button
          style={{ width: "max-content" }}
          variant="contained"
          type="submit"
          disabled={settings.disable}
        >
          Upload
        </Button>
        <div style={{ color: "#75706f" }}>{settings.errorMessage}</div>
      </Stack>
    </form>
  );
}

export default PhotosButtons;
