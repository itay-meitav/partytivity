import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import RecommendIcon from "@mui/icons-material/Recommend";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link
      style={{ color: "inherit", textDecoration: "inherit" }}
      to={"/dashboard"}
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link
      style={{ color: "inherit", textDecoration: "inherit" }}
      to={"/dashboard/my-parties"}
    >
      <ListItemButton>
        <ListItemIcon>
          <CelebrationIcon />
        </ListItemIcon>
        <ListItemText primary="My Parties" />
      </ListItemButton>
    </Link>
    <Link
      style={{ color: "inherit", textDecoration: "inherit" }}
      to={"/dashboard/discover"}
    >
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Discover" />
      </ListItemButton>
    </Link>
    <Link
      style={{ color: "inherit", textDecoration: "inherit" }}
      to={"/dashboard/statistics"}
    >
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItemButton>
    </Link>
    <Link
      style={{ color: "inherit", textDecoration: "inherit" }}
      to={"/dashboard/providers"}
    >
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Providers" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Additions
    </ListSubheader>
    <Link
      style={{ color: "inherit", textDecoration: "inherit" }}
      to={"/dashboard/photos"}
    >
      <ListItemButton>
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary="Photos" />
      </ListItemButton>
    </Link>
    <Link
      style={{ color: "inherit", textDecoration: "inherit" }}
      to={"/dashboard/recommendations"}
    >
      <ListItemButton>
        <ListItemIcon>
          <RecommendIcon />
        </ListItemIcon>
        <ListItemText primary="Recommendations" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
