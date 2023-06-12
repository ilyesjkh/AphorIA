import React, { useEffect } from 'react';

function PdfAddImage({ pdfDoc, selectedImage }) {
  useEffect(() => {
    const addImageToPdf = async () => {
      if (selectedImage && pdfDoc) {
        const imageBytes = await fetch(selectedImage).then((response) => response.arrayBuffer());
        const image = await pdfDoc.embedPng(imageBytes);

        const pages = pdfDoc.getPages();
        const page = pages[0]; // Assuming you want to add the image to the first page
        const { width, height } = page.getSize();

        page.drawImage(image, {
          x: 0, // Adjust the image position as needed
          y: 0,
          width,
          height,
        });
      }

      // Save the modified PDF and update the PDF URL
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Use the generated PDF URL as needed
      console.log('Modified PDF URL:', pdfUrl);
    };

    addImageToPdf();
  }, [pdfDoc, selectedImage]);

  return <div>Adding Image to PDF...</div>;
}

export default PdfAddImage;
