import React from "react";
import { Route, Switch } from "react-router-dom";
//import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar/SearchBar";
import Listings from "./components/Listings/Listings";
import ListingShow from "./components/ListingShow/ListingShow";
import ListingForm from "./components/ListingForm/ListingForm";
import UpdateForm from "./components/UpdateForm/UpdateForm";
import ListingIndex from "./components/ListingIndex/ListingIndex";
import Profile from "./components/Profile/Profile";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <Navigation />
      
      <Switch>
        <Route exact path="/"> 
        <div className="home-page">
            <img
              src="/home_page_background.jpeg"
              className="home_page_background"
            />
            <div className= "banner-text" style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#fff",
              fontSize: "2.5rem",
              fontFamily: "sans-serif",
              
            }}>
              Find a Home Today
            </div>
            
            <div className="listings">
              <span className="recently-added-text">Recently Added Listings</span>
              <div className ="listingsswiper">
                <Listings></Listings>
              </div>
            </div>
            
          </div>
        </Route>
        <Route exact path="/profile">
          <Profile></Profile>
        </Route>
        <Route exact path="/listings/:id">
          <ListingShow></ListingShow>
        </Route>
        <Route exact path="/newlisting">
          <ListingForm></ListingForm>
        </Route>
        <Route exact path="/updatelisting">
          <UpdateForm></UpdateForm>
        </Route>
        <Route exact path="/searchresults">
          <ListingIndex/>
        </Route>
      </Switch>
        
    </>
  );
}

export default App;