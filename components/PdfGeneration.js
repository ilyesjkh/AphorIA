import React, { useEffect, useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default function PdfGeneration({ generatedText, selectedImage }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const generatePdf = async () => {
      const pdfDoc = await PDFDocument.create();
      const pageWidth = 600; // Adjust the page width as needed
      const pageHeight = 800; // Adjust the page height as needed
      const margin = 50; // Adjust the page margins as needed
      const fontSize = 12;

      const timesNewRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      const lines = splitTextIntoLines(generatedText, timesNewRomanFont, fontSize, pageWidth - 2 * margin);

      let currentPage = pdfDoc.addPage();
      let currentY = pageHeight - margin;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const wrappedTextHeight = timesNewRomanFont.heightAtSize(fontSize);

        if (currentY - wrappedTextHeight < margin) {
          // Create a new page if the current page is full
          currentPage = pdfDoc.addPage();
          currentY = pageHeight - margin;
        }

        currentPage.drawText(line, {
          x: margin,
          y: currentY - wrappedTextHeight / 2,
          size: fontSize,
          font: timesNewRomanFont,
          color: rgb(0, 0, 0), // Set the desired text color
        });

        currentY -= wrappedTextHeight;
      }

      // Image Embedding Logic Here
      if (selectedImage) {
        const imageResponse = await fetch(selectedImage);
        const imageData = await imageResponse.blob();

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result.split(',')[1];

          // Embed the base64 image data as PNG
          const embeddedImage = await pdfDoc.embedPng(base64data);
          const imageDims = embeddedImage.scale(0.5);

          const imagePage = pdfDoc.addPage();
          imagePage.drawImage(embeddedImage, {
            x: margin,
            y: currentY - imageDims.height - margin,
            width: imageDims.width,
            height: imageDims.height,
          });

          const pdfBytes = await pdfDoc.save();
          const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setPdfUrl(pdfUrl);
        };

        reader.readAsDataURL(imageData);
      } else {
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      }
    };

    generatePdf();
  }, [generatedText, selectedImage]);

  function splitTextIntoLines(text, font, fontSize, maxWidth) {
    const lines = [];
    const paragraphs = text ? text.split('\n') : [];

    for (let paragraph of paragraphs) {
      const words = paragraph.split(' ');
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const currentLineWidth = font.widthOfTextAtSize(currentLine, fontSize);
        const wordWidth = font.widthOfTextAtSize(` ${word}`, fontSize);

        if (currentLineWidth + wordWidth <= maxWidth) {
          currentLine += ` ${word}`;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }

      lines.push(currentLine);
    }

    return lines;
  }

  return (
    <div>
      {pdfUrl ? (
        <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
      ) : (
        <div>Generating PDF...</div>
      )}
    </div>
  );
}
