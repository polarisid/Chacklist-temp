import React, { useState } from "react";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import styled from "styled-components";
const SaveButton = ({ ...props }) => {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    // Simulando uma ação de salvar
    setTimeout(() => {
      setSaved(true);
    }, 1000); // Simula um delay no salvamento
  };

  return (
    <ButtonS
      variant="contained"
      color={saved ? "success" : "primary"}
      startIcon={saved ? <CheckCircleIcon /> : <SaveIcon />}
      onClick={handleClick}
      // disabled={saved} // Desativa o botão após salvar
      type="submit"
    >
      {saved ? "Salvo" : "Salvar"}
    </ButtonS>
  );
};

const ButtonS = styled(Button)`
  background-color: #007dea;
  height: 40px;
`;

export default SaveButton;
