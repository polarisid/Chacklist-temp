import { useState } from "react";
import * as React from "react";

import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";
import TextField from "@mui/material/TextField";

const SectorForm: React.FC = () => {
  const [sector, setSector] = useLocalStorage("sector", "");
  const [inputValue, setInputValue] = useState(sector);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSector(inputValue);
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
      <button type="submit">Salvar Setor</button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  input {
    /* padding: 5px; */
    font-size: 1rem;
    height: 10px;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default SectorForm;
