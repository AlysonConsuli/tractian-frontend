import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
// import { DefaultPage } from "../layouts/DefaultPage";
import ProtectedLayout from "../layouts/ProtectedLayout";
import { Home } from "../pages/Home";
import { Signin } from "../pages/Signin";

export const Router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Signin />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/homepage" element={<Home />} />
      </Route>
    </Routes>
  );
};
