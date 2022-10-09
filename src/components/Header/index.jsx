import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as S from "../../styles/style.js";
import { ModalComponent } from "../Modal/index";

export const Header = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [logoutModal, setLogoutModal] = useState(false);

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <>
      <ModalComponent
        modalState={logoutModal}
        callbackCloseModal={() => setLogoutModal(false)}
        callbackFunction={() => logout()}
        message={"logout"}
      />
      <S.Header>
        <S.Title>
          <h1>Tractian</h1>
        </S.Title>
        <S.LogoutIcon onClick={() => setLogoutModal(true)}></S.LogoutIcon>
      </S.Header>
    </>
  );
};
