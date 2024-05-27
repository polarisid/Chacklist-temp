import React, { useState, useEffect } from "react";
import TemperatureHumidityChart from "./components/TemperatureHumidityChart";
import { getStoredDataPoints, storeDataPoint } from "./utils/localStorage";
import styled from "styled-components";
// import Header from './components/Header';
// import Footer from './components/Footer';
import SectorForm from "./components/SectorForm";
import ChecklistForm, { DataPoint } from "./components/ChecklistForm";
import useNotification from "./hooks/useNotification";
import { generatePDF } from "./utils/pdfGenerator";
import useLocalStorage from "./hooks/useLocalStorage";

const App: React.FC = () => {
  let [data] = useLocalStorage<DataPoint[]>("data", []);
  const [sector] = useLocalStorage<string>("sector", "");

  useNotification(() => {
    alert("Hora de registrar a temperatura e umidade!");
  }, 3600000); // 1 hora em milissegundos

  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  // const [dataPoints, setDataPoints] = useState<
  //   { time: string; temperature: number; humidity: number }[]
  // >([]);

  useEffect(() => {
    const storedData = getStoredDataPoints();
    setDataPoints(storedData);
  }, [data]);

  // const handleNewDataPoint = (temperature: number, humidity: number) => {
  //   const newPoint = {
  //     time: new Date().toLocaleTimeString(),
  //     temperature,
  //     humidity,
  //   };
  //   const updatedDataPoints = [...dataPoints, newPoint];
  //   setDataPoints(updatedDataPoints);
  //   storeDataPoint(newPoint);
  // };

  return (
    <AppContainer>
      <MainContainer>
        <Header>
          <h1>Controle de Temperatura e Umidade</h1>
        </Header>
        <MainContent>
          <SectorForm />
          <ChecklistForm />
          <Button onClick={() => generatePDF(data, sector)}>Gerar PDF</Button>
        </MainContent>
        <Footer>
          <p>2024 - Desenvolvido por Daniel Carvalho</p>
          <p>Versão 1.1.3</p>
        </Footer>
      </MainContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #007bff;
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: white;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: #0056b3;
  }
  margin: 20px;
`;

const Footer = styled.footer`
  background-color: #007bff;
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: white;
`;

export default App;
// export default App;

// // import styled from "styled-components";
// // import TemperatureHumidityChart from "./components/TemperatureHumidityChart";
// // import { getStoredDataPoints, storeDataPoint } from "./utils/localStorage";

// // const App: React.FC = () => {
// //   const [dataPoints, setDataPoints] = useState<
// //     { time: string; temperature: number; humidity: number }[]
// //   >([]);

// //   useEffect(() => {
// //     const storedData = getStoredDataPoints();
// //     setDataPoints(storedData);
// //   }, []);

// //   const handleNewDataPoint = (temperature: number, humidity: number) => {
// //     const newPoint = {
// //       time: new Date().toLocaleTimeString(),
// //       temperature,
// //       humidity,
// //     };
// //     const updatedDataPoints = [...dataPoints, newPoint];
// //     setDataPoints(updatedDataPoints);
// //     storeDataPoint(newPoint);
// //   };

// //   return (
// //     <MainContainer>
// //       <Header>
// //         <h1>Controle de Temperatura e Umidade</h1>
// //       </Header>
// //       <Content>
// //         <TemperatureHumidityChart dataPoints={dataPoints} />
// //         <Button onClick={() => handleNewDataPoint(25, 60)}>
// //           Adicionar Medida (Exemplo)
// //         </Button>
// //       </Content>
// //       <Footer>
// //         <p>2024 - Desenvolvido por Daniel Carvalho</p>
// //         <p>Versão 1.1.3</p>
// //       </Footer>
// //     </MainContainer>
// //   );
// // };

// import React from "react";
// import styled from "styled-components";
// // import Header from './components/Header';
// // import Footer from './components/Footer';
// import SectorForm from "./components/SectorForm";
// import ChecklistForm, { DataPoint } from "./components/ChecklistForm";
// import useNotification from "./hooks/useNotification";
// import { generatePDF } from "./utils/pdfGenerator";
// import useLocalStorage from "./hooks/useLocalStorage";

// const App: React.FC = () => {
//   const [data] = useLocalStorage<DataPoint[]>("data", []);
//   const [sector] = useLocalStorage<string>("sector", "");

//   useNotification(() => {
//     alert("Hora de registrar a temperatura e umidade!");
//   }, 3600000); // 1 hora em milissegundos

//   return (
//     <AppContainer>
//       {/* <Header /> */}
//       <MainContent>
//         <SectorForm />
//         <ChecklistForm />
//         <Button onClick={() => generatePDF(data)}>Gerar PDF</Button>
//       </MainContent>
//       {/* <Footer /> */}
//     </AppContainer>
//   );
// };

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
// `;

// const MainContent = styled.main`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   font-size: 1rem;
//   cursor: pointer;
//   margin-top: 20px;
// `;

// export default App;
