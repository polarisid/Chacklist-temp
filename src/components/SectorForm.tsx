import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";
import TextField from "@mui/material/TextField";
import SaveButton from "../components/buttonSave"; // Certifique-se de que o caminho está correto

const SectorForm: React.FC = () => {
  const [sector, setSector] = useLocalStorage("sector", "");
  const [inputValue, setInputValue] = useState(sector);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSector(inputValue);
    } catch (e) {}
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {/* <label htmlFor="sector">Setor:</label> */}

      <TextField
        required
        label="Setor"
        variant="outlined"
        id="sector"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* 
      <input
        id="sector"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      /> */}
      <SaveButton />

      {/* <button type="submit">Salvar Setor</button> */}
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  width: 100%;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 5px;
  input {
    font-size: 1rem;
    height: 10px;
    text-align: center;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
  }
`;

export default SectorForm;
