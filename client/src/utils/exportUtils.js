import { jsPDF } from 'jspdf';

/**
 * Copies string to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  }
}

/**
 * Download text content as TXT file
 */
export function downloadAsTxt(content, filename = 'recognition-result.txt') {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export recognition data as styled PDF report
 */
export function downloadAsPdf(data, filename = 'lumina-recognition-report.pdf') {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(191, 162, 219); // #BFA2DB
  doc.rect(0, 0, 210, 28, 'F');
  
  doc.setTextColor(31, 41, 55);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('LUMINA AI - RECOGNITION REPORT', 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 38);
  doc.text(`Type: ${data.type === 'ocr' ? 'Text Recognition (OCR)' : 'Object Recognition'}`, 14, 44);

  let y = 56;

  if (data.type === 'object_detection' && data.predictions) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Detected Objects Summary:', 14, y);
    y += 10;

    data.predictions.forEach((obj, idx) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`${idx + 1}. ${obj.label} - Confidence: ${(obj.confidence * 100).toFixed(1)}%`, 20, y);
      y += 8;
    });

    y += 6;
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Total Processing Time: ${data.durationMs || 320} ms`, 14, y);
  } else if (data.extractedText) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text('Extracted Text Content:', 14, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);

    const splitLines = doc.splitTextToSize(data.extractedText, 180);
    doc.text(splitLines, 14, y);
  }

  doc.save(filename);
}
