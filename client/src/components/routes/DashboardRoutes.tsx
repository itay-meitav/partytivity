import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Discover from "../discover/Discover";
import Recommendations from "../recommendations/Recommendations";
import Statistics from "../statistics/Statistics";
import Providers from "../providers/Providers";
import Photos from "../photos/Photos";
import MyParties from "../my-parties/MyParties";
import UserSettings from "../userSettings/UserSettings";
import NewParty from "../my-parties/new party/NewParty";
import NewPartyPhotos from "../my-parties/new party/NewPartyPhotos";

export const DashboardRoutes = [
  { element: <Dashboard />, index: true },
  { path: "photos", element: <Photos /> },
  {
    path: "my-parties",
    children: [
      { element: <MyParties />, index: true },
      {
        path: "new",
        children: [
          { element: <NewParty />, index: true },
          { path: "photos", element: <NewPartyPhotos /> },
        ],
      },
    ],
  },
  { path: "discover", element: <Discover /> },
  { path: "recommendations", element: <Recommendations /> },
  { path: "statistics", element: <Statistics /> },
  { path: "providers", element: <Providers /> },
  { path: "settings", element: <UserSettings /> },
];
