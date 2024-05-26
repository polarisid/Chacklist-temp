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

import jsPDF from "jspdf";
import "jspdf-autotable";
import { DataPoint } from "../components/ChecklistForm";

export const generatePDF = (data: DataPoint[], setor: string) => {
  const doc = new jsPDF();

  // Adiciona o título do relatório
  doc.text("Relatório de Temperatura e Umidade", 20, 10);

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
    });
  } else {
    // Adiciona uma mensagem indicando que não há dados
    doc.text("Não há dados disponíveis.", 20, 30);
  }

  // Salva o arquivo PDF
  doc.save(`relatorio_${setor}_${new Date().toLocaleDateString()}.pdf`);
};

// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { DataPoint } from "../components/ChecklistForm";

// export const generatePDF = (data: DataPoint[], setor: string) => {
//   const doc = new jsPDF();
//   doc.text("Relatório de Temperatura e Umidade", 20, 10);
//   doc.text(`Setor: ${setor}`, 20, 20);

//   const tableColumn = ["Hora", "Temperatura", "Umidade"];
//   const tableRows: any[] = [];

//   data.forEach((item) => {
//     const rowData = [item.time, item.temperature, item.humidity];
//     tableRows.push(rowData);
//   });

//   (doc as any).autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 20,
//   });

//   doc.save(`relatorio_${new Date().toLocaleDateString()}.pdf`);
// };
