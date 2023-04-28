import React from "react";
import { Route, Switch } from "react-router-dom";
//import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar/SearchBar";
import Listings from "./components/Listings/Listings";
import ListingShow from "./components/ListingShow/ListingShow";
import ListingForm from "./components/ListingForm/ListingForm";

function App() {
  return (
    <>
      <Navigation />
      
      <Switch>
        <Route exact path="/"> 
          <Listings></Listings>
        </Route>
        <Route exact path="/listings/:id">
          <ListingShow></ListingShow>
        </Route>
        <Route exact path="/newlisting">
          <ListingForm></ListingForm>
        </Route>
      </Switch>
        
    </>
  );
}

export default App;