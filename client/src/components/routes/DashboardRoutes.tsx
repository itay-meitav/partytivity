import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Discover from "../discover/Discover";
import Recommendations from "../recommendations/Recommendations";
import Statistics from "../statistics/Statistics";
import Providers from "../providers/Providers";
import Photos from "../photos/Photos";
import MyParties from "../my-parties/MyParties";

const DashboardRoutes = () => {
  return (
    <>
      <Route index element={<Dashboard />} />
      <Route path="photos" element={<Photos />} />
      <Route path="my-parties" element={<MyParties />} />
      <Route path="discover" element={<Discover />} />
      <Route path="recommendations" element={<Recommendations />} />
      <Route path="statistics" element={<Statistics />} />
      <Route path="providers" element={<Providers />} />
    </>
  );
};

export default DashboardRoutes;
