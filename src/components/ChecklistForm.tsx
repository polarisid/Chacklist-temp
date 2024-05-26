import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";
import TemperatureHumidityChart from "./TemperatureHumidityChart";

export interface DataPoint {
  time: string;
  temperature: string;
  humidity: string;
}

const ChecklistForm: React.FC = () => {
  const [data, setData] = useLocalStorage<DataPoint[]>("data", []);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperatureWarning, setTemperatureWarning] = useState("");
  const [humidityWarning, setHumidityWarning] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    if (isNaN(Number(temperature)) || isNaN(Number(humidity))) {
      alert("Por favor, insira valores numéricos válidos.");
      return;
    }

    const time = new Date().toLocaleTimeString();
    setData([...data, { time, temperature, humidity }]);
    setTemperature("");
    setHumidity("");
  };

  const handleTemperatureChange = (value: string) => {
    setTemperature(value);
    const tempNumber = parseFloat(value);
    if (tempNumber > 26) {
      setTemperatureWarning("Temperatura muito alta");
    } else if (tempNumber < 16) {
      setTemperatureWarning("Temperatura muito baixa");
    } else {
      setTemperatureWarning("");
    }
  };
  const handleHumidityChange = (value: string) => {
    setHumidity(value);
    const humidityNumber = parseFloat(value);
    if (humidityNumber > 85) {
      setHumidityWarning("Umidade muito alta");
    } else if (humidityNumber < 60) {
      setHumidityWarning("Umidade muito baixa");
    } else {
      setHumidityWarning("");
    }
  };

  const handleClear = () => {
    setData([]); // Limpa os dados do local storage
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Checklist de Temperatura e Umidade</h2>
      <label htmlFor="temperature">Temperatura (°C) :</label>
      <input
        id="temperature"
        type="number"
        value={temperature}
        onInput={(e) => {
          setTemperature(e.currentTarget.value);
          const tempNumber = parseFloat(e.currentTarget.value);
          if (tempNumber > 26) {
            setTemperatureWarning("Temperatura muito alta");
          } else if (tempNumber < 16) {
            setTemperatureWarning("Temperatura muito baixa");
          } else {
            setTemperatureWarning("");
          }
        }}
      />
      {temperatureWarning && <WarningLabel>{temperatureWarning}</WarningLabel>}
      <label htmlFor="humidity">Umidade (%):</label>
      <input
        id="humidity"
        type="number"
        value={humidity}
        // onChange={(e) => setHumidity(e.target.value)}
        onChange={(e) => {
          setHumidity(e.target.value);
          const humiNumber = parseFloat(e.currentTarget.value);
          if (humiNumber > 85) {
            setHumidityWarning("Humidade muito alta");
          } else if (humiNumber < 66) {
            setHumidityWarning("humidade muito baixa");
          } else {
            setHumidityWarning("");
          }
        }}
        min="0"
        max="100"
      />
      {humidityWarning && <WarningLabel>{humidityWarning}</WarningLabel>}

      <button type="submit">Salvar</button>
      <Button onClick={handleClear}>Limpar</Button>

      <TemperatureHumidityChart dataPoints={data} />
    </FormContainer>
  );
};

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #ff4837;
  }
`;

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
    width: 100%;
    max-width: 300px;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const WarningLabel = styled.p`
  color: red;
  font-size: 0.8rem;
`;

export default ChecklistForm;
