const PDFDocument = require("pdfkit");
const fs = require("fs");
const { getDBConnector } = require("./dbConnector"); // Importa la funzione

// Funzione per generare un report PDF con i dati del database
const generateReport = async (filename = "report.pdf") => {
  try {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filename);
    doc.pipe(stream);

    // Aggiungiamo un titolo al report
    doc.fontSize(20).text("Report MyDataExplored", { align: "center" });
    doc.moveDown(); // Aggiungi spazio dopo il titolo

    // Otteniamo i dati dal database
    const db = await getDBConnector();
    let data;
    if (db instanceof Pool) {
      // Query per database SQL (esempio con PostgreSQL)
      data = await db.query("SELECT * FROM data");
      data = data.rows;
    } else {
      // Query per MongoDB (esempio)
      data = await db.collection("data").find().toArray();
    }

    // Aggiungiamo i dati al report in una tabella
    const tableHeaders = ["ID", "Categoria", "Valore", "Timestamp"];
    const tableData = data.map((item) => [
      item.id || item._id, // Gestisci ID da SQL o MongoDB
      item.category,
      item.value,
      item.timestamp,
    ]);

    doc.table(
      {
        headers: tableHeaders,
        rows: tableData,
      },
      {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
        prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
      }
    );

    doc.end();

    console.log(`Report generato con successo: ${filename}`);
    return filename; // Restituisci il nome del file
  } catch (error) {
    console.error("Errore nella generazione del report:", error);
    throw error; // Rilancia l'errore per la gestione esterna
  }
};

module.exports = { generateReport };