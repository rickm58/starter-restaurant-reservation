import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import CreateReservation from "../reservations/CreateReservation";
import CreateTable from "../tables/CreateTables";
import SeatReservation from "../reservations/SeatReservation";
import Search from "../search/search";
import EditReservation from "../reservations/EditReservation";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [forceRerender, setForceRerender] = useState(false);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation forceRerender={forceRerender} setForceRerender={setForceRerender}/>
      </Route>
      <Route exact-={true} path="/tables/new">
        <CreateTable />
      </Route>
      <Route path="/dashboard">
        <Dashboard forceRerender={forceRerender} setForceRerender={setForceRerender}/>
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
