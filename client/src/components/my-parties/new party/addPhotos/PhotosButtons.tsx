import { Button, Stack } from "@mui/material";
import { useState } from "react";
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
    <Stack direction="row" justifyContent={"space-between"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitFiles();
        }}
        encType="multipart/form-data"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 15,
          }}
        >
          <OverlayTrigger
            placement="top"
            show={settings.tooltipMessage}
            overlay={
              <Tooltip id="button-tooltip-2">
                You can add up to four photos only.
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
                  if (e.files > 4) {
                    setSettings({ ...settings, tooltipMessage: true });
                    setTimeout(() => {
                      setSettings({ ...settings, tooltipMessage: false });
                    }, 3000);
                  }
                  const formData = new FormData();
                  for (let i = 0; i < e.target.files.length; i++) {
                    formData.append("files", e.target.files[i]);
                  }
                  setFiles(formData);
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
        </div>
      </form>
      <div>{settings.errorMessage}</div>
      <Button
        style={{ width: "max-content" }}
        variant="contained"
        color="success"
        type="submit"
        // onClick={submitParty}
      >
        Create Party
      </Button>
    </Stack>
  );
}

export default PhotosButtons;
