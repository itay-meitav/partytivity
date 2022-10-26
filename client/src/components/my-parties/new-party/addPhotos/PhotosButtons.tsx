import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState } from "recoil";
import config from "../../../../assets/config";
import { partyDetailsState } from "../NewParty";

function PhotosButtons() {
  const [partyDetails, setPartyDetails] = useRecoilState(partyDetailsState);
  const [files, setFiles] = useState<FormData>(new FormData());
  const [settings, setSettings] = useState({
    errorMessage: "",
    tooltipMessage: false,
    disable: false,
  });

  async function submitFiles() {
    const req = await fetch(`${config.apiHost}/api/photos`, {
      method: "post",
      credentials: "include",
      body: files,
    });
    const data = await req.json();
    if (data.success) {
      setPartyDetails({ ...partyDetails, photos: data.files });
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
        spacing={2}
      >
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
                    ...settings,
                    disable: true,
                    tooltipMessage: true,
                  });
                  setTimeout(() => {
                    setSettings({
                      ...settings,
                      disable: true,
                      tooltipMessage: false,
                    });
                  }, 3000);
                } else {
                  setSettings({ ...settings, disable: false });
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
