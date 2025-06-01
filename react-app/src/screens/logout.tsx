import React, { useState, useContext } from "react";
import Context from "@store/context";
import { Flex } from "@common/index";
import Alert from "@comp/alert";

export default function Logout({ showAlert, setShowAlert }) {
  const ctx = useContext(Context);

  const logPlayerOut = async (evt) => {
    // Log the Player out

    const req = await fetch("/api/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const res = await req.json();

    if (res.success) {
      setShowAlert(false);
      ctx.setLoginStatus(false);
    }
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  return (
    <React.Fragment>
      <Alert
        setShow={setShowAlert}
        show={showAlert}
        message="Are you sure you want to log out?"
        title="Logout Confirmation"
        acceptButton={{ buttonText: "Yes", onClick: logPlayerOut }}
        cancelButton={{ buttonText: "No", onClick: handleCancel }}
      />
    </React.Fragment>
  );
}
