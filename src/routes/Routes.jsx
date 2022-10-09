import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { Home } from "../pages/Home";
import { Signin } from "../pages/Signin";

export const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Signin />} />
      </Route>
      <Route path="/homepage" element={<Home />} />
    </Routes>
  );
};
