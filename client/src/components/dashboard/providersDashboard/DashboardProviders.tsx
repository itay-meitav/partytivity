import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./ChartProviders";
import Deposits from "./DepositsProviders";
import Orders from "./OrdersProviders";
import DashboardTemplate from "../DashboardTemplate";

function DashboardProviders() {
  return (
    <DashboardTemplate>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            style={{ minWidth: "max-content" }}
            elevation={2}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper
            style={{ minWidth: "max-content" }}
            elevation={2}
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          >
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </DashboardTemplate>
  );
}

export default DashboardProviders;
