import { Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import { newPartyDetailsState } from "../globalStates";
import config from "../../../assets/config";

type Tprops = {
  error: string;
};

function PhotosButtons(props: Tprops) {
  const [partyDetails, setPartyDetails] = useRecoilState(newPartyDetailsState);
  const [files, setFiles] = useState<FormData>(new FormData());
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(partyDetails));
  }, [partyDetails]);

  async function submitFiles() {
    const names = JSON.parse(localStorage.getItem("names")!);
    if (names) {
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
          setError("There is a problem with changing the images");
        }
      });
    } else if (partyDetails.photos.length && !names) {
      setError("There is a problem with changing the images");
    }
    fetch(`${config.apiHost}/api/photos`, {
      method: "post",
      credentials: "include",
      body: files,
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("names", JSON.stringify(data.names));
        setPartyDetails({ ...partyDetails, photos: data.files });
        // localStorage.setItem("src", JSON.stringify(data.files.map((x: any) =>
        //     x.path.replaceAll("src", `http:${config.apiHost}`)
        //     )
        //   ));
        // window.location.reload();
      } else {
        setError(data.message);
      }
    });
  }
  return (
    <div className="photoButtons">
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
              setError("There is a problem with deleting the images");
            } else {
              setError("");
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
      <Button component="label" variant="outlined">
        Choose Photos
        <input
          hidden
          multiple
          accept="image/*"
          type="file"
          name="files"
          onChange={(e: any) => {
            if (e.target.files.length > 4) {
              setError("You can upload up to four photos only");
            } else {
              setError("");
              const formData = new FormData();
              for (let i = 0; i < e.target.files.length; i++) {
                formData.append("files", e.target.files[i]);
              }
              setFiles(formData);
            }
          }}
        />
      </Button>
      <Button
        variant="contained"
        disabled={error.length ? true : false}
        onClick={() => submitFiles()}
      >
        Upload
      </Button>
      <Typography color="text.secondary">{props.error || error}</Typography>
    </div>
  );
}

export default PhotosButtons;
