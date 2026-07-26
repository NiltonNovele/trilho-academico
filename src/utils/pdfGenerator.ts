import jsPDF from "jspdf";

interface VisaInfoForPDF {
    type: string;
    countryName?: string;
    description?: string;
    requirements?: string[];
    validity?: string;
    steps?: string[];
    contact?: {
        address?: string;
        phone?: string;
        email?: string;
    };
}

export const generateVisaPDF = (visaInfo: VisaInfoForPDF) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Colors
    const primaryColor = [30, 119, 170]; // #1E77AA
    const headerBg = [240, 248, 255]; // Azul claro
    const textColor = [50, 50, 50]; // Cinza escuro

    // Função para adicionar linha e verificar quebra de página
    const addLine = (height: number) => {
        yPosition += height;
        if (yPosition > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
        }
    };

    // Título Principal
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, "bold");
    doc.text("Documentação Legal de Visto", margin, 20);
    doc.text("", margin, 28);

    yPosition = 50;

    // Cabeçalho do país e tipo de visto
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    if (visaInfo.countryName) {
        doc.text(visaInfo.countryName, margin, yPosition);
        yPosition += 8;
    }

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(visaInfo.type.replace(/([A-Z])/g, " $1").trim(), margin, yPosition);
    addLine(12);

    // Linha separadora
    doc.setDrawColor(...primaryColor);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    addLine(8);

    // Descrição
    if (visaInfo.description) {
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Descrição", margin, yPosition);
        addLine(6);

        doc.setTextColor(...textColor);
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
        const descriptionLines = doc.splitTextToSize(visaInfo.description, contentWidth);
        doc.text(descriptionLines, margin, yPosition);
        addLine(descriptionLines.length * 5 + 5);
    }

    // Validade
    if (visaInfo.validity) {
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Validade", margin, yPosition);
        addLine(6);

        doc.setTextColor(...textColor);
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
        doc.text(visaInfo.validity, margin + 5, yPosition);
        addLine(10);
    }

    // Requisitos
    if (visaInfo.requirements && visaInfo.requirements.length > 0) {
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Requisitos", margin, yPosition);
        addLine(8);

        doc.setTextColor(...textColor);
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");

        visaInfo.requirements.forEach((req, index) => {
            const reqLines = doc.splitTextToSize(`${index + 1}. ${req}`, contentWidth - 5);
            doc.text(reqLines, margin + 5, yPosition);
            addLine(reqLines.length * 5 + 2);
        });

        addLine(5);
    }

    // Processo Passo-a-Passo
    if (visaInfo.steps && visaInfo.steps.length > 0) {
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Processo Passo-a-Passo", margin, yPosition);
        addLine(8);

        doc.setTextColor(...textColor);
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");

        visaInfo.steps.forEach((step, index) => {
            const stepLines = doc.splitTextToSize(`${index + 1}. ${step}`, contentWidth - 5);
            doc.text(stepLines, margin + 5, yPosition);
            addLine(stepLines.length * 5 + 2);
        });

        addLine(5);
    }

    // Contactos
    if (visaInfo.contact) {
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Contactos", margin, yPosition);
        addLine(8);

        doc.setTextColor(...textColor);
        doc.setFontSize(11);
        doc.setFont(undefined, "normal");

        if (visaInfo.contact.address) {
            const addressLines = doc.splitTextToSize(
                `📍 Endereço: ${visaInfo.contact.address}`,
                contentWidth - 5
            );
            doc.text(addressLines, margin + 5, yPosition);
            addLine(addressLines.length * 5 + 2);
        }

        if (visaInfo.contact.phone) {
            doc.text(`📞 Telefone: ${visaInfo.contact.phone}`, margin + 5, yPosition);
            addLine(7);
        }

        if (visaInfo.contact.email) {
            const emailLines = doc.splitTextToSize(
                `📧 Email: ${visaInfo.contact.email}`,
                contentWidth - 5
            );
            doc.text(emailLines, margin + 5, yPosition);
            addLine(emailLines.length * 5 + 2);
        }
    }

    // Rodapé
    const footerY = pageHeight - 10;
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.text(
        `Gerado em ${new Date().toLocaleDateString("pt-PT")} - Trilho Académico`,
        margin,
        footerY
    );

    // Download
    const fileName = `${visaInfo.countryName || "Visto"}_${visaInfo.type
        .replace(/([A-Z])/g, "_$1")
        .toLowerCase()}.pdf`;
    doc.save(fileName);
};
