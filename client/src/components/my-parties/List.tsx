import * as React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../dashboard/Title";
import { Button, Stack } from "@mui/material";

// Generate Order Data
function createData(
  id: number,
  date: string,
  title: string,
  services: string[],
  status: string
) {
  return { id, date, title, services, status };
}

const rows = [
  createData(0, "16 Mar, 2019", "Elvis Presley", ["Tupelo, MS"], "pending"),
  createData(1, "16 Mar, 2019", "Paul McCartney", ["London, UK"], "pending"),
  createData(2, "16 Mar, 2019", "Tom Scholz", ["Boston, MA"], "pending"),
  createData(3, "16 Mar, 2019", "Michael Jackson", ["Gary, IN"], "pending"),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    ["Long Branch, NJ"],
    "pending"
  ),
];

export default function List() {
  return (
    <React.Fragment>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Title>My Parties</Title>
        <Link
          to="/dashboard/my-parties/new"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button color="secondary" title="Create New Party">
            New Party
          </Button>
        </Link>
      </Stack>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Services</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.services}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button color="secondary" style={{ marginTop: 20, width: "fit-content" }}>
        Load More
      </Button>
    </React.Fragment>
  );
}
