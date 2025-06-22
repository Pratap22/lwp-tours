'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

export default function DownloadButton({ tour }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      let y = margin;

      // 1. Add Title
      pdf.setFontSize(22).setFont('helvetica', 'bold');
      pdf.text(tour.title, pdfWidth / 2, y, { align: 'center' });
      y += 8;
      pdf.setFontSize(12).setFont('helvetica', 'normal');
      pdf.text('Tour Itinerary & Details', pdfWidth / 2, y, { align: 'center' });
      y += 12;

      // Helper function to add elements as images, handling page breaks
      const addElementAsImage = async (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pdfWidth - margin * 2;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Check if the element fits on the current page, if not, add a new page
          if (y + imgHeight > pdfHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          
          pdf.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
          y += imgHeight + 7; // Add a 7mm gap after the section
        }
      };

      // 2. Add all sections sequentially
      await addElementAsImage('tour-hero');
      await addElementAsImage('tour-overview');
      await addElementAsImage('tour-itinerary');
      await addElementAsImage('tour-included');
      await addElementAsImage('tour-excluded');
      
      // 3. Add a footer to every page
      const pageCount = pdf.internal.getNumberOfPages();
      const downloadDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(9).setTextColor(128);
        const footerY = pdfHeight - 10;
        
        pdf.text(`Downloaded on: ${downloadDate}`, margin, footerY);
        pdf.text(`© ${new Date().getFullYear()} LWP Travel & Tours. All Rights Reserved.`, pdfWidth - margin, footerY, { align: 'right' });
      }

      // 4. Save the PDF
      const filename = `${tour.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? 'Generating PDF...' : 'Download Itinerary'}
    </button>
  );
} 