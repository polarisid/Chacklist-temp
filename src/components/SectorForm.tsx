import React, { useState } from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";

const SectorForm: React.FC = () => {
  const [sector, setSector] = useLocalStorage("sector", "");
  const [inputValue, setInputValue] = useState(sector);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSector(inputValue);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="sector">Setor:</label>
      <input
        id="sector"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Salvar Setor</button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  label {
    font-size: 1.2rem;
  }
  input {
    padding: 5px;
    font-size: 1rem;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default SectorForm;
