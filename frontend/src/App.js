import React from "react";
import { Route, Switch } from "react-router-dom";
//import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar/SearchBar";
import Listings from "./components/Listings/Listings";
import ListingShow from "./components/ListingShow/ListingShow";

function App() {
  return (
    <>
      <Navigation />
      
      <Switch>
        <Route exact path="/"> 
          <SearchBar></SearchBar>
          <Listings></Listings>
        </Route>
        <Route exact path="/listings/:id">
          <ListingShow></ListingShow>
        </Route>
      </Switch>
        
    </>
  );
}

export default App;