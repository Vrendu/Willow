import React from "react";
import { Route, Switch } from "react-router-dom";
//import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar/SearchBar";
import Listings from "./components/Listings/Listings";

function App() {
  return (
    <>
      <Navigation />
        <SearchBar></SearchBar>
        <Listings></Listings>
    </>
  );
}

export default App;