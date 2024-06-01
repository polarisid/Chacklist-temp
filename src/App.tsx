import React, { useState, useEffect, useCallback } from "react";
import { getStoredDataPoints, storeDataPoint } from "./utils/localStorage";
import styled from "styled-components";
import SectorForm from "./components/SectorForm";
import ChecklistForm, { DataPoint } from "./components/ChecklistForm";
import useNotification from "./hooks/useNotification";
import { generatePDF } from "./utils/pdfGenerator";
import useLocalStorage from "./hooks/useLocalStorage";
import NotificationModal from "./components/NotificationModal";
import { Howl } from "howler";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const App: React.FC = () => {
  const [data, setData] = useLocalStorage<DataPoint[]>("data", []);
  const [sector] = useLocalStorage<string>("sector", "");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sound, setSound] = useState<Howl | null>(null);

  const openModal = useCallback(() => {
    // Criar o som quando o modal for aberto, após uma interação do usuário
    const notificationSound = new Howl({
      src: ["/notification-sound.mp3"],
      volume: 1.0,
      onloaderror: (id, error) => {
        console.error("Erro ao carregar o som:", error);
      },
      onplayerror: (id, error) => {
        console.error("Erro ao reproduzir o som:", error);
        notificationSound.once("unlock", () => {
          notificationSound.play();
        });
      },
    });
    setSound(notificationSound);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSound(null);
  };

  const playSound = () => {
    if (sound) {
      sound.play();
    }
  };

  useNotification(() => {
    // alert("Hora de registrar a temperatura e umidade!");
    openModal();
  }, 3600000); // 1 hora em milissegundos
  // }, 3600); // 1 hora em milissegundos1

  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const handleClear = () => {
    setData([]); // Limpa os dados do local storage
    window.location.reload();
  };

  useEffect(() => {
    const storedData = getStoredDataPoints();
    setDataPoints(storedData);
  }, [data]);

  return (
    <AppContainer>
      <NotificationModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        playSound={playSound}
      />

      <MainContainer>
        {/* <Header>
          <h1>Controle de Temperatura e Umidade</h1>
        </Header> */}
        <Header>
          <Title>Checklist de Controle de Temperatura e Umidade</Title>
        </Header>
        <MainContent>
          <SectorForm />
          <ChecklistForm />
          <ButtonContainer>
            <Button
              variant="contained"
              onClick={() => generatePDF(data, sector)}
              endIcon={<PictureAsPdfIcon />}
            >
              Gerar PDF
            </Button>
            <ButtonS
              onClick={handleClear}
              variant="outlined"
              color="error"
              startIcon={<DeleteForeverIcon />}
            >
              Limpar
            </ButtonS>
          </ButtonContainer>
        </MainContent>
        <Footer>
          <p>2024 - Desenvolvido por Daniel Carvalho</p>
          <p>Versão 1.2.2</p>
        </Footer>
      </MainContainer>
    </AppContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
`;

const ButtonS = styled(Button)`
  padding: 10px 20px;
  font-size: 1rem;
  height: 40px;
  cursor: pointer;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #ff4837;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  /* background-color: #007bff; */
  -webkit-box-shadow: 0px 9px 17px -7px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 9px 17px -7px rgba(0, 0, 0, 0.33);
  box-shadow: 0px 9px 17px -7px rgba(0, 0, 0, 0.33);

  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;

  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  color: white;
`;

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
  /* background-color: #f5f5f5; */

  background: #ece9e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ffffff,
    #ece9e6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ButtonA = styled.button`
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
  /* background-color: #007bff; */
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: white;

  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
`;

export default App;
