import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../NotFound";
import GuestPage from "./guestPage/GuestPage";
import UserValidation from "./userValidation/UserValidation";

const PublicRoutesIndex = () => {
  return (
    <Routes>
      <Route path="" element={<GuestPage />} />
      <Route path="/login" element={<UserValidation />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutesIndex;
