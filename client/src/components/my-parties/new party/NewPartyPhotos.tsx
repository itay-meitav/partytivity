import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardTemplate from "../../dashboard/DashboardTemplate";
import Title from "../../dashboard/Title";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import config from "../../../assets/config";
import "holderjs/holder";
import { useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function NewPartyPhotos() {
  const [files, setFiles] = useState<FormData>(new FormData());
  const [srcArr, setSrcArr] = useState<string[]>(
    JSON.parse(localStorage.getItem("src")!) || []
  );
  const msg = useRef<HTMLDivElement>(null);

  async function submitForm() {
    const req = await fetch(`${config.apiHost}/api/photos`, {
      method: "post",
      credentials: "include",
      body: files,
    });
    const data = await req.json();
    if (data.success) {
      setSrcArr(
        data.files.map((x: any) =>
          x.path.replaceAll("src", `http:${config.apiHost}`)
        )
      );
      localStorage.setItem("src", JSON.stringify(srcArr));
      window.location.reload();
    } else {
      msg.current!.innerHTML = data.massage;
    }
  }

  return (
    <DashboardTemplate>
      <Grid item xs={12}>
        <Paper
          style={{ minWidth: "max-content" }}
          sx={{ p: 2, display: "flex", flexDirection: "column" }}
          elevation={2}
        >
          <Stack direction="column" spacing={5}>
            <Stack direction="column" spacing={-1}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Title style={{ marginBottom: 20 }}>Party Photos</Title>
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to="/dashboard/my-parties/new"
                >
                  <IconButton
                    size="small"
                    style={{ marginBottom: 15 }}
                    aria-label="back"
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Link>
              </Stack>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Add life to your party! Try something that will get people in
                without even blinking
              </Typography>
            </Stack>
            {!srcArr.length ? (
              <Carousel>
                <div>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Image1&bg=eee"
                    alt="Photo"
                  />
                  <p className="legend">My First Image</p>
                </div>
                <div>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Image2&bg=eee"
                    alt="Photo"
                  />
                  <p className="legend">My Second Image</p>
                </div>
              </Carousel>
            ) : (
              <Carousel width={950}>
                {srcArr.map((x, i) => (
                  <div key={i}>
                    <img className="d-block w-100 h-100" src={x} alt="Photo" />
                  </div>
                ))}
              </Carousel>
            )}
            <Stack direction="row" justifyContent={"space-between"}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitForm();
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
                        const formData = new FormData();
                        for (let i = 0; i < e.target.files.length; i++) {
                          formData.append("files", e.target.files[i]);
                        }
                        setFiles(formData);
                      }}
                      required
                    />
                  </Button>
                  <Button
                    style={{ width: "max-content" }}
                    variant="contained"
                    type="submit"
                  >
                    Upload
                  </Button>
                </div>
              </form>
              <div ref={msg}></div>
              <Button
                style={{ width: "max-content" }}
                variant="contained"
                component="label"
                color="success"
              >
                Create Party
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </DashboardTemplate>
  );
}

export default NewPartyPhotos;
