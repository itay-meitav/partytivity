import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../dashboard/Title";
import { Button, Stack } from "@mui/material";
import config from "../../assets/config";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Lottie from "react-lottie-player";

export default function PartiesList() {
  const [parties, setParties] = useState<any[]>([]);
  const [noParties, setNoParties] = useState<boolean>(false);
  const [loadDisabled, setLoadDisabled] = useState(false);
  const [animationData, setAnimationData] =
    useState<Record<string | number, any>>();

  useEffect(() => {
    getUserParties();
  }, []);

  useEffect(() => {
    if (noParties) {
      import("./no-parties.json").then(setAnimationData);
    }
  }, [noParties]);

  function getUserParties() {
    fetch(`${config.apiHost}/api/dashboard/my-parties/`, {
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      if (Number(data.count) > 0) {
        setParties(data.parties);
        if (Number(data.count) < 5) {
          setLoadDisabled(true);
        }
      } else {
        setNoParties(true);
      }
    });
  }

  return (
    <>
      {!noParties ? (
        !parties.length ? (
          <div className="loader" style={{ height: 300 }}>
            <div className="loader-item" />
            <div className="loader-item" />
            <div className="loader-item" />
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Invitation Page</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parties.map((party) => (
                  <TableRow hover role={"button"} key={party.id}>
                    <TableCell>
                      {dayjs(party.date).format("DD/MM/YYYY, LT")}
                    </TableCell>
                    <TableCell>{party.title}</TableCell>
                    <TableCell>{party.description}</TableCell>
                    <TableCell>
                      <Link
                        to={`/invite/${party.invite_token}`}
                        target="_blank"
                        style={{ all: "unset" }}
                      >
                        <Button
                          color="secondary"
                          style={{ width: "max-content" }}
                        >
                          Click Here
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">{party.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      ) : !animationData ? (
        <div className="loader" style={{ height: 300 }}>
          <div className="loader-item" />
          <div className="loader-item" />
          <div className="loader-item" />
        </div>
      ) : (
        <div className="noParties">
          <Lottie
            className="no-parties-animation"
            animationData={animationData}
            play={true}
            loop={true}
          />
          <h1>Boring</h1>
          <p>are you going to do something with it?</p>
        </div>
      )}
      <Button
        disabled={loadDisabled}
        color="secondary"
        style={{
          display: !parties.length ? "none" : "",
          width: "max-content",
          alignSelf: "flex-start",
        }}
      >
        Load More
      </Button>
    </>
  );
}
