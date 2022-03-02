import React, { useLayoutEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutesIndex from "./components/privateRoutes/PrivateRoutesIndex";
import PublicRoutesIndex from "./components/publicRoutes/guestPage/PublicRoutesIndex";
import { connect } from "react-redux";

function App({ userValidation }: any) {
  console.log("uservalidation", userValidation);

  const [auth, setAuth] = useState<boolean>(false);
  function getCookieData() {
    let decodedCookie = decodeURIComponent(document.cookie);
    if (decodedCookie !== "") {
      let splitDataToSentences = decodedCookie.split(" ");
      splitDataToSentences.forEach((element) => {
        if (element.split("=")[0] === "isLogged") {
          let isLoggedBoolean = element.split("=")[1];
          if (isLoggedBoolean === "true") {
            setAuth(true);
            return true;
          } else {
            setAuth(false);
            return false;
          }
        } else {
          setAuth(false);
          return false;
        }
      });
    } else {
      setAuth(false);
      return false;
    }
  }

  useLayoutEffect(() => {
    getCookieData();
  }, []);

  function IsLoggedIn() {
    console.log(userValidation.isLoggedIn);
    if (auth || userValidation.isLoggedIn) {
      return <PrivateRoutesIndex />;
    } else {
      return <PublicRoutesIndex />;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<IsLoggedIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (userVal: any) => {
  const userValidation = userVal.userData;
  return { userValidation };
};

export default connect(mapStateToProps)(App);
