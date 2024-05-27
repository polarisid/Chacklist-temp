// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import useLocalStorage from "../hooks/useLocalStorage";
// import TemperatureHumidityChart from "./TemperatureHumidityChart";

// export interface DataPoint {
//   time: string;
//   temperature: string;
//   humidity: string;
// }

// const ChecklistForm: React.FC = () => {
//   const [data, setData] = useLocalStorage<DataPoint[]>("data", []);
//   const [temperature, setTemperature] = useState("");
//   const [humidity, setHumidity] = useState("");
//   const [temperatureWarning, setTemperatureWarning] = useState("");
//   const [humidityWarning, setHumidityWarning] = useState("");
//   const handleSubmit = (e: React.FormEvent) => {
//     // e.preventDefault();
//     if (isNaN(Number(temperature)) || isNaN(Number(humidity))) {
//       alert("Por favor, insira valores numéricos válidos.");
//       return;
//     }

//     const time = new Date().toLocaleTimeString();
//     setData([...data, { time, temperature, humidity }]);
//     setTemperature("");
//     setHumidity("");
//   };

//   const handleClear = () => {
//     setData([]); // Limpa os dados do local storage
//   };

//   return (
//     <FormContainer onSubmit={handleSubmit}>
//       <h2>Registre abaixo a Temperatura e Umidade</h2>
//       <label htmlFor="temperature">Temperatura (°C) :</label>
//       <input
//         id="temperature"
//         type="number"
//         value={temperature}
//         onInput={(e) => {
//           setTemperature(e.currentTarget.value);
//           const tempNumber = parseFloat(e.currentTarget.value);
//           if (tempNumber > 28) {
//             setTemperatureWarning("Temperatura muito alta");
//           } else if (tempNumber < 18) {
//             setTemperatureWarning("Temperatura muito baixa");
//           } else {
//             setTemperatureWarning("");
//           }
//         }}
//       />
//       {temperatureWarning && <WarningLabel>{temperatureWarning}</WarningLabel>}
//       <label htmlFor="humidity">Umidade (%):</label>
//       <input
//         id="humidity"
//         type="number"
//         value={humidity}
//         // onChange={(e) => setHumidity(e.target.value)}
//         onChange={(e) => {
//           setHumidity(e.target.value);
//           const humiNumber = parseFloat(e.currentTarget.value);
//           if (humiNumber > 41) {
//             setHumidityWarning("Humidade muito alta");
//           } else if (humiNumber < 60) {
//             setHumidityWarning("humidade muito baixa");
//           } else {
//             setHumidityWarning("");
//           }
//         }}
//         min="0"
//         max="100"
//       />
//       {humidityWarning && <WarningLabel>{humidityWarning}</WarningLabel>}

//       <button type="submit">Salvar</button>
//       <Button onClick={handleClear}>Limpar</Button>

//       <TemperatureHumidityChart dataPoints={data} />
//     </FormContainer>
//   );
// };

// const Button = styled.button`
//   padding: 10px 20px;
//   font-size: 1rem;
//   cursor: pointer;
//   background-color: #ff6347;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   &:hover {
//     background-color: #ff4837;
//   }
// `;

// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
//   margin-top: 20px;
//   label {
//     font-size: 1.2rem;
//   }
//   input {
//     padding: 5px;
//     font-size: 1rem;
//     width: 100%;
//     max-width: 300px;
//   }
//   button {
//     padding: 10px 20px;
//     font-size: 1rem;
//     cursor: pointer;
//   }
// `;

// const WarningLabel = styled.p`
//   color: red;
//   font-size: 0.8rem;
// `;

// export default ChecklistForm;

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
  const [time, setTime] = useState("");
  const [temperatureWarning, setTemperatureWarning] = useState("");
  const [humidityWarning, setHumidityWarning] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    if (isNaN(Number(temperature)) || isNaN(Number(humidity))) {
      alert("Por favor, insira valores numéricos válidos.");
      return;
    }

    setData([...data, { time, temperature, humidity }]);
    setTemperature("");
    setHumidity("");
    setTime("");
  };

  const handleClear = () => {
    setData([]); // Limpa os dados do local storage
  };

  const fillCurrentTime = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString("pt-BR", {
      hour12: false,
    });
    setTime(currentTime);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Registre abaixo a Temperatura e Umidade</h2>
      <label htmlFor="temperature">Temperatura (°C) :</label>
      <input
        id="temperature"
        type="number"
        value={temperature}
        onInput={(e) => {
          setTemperature(e.currentTarget.value);
          const tempNumber = parseFloat(e.currentTarget.value);
          if (tempNumber > 28) {
            setTemperatureWarning("Temperatura muito alta");
          } else if (tempNumber < 18) {
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
        onChange={(e) => {
          setHumidity(e.target.value);
          const humiNumber = parseFloat(e.currentTarget.value);
          if (humiNumber > 60) {
            setHumidityWarning("Humidade muito alta");
          } else if (humiNumber < 41) {
            setHumidityWarning("Humidade muito baixa");
          } else {
            setHumidityWarning("");
          }
        }}
        min="0"
        max="100"
      />
      {humidityWarning && <WarningLabel>{humidityWarning}</WarningLabel>}

      <label htmlFor="time">Hora da Medição:</label>
      <TimeContainer>
        <input
          id="time"
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <ClockIcon onClick={fillCurrentTime}>🕒</ClockIcon>
      </TimeContainer>

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

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  input {
    flex: 1;
  }
`;

const ClockIcon = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 10px;
`;

const WarningLabel = styled.p`
  color: red;
  font-size: 0.8rem;
`;

export default ChecklistForm;
