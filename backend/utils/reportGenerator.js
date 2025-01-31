const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateReport = (data) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("report.pdf"));
    doc.fontSize(20).text("Report Settimanale", { align: "center" });
    doc.fontSize(14).text(`Dati principali: ${JSON.stringify(data)}`, { align: "left" });
    doc.end();
};

module.exports = { generateReport };