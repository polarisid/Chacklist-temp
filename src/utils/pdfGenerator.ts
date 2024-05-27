// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { DataPoint } from "../components/ChecklistForm";

// export const generatePDF = (data: DataPoint[], setor: string) => {
//   const doc = new jsPDF();
//   doc.text("Relatório de Temperatura e Umidade", 20, 10);
//   doc.text(`Setor: ${setor}`, 20, 20); // Adiciona o nome do setor

//   const tableColumn = ["Hora", "Temperatura", "Umidade"];
//   const tableRows: any[] = [];

//   data.forEach((item) => {
//     const rowData = [item.time, item.temperature, item.humidity];
//     tableRows.push(rowData);
//   });

//   (doc as any).autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 30, // Aumenta a posição Y para evitar sobreposição com o título
//   });

//   doc.save(`relatorio_${setor}_${new Date().toLocaleDateString()}.pdf`); // Adiciona o nome do setor ao nome do arquivo
// };

// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { DataPoint } from "../components/ChecklistForm";

// export const generatePDF = (data: DataPoint[], setor: string) => {
//   const doc = new jsPDF();

//   // Adiciona o título do relatório
//   doc.text("Relatório de Temperatura e Umidade", 20, 10);

//   // Adiciona o nome do setor
//   doc.text(`Setor: ${setor}`, 20, 20);

//   // Verifica se há dados para adicionar à tabela
//   if (data.length > 0) {
//     const tableColumn = ["Hora", "Temperatura", "Umidade"];
//     const tableRows = data.map((item) => [
//       item.time,
//       item.temperature,
//       item.humidity,
//     ]);

//     (doc as any).autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30, // Aumenta a posição Y para evitar sobreposição com o título
//     });
//   } else {
//     // Adiciona uma mensagem indicando que não há dados
//     doc.text("Não há dados disponíveis.", 20, 30);
//   }

//   // Salva o arquivo PDF
//   doc.save(`relatorio_${setor}_${new Date().toLocaleDateString()}.pdf`);
// };

import jsPDF from "jspdf";
import "jspdf-autotable";
import { DataPoint } from "../components/ChecklistForm";

export const generatePDF = (data: DataPoint[], setor: string) => {
  const doc = new jsPDF();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  // Adiciona o título do relatório
  doc.text(
    "Relatório de Temperatura e Umidade " + today.toLocaleDateString(),
    20,
    10
  );

  // Adiciona o nome do setor
  doc.text(`Setor: ${setor}`, 20, 20);

  // Verifica se há dados para adicionar à tabela
  if (data.length > 0) {
    const tableColumn = ["Hora", "Temperatura", "Umidade"];
    const tableRows = data.map((item) => [
      item.time,
      item.temperature,
      item.humidity,
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Aumenta a posição Y para evitar sobreposição com o título
      didParseCell: (data: any) => {
        const column = data.column.index;
        const value = data.cell.raw;
        let isOutOfRange = false;

        if (column === 1) {
          // Verifica a temperatura
          const temperature = parseFloat(value);
          if (temperature < 16 || temperature > 26) {
            isOutOfRange = true;
          }
        } else if (column === 2) {
          // Verifica a umidade
          const humidity = parseFloat(value);
          if (humidity < 60 || humidity > 85) {
            isOutOfRange = true;
          }
        }

        if (isOutOfRange) {
          data.cell.styles.textColor = [255, 0, 0]; // Define a cor do texto como vermelho
        }
      },
    });
  } else {
    // Adiciona uma mensagem indicando que não há dados
    doc.text("Não há dados disponíveis.", 20, 30);
  }

  // Salva o arquivo PDF
  doc.save(`relatorio_${setor}_${new Date().toLocaleDateString()}.pdf`);
};
