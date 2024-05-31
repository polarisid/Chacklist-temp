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
import * as React from "react";

import { useState, useEffect } from "react";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";
import TemperatureHumidityChart from "./TemperatureHumidityChart";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ErrorModal from "./ErrorModal";
import Modal from "react-modal";

export interface DataPoint {
  time: string;
  temperature: string;
  humidity: string;
}
Modal.setAppElement("#root");

const ChecklistForm: React.FC = () => {
  const [data, setData] = useLocalStorage<DataPoint[]>("data", []);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [time, setTime] = useState("");
  const [temperatureWarning, setTemperatureWarning] = useState("");
  const [humidityWarning, setHumidityWarning] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    if (isNaN(Number(temperature)) || isNaN(Number(humidity))) {
      alert("Por favor, insira valores numéricos válidos.");
      return;
    } else if (temperature == "" || humidity == "") {
      // alert("Por favor, insira valores numéricos válidos.");
      setErrorMessage("O campo não pode estar vazio.");
      setIsModalOpen(true);
      // return;
    } else if (time == "") {
      // alert("Por favor, insira um horario.");
      setErrorMessage("Por favor, insira um horario.");
      setIsModalOpen(true);
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
      <ErrorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={errorMessage}
      />
      <h2>Registre abaixo a Temperatura e Umidade</h2>

      <div className="TempHum-box">
        <InputArea>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          />
          <TextField
            required
            helperText="Faixa aceitavel 18-28°C"
            size="small"
            label="Temperatura(°C)"
            variant="outlined"
            id="temperature"
            type="number"
            value={temperature}
            onChange={(e: any) => {
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
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </InputArea>

        <InputArea>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          />
          <TextField
            required
            helperText="Faixa aceitavel 41-60%"
            size="small"
            id="humidity"
            label="Umidade(%)"
            variant="outlined"
            type="number"
            value={humidity}
            onChange={(e) => {
              setHumidity(e.target.value);
              const humiNumber = parseFloat(e.currentTarget.value);
              if (humiNumber > 60) {
                setHumidityWarning("Umidade muito alta");
              } else if (humiNumber < 41) {
                setHumidityWarning("Umidade muito baixa");
              } else {
                setHumidityWarning("");
              }
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </InputArea>
      </div>
      <div className="Warning-box">
        {temperatureWarning && (
          <WarningLabel>{temperatureWarning}</WarningLabel>
        )}
        {humidityWarning && <WarningLabel>{humidityWarning}</WarningLabel>}
      </div>

      <TimeContainer>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        />
        <TextField
          required
          size="small"
          id="time"
          label="Hora da medição"
          variant="outlined"
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ClockIcon onClick={fillCurrentTime}>🕒</ClockIcon>
              </InputAdornment>
            ),
          }}
        />
        {/* <ClockIcon onClick={fillCurrentTime}>🕒</ClockIcon> */}
        <ButtonS variant="contained" type="submit" color="success">
          Salvar
        </ButtonS>
      </TimeContainer>
      {/* <button>Salvar</button> */}

      {/* <Button onClick={handleClear}>Limpar</Button> */}

      <TemperatureHumidityChart dataPoints={data} />
      <ButtonS
        onClick={handleClear}
        variant="outlined"
        color="error"
        startIcon={<DeleteForeverIcon />}
      >
        Limpar
      </ButtonS>
    </FormContainer>
  );
};

const ButtonS = styled(Button)`
  padding: 10px 20px;
  font-size: 1rem;
  height: 30px;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #ff4837;
  }
`;

const InputArea = styled.div`
  margin: 5px;
`;

const FormContainer = styled.form`
  .TempHum-box {
    display: flex;
    flex-direction: row;

    input {
      height: 30px;
      width: auto;
      /* margin: 5px; */
    }
    Box {
      margin: 5px;
    }
    TextField {
      margin: 5px;
    }

    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  /* label {
    font-size: 1.2rem;
  } */
  input {
    padding: 5px;
    font-size: 1rem;
    width: 100%;
    max-width: 200px;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }

  .Warning-box {
    display: flex;
  }
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  button {
    margin: 10px;
  }
  input {
    /* flex: 1; */
    width: 90px;
    height: 30px;
    /* padding: 5px; */
    padding-right: 30px;
  }
`;

const ClockIcon = styled.button`
  background: none;
  border: none;
  /* font-size: 1rem; */
  /* cursor: pointer; */
  margin-left: 10px;
`;

const WarningLabel = styled.p`
  color: red;
  font-size: 0.8rem;
  padding: 5px;
`;

export default ChecklistForm;
