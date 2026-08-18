import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { EvaluatedParamResult, SampleEvaluationSummary, SampleMetadata, SampleItem } from '../types';

export function exportToExcel(
  summary: SampleEvaluationSummary,
  metadata?: SampleMetadata
) {
  const wb = XLSX.utils.book_new();

  // Summary info rows
  const metaRows = [
    ['INFORME DE EVALUACIÓN DE CALIDAD DE AGUA - AQUARADAR'],
    ['Norma de Referencia:', 'D.S. N° 004-2017-MINAM (Estándares de Calidad Ambiental para Agua)'],
    ['Fecha de Evaluación:', new Date(summary.evaluatedAt).toLocaleString('es-PE')],
    ['Categoría Evaluada:', `${summary.categoryId} - ${summary.categoryName}`],
    ['Subcategoría:', `${summary.subcategoryCode} - ${summary.subcategoryName}`],
    ['Muestra / Código:', metadata?.sampleCode || 'No especificado'],
    ['Punto de Muestreo:', metadata?.location || 'No especificado'],
    ['Cuenca / Cuerpo de Agua:', metadata?.waterBody || 'No especificado'],
    ['Responsable:', metadata?.samplerName || 'No especificado'],
    ['Condición General:', summary.overallStatus === 'GLOBAL_COMPLIANT' ? 'CUMPLE CON LA NORMA' : 'TRANSGREDE LA NORMA'],
    ['Tasa de Cumplimiento:', `${summary.compliancePercentage.toFixed(1)}% (${summary.compliantCount} de ${summary.totalEvaluated} parámetros)`],
    []
  ];

  // Parameter table rows
  const headers = [
    'Grupo',
    'Parámetro',
    'Valor Medido',
    'Unidad Ingreso',
    'Valor Convertido',
    'Unidad ECA',
    'Límite ECA (D.S. 004-2017)',
    'Pág. Anexo',
    'Estado',
    '% Límite',
    'Detalle Técnico y Notas'
  ];

  const dataRows = summary.results.map(r => [
    r.subgroup ? `${r.group} (${r.subgroup})` : r.group,
    r.parameterName,
    r.inputValue,
    r.inputUnit,
    r.convertedValue !== undefined ? r.convertedValue : r.inputValue,
    r.normativeUnit,
    r.normativeText,
    r.anexoPage ? `Pág. ${r.anexoPage}` : '-',
    r.status,
    r.percentageOfLimit ? `${r.percentageOfLimit.toFixed(1)}%` : '-',
    r.details + (r.footnote ? ` [Nota: ${r.footnote}]` : '')
  ]);

  const ws = XLSX.utils.aoa_to_sheet([...metaRows, headers, ...dataRows]);

  // Set column widths
  ws['!cols'] = [
    { wch: 18 },
    { wch: 32 },
    { wch: 14 },
    { wch: 14 },
    { wch: 16 },
    { wch: 14 },
    { wch: 26 },
    { wch: 12 },
    { wch: 15 },
    { wch: 12 },
    { wch: 50 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Resultados ECA');
  
  const fileName = `AquaRadar_ECA_${metadata?.sampleCode || 'Evaluacion'}_${new Date().toISOString().slice(0,10)}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

export function exportMultiSampleExcel(samples: SampleItem[]) {
  const wb = XLSX.utils.book_new();

  // 1. Overview Consolidated Sheet
  const summaryHeaders = [
    '#',
    'Nombre Muestra',
    'Código Muestra',
    'Cuerpo de Agua / Ubicación',
    'Categoría ECA',
    'Subcategoría',
    'Parámetros Evaluados',
    'Conformes',
    'Transgresiones',
    'Tasa Cumplimiento (%)',
    'Estado Global'
  ];

  const summaryRows = samples.map((s, idx) => [
    idx + 1,
    s.name,
    s.metadata.sampleCode || `Muestra ${idx + 1}`,
    `${s.metadata.waterBody || ''} ${s.metadata.location ? `(${s.metadata.location})` : ''}`.trim() || 'No especificado',
    s.categoryId,
    s.subcategoryId,
    s.summary?.totalEvaluated || 0,
    s.summary?.compliantCount || 0,
    s.summary?.transgresionCount || 0,
    s.summary ? `${s.summary.compliancePercentage.toFixed(1)}%` : 'No evaluada',
    s.summary?.overallStatus === 'GLOBAL_COMPLIANT' ? 'CONFORME' : s.summary ? 'TRANSGREDE' : 'PENDIENTE'
  ]);

  const overviewMeta = [
    ['INFORME CONSOLIDADO DE MUESTRAS AMBIENTALES - AQUARADAR PERÚ'],
    ['Normativa:', 'D.S. N° 004-2017-MINAM (Estándares de Calidad Ambiental para Agua)'],
    ['Fecha de Generación:', new Date().toLocaleString('es-PE')],
    ['Total de Muestras:', samples.length],
    []
  ];

  const wsOverview = XLSX.utils.aoa_to_sheet([...overviewMeta, summaryHeaders, ...summaryRows]);
  wsOverview['!cols'] = [
    { wch: 5 },
    { wch: 25 },
    { wch: 18 },
    { wch: 30 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
    { wch: 12 },
    { wch: 14 },
    { wch: 20 },
    { wch: 16 }
  ];
  XLSX.utils.book_append_sheet(wb, wsOverview, 'Resumen General');

  // 2. Individual sheets for each evaluated sample
  samples.forEach((sample, idx) => {
    if (!sample.summary) return;

    const s = sample.summary;
    const metaRows = [
      [`INFORME DETALLADO - ${sample.name.toUpperCase()}`],
      ['Código:', sample.metadata.sampleCode || `M-${idx + 1}`],
      ['Cuerpo de Agua:', sample.metadata.waterBody || '-'],
      ['Punto / Ubicación:', sample.metadata.location || '-'],
      ['Subcategoría ECA:', `${s.subcategoryCode} - ${s.subcategoryName}`],
      ['Estado Global:', s.overallStatus === 'GLOBAL_COMPLIANT' ? 'CONFORME CON EL ECA' : 'TRANSGREDE EL ECA'],
      ['Cumplimiento:', `${s.compliancePercentage.toFixed(1)}%`],
      []
    ];

    const paramHeaders = [
      'Grupo',
      'Parámetro',
      'Valor Medido',
      'Unidad',
      'Límite ECA',
      'Condición',
      '% Límite',
      'Detalle'
    ];

    const dataRows = s.results.map(r => [
      r.subgroup ? `${r.group} (${r.subgroup})` : r.group,
      r.parameterName,
      r.inputValue,
      r.inputUnit,
      r.normativeText,
      r.status,
      r.percentageOfLimit ? `${r.percentageOfLimit.toFixed(1)}%` : '-',
      r.details
    ]);

    const wsSample = XLSX.utils.aoa_to_sheet([...metaRows, paramHeaders, ...dataRows]);
    wsSample['!cols'] = [
      { wch: 16 },
      { wch: 30 },
      { wch: 14 },
      { wch: 12 },
      { wch: 26 },
      { wch: 14 },
      { wch: 12 },
      { wch: 45 }
    ];

    const sheetName = `M${idx + 1}_${sample.name.substring(0, 18).replace(/[\/\\?*:[\]]/g, '')}`;
    XLSX.utils.book_append_sheet(wb, wsSample, sheetName.substring(0, 31));
  });

  const fileName = `AquaRadar_Consolidado_${samples.length}_Muestras_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

export function exportToPDF(
  summary: SampleEvaluationSummary,
  metadata?: SampleMetadata,
  aiAnalysis?: string
) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(15, 76, 129); // Ocean Deep Navy
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('AquaRadar - Reporte Técnico de Cumplimiento ECA Agua', 14, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Evaluación oficial según Decreto Supremo N° 004-2017-MINAM (Perú)', 14, 18);
  doc.text(`Fecha: ${new Date(summary.evaluatedAt).toLocaleDateString('es-PE')} ${new Date(summary.evaluatedAt).toLocaleTimeString('es-PE')}`, 14, 23);

  // Metadata Card
  doc.setFillColor(245, 248, 252);
  doc.setDrawColor(218, 228, 240);
  doc.roundedRect(14, 32, pageWidth - 28, 30, 2, 2, 'FD');

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMACIÓN DE LA MUESTRA Y CATEGORIZACIÓN:', 18, 38);

  doc.setFont('helvetica', 'normal');
  doc.text(`Código/Muestra: ${metadata?.sampleCode || 'Muestra 01'}`, 18, 44);
  doc.text(`Ubicación/Punto: ${metadata?.location || 'No especificado'}`, 18, 49);
  doc.text(`Cuerpo de Agua: ${metadata?.waterBody || 'No especificado'}`, 18, 54);
  doc.text(`Responsable: ${metadata?.samplerName || 'Técnico Ambiental'}`, 18, 59);

  const col2X = 110;
  doc.text(`Categoría: ${summary.categoryId} (${summary.categoryName.substring(0, 32)}...)`, col2X, 44);
  doc.text(`Subcategoría: ${summary.subcategoryCode} - ${summary.subcategoryName.substring(0, 30)}`, col2X, 49);
  
  // Status Badge in card
  const isPass = summary.overallStatus === 'GLOBAL_COMPLIANT';
  doc.setFont('helvetica', 'bold');
  if (isPass) {
    doc.setTextColor(22, 101, 52);
    doc.text(`ESTADO: CONFORME (${summary.compliancePercentage.toFixed(0)}% Cumplimiento)`, col2X, 56);
  } else {
    doc.setTextColor(153, 27, 27);
    doc.text(`ESTADO: NO CONFORME (${summary.transgresionCount} Transgresión/es)`, col2X, 56);
  }

  // Summary Metrics Bar
  let currentY = 66;

  // Table of Parameters
  const tableData = summary.results.map((r: EvaluatedParamResult) => {
    return [
      r.parameterName,
      `${r.inputValue} ${r.inputUnit}`,
      r.normativeText,
      `Pág. ${r.anexoPage || '-'}`,
      r.status,
      r.percentageOfLimit ? `${r.percentageOfLimit.toFixed(1)}%` : '-'
    ];
  });

  autoTable(doc, {
    startY: currentY,
    head: [['Parámetro', 'Valor Medido', 'Límite ECA (D.S. 004-2017)', 'Pág.', 'Condición', '% Límite']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [15, 76, 129],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 55 },
      1: { cellWidth: 30 },
      2: { cellWidth: 45 },
      3: { cellWidth: 15 },
      4: { cellWidth: 25, fontStyle: 'bold' },
      5: { cellWidth: 18 }
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 4) {
        const val = data.cell.raw;
        if (val === 'CUMPLE') {
          data.cell.styles.textColor = [22, 101, 52];
        } else if (val === 'TRANSGREDE') {
          data.cell.styles.textColor = [185, 28, 28];
        } else {
          data.cell.styles.textColor = [100, 116, 139];
        }
      }
    }
  });

  // Technical and Legal AI Report Pages if available
  if (aiAnalysis) {
    doc.addPage();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Section Header
    doc.setFillColor(15, 76, 129);
    doc.rect(0, 0, pageWidth, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Dictamen Técnico y Fundamentación Normativa', 14, 11);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Marco Legal: Ley N° 28611, Ley N° 29338, D.S. N° 004-2017-MINAM, D.S. N° 001-2010-AG y R.J. N° 010-2016-ANA', 14, 17);

    let textY = 30;
    const lines = aiAnalysis.split('\n');

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        textY += 3;
        continue;
      }

      if (textY > pageHeight - 20) {
        doc.addPage();
        doc.setFillColor(15, 76, 129);
        doc.rect(0, 0, pageWidth, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Dictamen Técnico y Fundamentación Normativa (Cont.)', 14, 10);
        textY = 24;
      }

      if (line.startsWith('## ')) {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 76, 129);
        doc.text(line.replace('## ', ''), 14, textY);
        textY += 6;
      } else if (line.startsWith('### ')) {
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59);
        doc.text(line.replace('### ', ''), 14, textY);
        textY += 5;
      } else if (line.startsWith('#### ')) {
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(51, 65, 85);
        doc.text(line.replace('#### ', ''), 14, textY);
        textY += 4.5;
      } else if (line.startsWith('---')) {
        doc.setDrawColor(226, 232, 240);
        doc.line(14, textY, pageWidth - 14, textY);
        textY += 4;
      } else {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        const cleanText = line.replace(/\*\*/g, '').replace(/`/g, '');
        const split = doc.splitTextToSize(cleanText, pageWidth - 28);
        
        if (textY + split.length * 3.8 > pageHeight - 15) {
          doc.addPage();
          doc.setFillColor(15, 76, 129);
          doc.rect(0, 0, pageWidth, 15, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('Dictamen Técnico y Fundamentación Normativa (Cont.)', 14, 10);
          textY = 24;
        }

        doc.text(split, 14, textY);
        textY += split.length * 3.8 + 1.5;
      }
    }
  }

  // Legal footer disclaimer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text('AquaRadar - Generado conforme al D.S. N° 004-2017-MINAM, Ley N° 28611 y Protocolo R.J. N° 010-2016-ANA.', 14, 288);
    doc.text(`Página ${i} de ${totalPages}`, pageWidth - 28, 288);
  }

  const fileName = `AquaRadar_Reporte_${metadata?.sampleCode || 'ECA'}_${new Date().toISOString().slice(0,10)}.pdf`;
  doc.save(fileName);
}

export function exportMultiSamplePDF(samples: SampleItem[]) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  // Page 1: Consolidated Overview
  doc.setFillColor(15, 76, 129);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('AquaRadar - Informe Consolidado Multimuestra ECA Agua', 14, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Evaluación y Monitoreo según D.S. N° 004-2017-MINAM (Perú)', 14, 18);
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString('es-PE')} ${new Date().toLocaleTimeString('es-PE')}`, 14, 23);

  // Consolidated table
  const summaryHeaders = [['#', 'Muestra', 'Cuerpo / Punto', 'Categoría', 'Subcat.', 'Eval.', 'Conformes', 'Transg.', 'Cumplimiento', 'Estado']];
  const summaryBody = samples.map((s, idx) => [
    (idx + 1).toString(),
    s.name || `Muestra ${idx + 1}`,
    `${s.metadata.waterBody || '-'} ${s.metadata.location ? `(${s.metadata.location})` : ''}`.trim(),
    s.categoryId,
    s.subcategoryId,
    (s.summary?.totalEvaluated || 0).toString(),
    (s.summary?.compliantCount || 0).toString(),
    (s.summary?.transgresionCount || 0).toString(),
    s.summary ? `${s.summary.compliancePercentage.toFixed(0)}%` : '-',
    s.summary?.overallStatus === 'GLOBAL_COMPLIANT' ? 'CONFORME' : s.summary ? 'TRANSGREDE' : 'PENDIENTE'
  ]);

  autoTable(doc, {
    startY: 35,
    head: summaryHeaders,
    body: summaryBody,
    theme: 'striped',
    styles: { fontSize: 8, cellPadding: 2.5 },
    headStyles: { fillColor: [15, 76, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 9) {
        const val = data.cell.raw;
        if (val === 'CONFORME') data.cell.styles.textColor = [22, 101, 52];
        else if (val === 'TRANSGREDE') data.cell.styles.textColor = [185, 28, 28];
      }
    }
  });

  // Individual detailed pages for evaluated samples
  samples.forEach((sample, idx) => {
    if (!sample.summary) return;
    doc.addPage();

    doc.setFillColor(15, 76, 129);
    doc.rect(0, 0, pageWidth, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(`Detalle Muestra #${idx + 1}: ${sample.name}`, 14, 11);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Subcategoría: ${sample.summary.subcategoryCode} (${sample.summary.subcategoryName})`, 14, 17);

    const isPass = sample.summary.overallStatus === 'GLOBAL_COMPLIANT';
    const statusText = isPass ? 'CONFORME' : `NO CONFORME (${sample.summary.transgresionCount} transgresiones)`;

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(8.5);
    doc.text(`Punto: ${sample.metadata.location || '-'} | Cuenca: ${sample.metadata.waterBody || '-'} | Estado: ${statusText}`, 14, 28);

    const tableData = sample.summary.results.map(r => [
      r.parameterName,
      `${r.inputValue} ${r.inputUnit}`,
      r.normativeText,
      `Pág. ${r.anexoPage || '-'}`,
      r.status,
      r.percentageOfLimit ? `${r.percentageOfLimit.toFixed(1)}%` : '-'
    ]);

    autoTable(doc, {
      startY: 32,
      head: [['Parámetro', 'Valor Medido', 'Límite ECA (D.S. 004-2017)', 'Pág.', 'Condición', '% Límite']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 7.5, cellPadding: 2 },
      headStyles: { fillColor: [15, 76, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 4) {
          const val = data.cell.raw;
          if (val === 'CUMPLE') data.cell.styles.textColor = [22, 101, 52];
          else if (val === 'TRANSGREDE') data.cell.styles.textColor = [185, 28, 28];
        }
      }
    });
  });

  const fileName = `AquaRadar_Reporte_Consolidado_${samples.length}_Muestras_${new Date().toISOString().slice(0,10)}.pdf`;
  doc.save(fileName);
}

/**
 * Converts Markdown text into a fully styled Microsoft Word (.doc) document
 */
export function exportReportToWord(markdownContent: string, fileName = 'Informe_Tecnico_Calidad_Agua.doc') {
  // Convert Markdown to clean semantic HTML with Word styling
  const lines = markdownContent.split('\n');
  let htmlBody = '';
  let inTable = false;
  let tableRows: string[] = [];

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerCells = tableRows[0].split('|').slice(1, -1).map(c => c.trim());
      const hasDivider = tableRows.length > 1 && tableRows[1].includes('---');
      const bodyRows = (hasDivider ? tableRows.slice(2) : tableRows.slice(1)).map(r =>
        r.split('|').slice(1, -1).map(c => c.trim())
      );

      htmlBody += `<table style="width:100%; border-collapse:collapse; margin:14pt 0; font-size:10pt;">`;
      htmlBody += `<tr style="background-color:#0F4C81; color:#ffffff; font-weight:bold;">`;
      headerCells.forEach(cell => {
        htmlBody += `<th style="border:1px solid #94a3b8; padding:6pt 8pt; text-align:left; background-color:#0F4C81; color:#ffffff;">${formatInlineWordText(cell)}</th>`;
      });
      htmlBody += `</tr>`;

      bodyRows.forEach((row, rIdx) => {
        const isTransgression = row.some(cell => cell.toLowerCase().includes('transgrede'));
        const bg = isTransgression ? '#fef2f2' : (rIdx % 2 === 0 ? '#ffffff' : '#f8fafc');
        htmlBody += `<tr style="background-color:${bg};">`;
        row.forEach(cell => {
          htmlBody += `<td style="border:1px solid #cbd5e1; padding:5pt 8pt; vertical-align:top;">${formatInlineWordText(cell)}</td>`;
        });
        htmlBody += `</tr>`;
      });

      htmlBody += `</table>`;
      tableRows = [];
      inTable = false;
    }
  };

  const formatInlineWordText = (text: string): string => {
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Handle condition badges
    const cleanLower = formatted.toLowerCase();
    if (cleanLower.includes('transgrede') && !cleanLower.includes('no transgrede')) {
      formatted = formatted.replace(
        /(\*\*Transgrede\*\*|Transgrede|\*\*Transgrede \(>100%\)\*\*|Transgrede \(>100%\))/gi,
        '<span style="color:#b91c1c; font-weight:bold; background-color:#fee2e2; border:1px solid #f87171; padding:2px 6px; border-radius:3px;">⚠️ $1</span>'
      );
    } else if (cleanLower.includes('no transgrede') || cleanLower.includes('cumple')) {
      formatted = formatted.replace(
        /(\*\*No transgrede \(Cumple\)\*\*|No transgrede \(Cumple\)|\*\*No transgrede\*\*|No transgrede|\*\*Cumple\*\*|Cumple)/gi,
        '<span style="color:#047857; font-weight:bold; background-color:#d1fae5; border:1px solid #34d399; padding:2px 6px; border-radius:3px;">✓ $1</span>'
      );
    }

    // Handle bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // Handle italic & guidance notes
    formatted = formatted.replace(/\*([^*]+?)\*/g, (match, inner) => {
      if (inner.startsWith('[') && inner.endsWith(']')) {
        return `<span style="background-color:#f0fdf4; color:#0369a1; border:1px solid #7dd3fc; padding:2px 6px; font-style:italic; font-size:9pt; border-radius:3px; display:inline-block; margin:2pt 0;">${inner}</span>`;
      }
      return `<i>${inner}</i>`;
    });
    // Handle code
    formatted = formatted.replace(/`(.*?)`/g, '<code style="background-color:#f1f5f9; padding:2px 4px; font-family:Consolas, monospace; border:1px solid #e2e8f0; color:#0369a1;">$1</code>');

    // Handle notice badges
    if (formatted.includes('[INFORMACIÓN A COMPLETAR') || formatted.includes('[A completar')) {
      formatted = formatted.replace(
        /(\[INFORMACIÓN A COMPLETAR[^\]]*\]|\[A completar[^\]]*\])/g,
        '<span style="background-color:#fef3c7; color:#92400e; border:1px solid #f59e0b; padding:2px 6px; font-weight:bold; font-size:9pt; border-radius:3px;">⚠️ $1</span>'
      );
    }

    return formatted;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Table line
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableRows.push(trimmed);
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (!trimmed) {
      htmlBody += `<p style="margin:4pt 0; font-size:4pt;">&nbsp;</p>`;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      htmlBody += `<h1 style="color:#0F4C81; font-size:18pt; font-weight:bold; border-bottom:2pt solid #0F4C81; padding-bottom:6pt; margin-top:20pt; margin-bottom:12pt; text-transform:uppercase;">${formatInlineWordText(trimmed.replace('# ', ''))}</h1>`;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      htmlBody += `<h2 style="color:#0284c7; font-size:14pt; font-weight:bold; border-bottom:1pt solid #cbd5e1; padding-bottom:4pt; margin-top:16pt; margin-bottom:8pt; text-transform:uppercase;">${formatInlineWordText(trimmed.replace('## ', ''))}</h2>`;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      htmlBody += `<h3 style="color:#0f766e; font-size:12pt; font-weight:bold; margin-top:12pt; margin-bottom:6pt;">${formatInlineWordText(trimmed.replace('### ', ''))}</h3>`;
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      htmlBody += `<h4 style="color:#334155; font-size:11pt; font-weight:bold; margin-top:8pt; margin-bottom:4pt;">${formatInlineWordText(trimmed.replace('#### ', ''))}</h4>`;
      continue;
    }

    if (trimmed.startsWith('---')) {
      htmlBody += `<hr style="border:0; border-top:1pt solid #cbd5e1; margin:14pt 0;" />`;
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const itemText = trimmed.replace(/^[-•]\s*/, '');
      htmlBody += `<p style="margin:3pt 0 3pt 18pt; font-size:11pt; text-indent:-12pt;"><span style="color:#0284c7;">■</span> &nbsp; ${formatInlineWordText(itemText)}</p>`;
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s*(.*)$/);
      if (match) {
        htmlBody += `<p style="margin:4pt 0 4pt 18pt; font-size:11pt; text-indent:-14pt;"><b style="color:#0f766e;">${match[1]}</b> &nbsp; ${formatInlineWordText(match[2])}</p>`;
        continue;
      }
    }

    if (trimmed.startsWith('[INFORMACIÓN A COMPLETAR') || trimmed.startsWith('*[INFORMACIÓN A COMPLETAR')) {
      htmlBody += `<div style="background-color:#fffbeb; border:1pt solid #f59e0b; padding:8pt 12pt; margin:10pt 0; color:#92400e; font-size:10pt; border-radius:4px;"><b>⚠️ AVISO PARA EL TITULAR / LABORATORIO:</b><br/>${formatInlineWordText(trimmed.replace(/^[*\[]|\][*]?$/g, ''))}</div>`;
      continue;
    }

    htmlBody += `<p style="margin:4pt 0; font-size:11pt; line-height:1.45; color:#1e293b; text-align:justify;">${formatInlineWordText(trimmed)}</p>`;
  }

  if (inTable) {
    flushTable();
  }

  const wordDocumentContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:w="urn:schemas-microsoft-com:office:word" 
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page Section1 {
          size: 595.3pt 841.9pt; /* A4 */
          margin: 70.85pt 70.85pt 70.85pt 70.85pt; /* 2.5cm */
          mso-header-margin: 35.4pt;
          mso-footer-margin: 35.4pt;
          mso-paper-source: 0;
        }
        div.Section1 { page: Section1; }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 11pt;
          line-height: 1.45;
          color: #1e293b;
        }
      </style>
    </head>
    <body>
      <div class="Section1">
        ${htmlBody}
        <br/>
        <hr style="border:0; border-top:1pt solid #94a3b8;" />
        <p style="font-size:9pt; color:#64748b; text-align:center;">
          Informe emitido de conformidad con la normativa ambiental peruana: D.S. N° 004-2017-MINAM, Ley N° 28611, Ley N° 29338 y R.J. N° 010-2016-ANA. Generado por AquaRadar Perú.
        </p>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + wordDocumentContent], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = fileName.endsWith('.doc') ? fileName : `${fileName}.doc`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

/**
 * Exports AI Technical Report directly to PDF
 */
export function exportTechnicalReportPDF(markdownContent: string, fileName = 'Informe_Tecnico_Calidad_Agua.pdf') {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  // Header Banner
  doc.setFillColor(15, 76, 129);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('AquaRadar - Informe Técnico de Calidad Ambiental de Aguas', margin, 11);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Conforme al D.S. N° 004-2017-MINAM, Ley N° 28611, Ley N° 29338 y R.J. N° 010-2016-ANA', margin, 17);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-PE')}`, pageWidth - margin - 35, 17);

  y = 32;

  const lines = markdownContent.split('\n');
  let inTable = false;
  let tableRows: string[] = [];

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  const flushPdfTable = () => {
    if (tableRows.length > 0) {
      const headerCells = tableRows[0].split('|').slice(1, -1).map(c => c.trim().replace(/\*\*/g, ''));
      const hasDivider = tableRows.length > 1 && tableRows[1].includes('---');
      const bodyRows = (hasDivider ? tableRows.slice(2) : tableRows.slice(1)).map(r =>
        r.split('|').slice(1, -1).map(c => c.trim().replace(/\*\*/g, ''))
      );

      checkPageBreak(30);

      // Custom column widths if it's the 5-column results table
      const is5Col = headerCells.length === 5;
      const is4ColChart = headerCells.length === 4 && headerCells.some(h => h.includes('%'));

      autoTable(doc, {
        startY: y,
        head: [headerCells],
        body: bodyRows,
        theme: 'striped',
        styles: { fontSize: 7.2, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [15, 76, 129], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
        columnStyles: is5Col ? {
          0: { cellWidth: 42, fontStyle: 'bold' },
          1: { cellWidth: 26 },
          2: { cellWidth: 54 },
          3: { cellWidth: 32 },
          4: { cellWidth: 28 },
        } : is4ColChart ? {
          0: { cellWidth: 46, fontStyle: 'bold' },
          1: { cellWidth: 28 },
          2: { cellWidth: 44 },
          3: { cellWidth: 64 },
        } : undefined,
        didParseCell: (data) => {
          if (data.section === 'body') {
            const cellText = String(data.cell.raw || '');
            if (cellText.toLowerCase().includes('transgrede')) {
              data.cell.styles.textColor = [185, 28, 28];
              data.cell.styles.fontStyle = 'bold';
            } else if (cellText.toLowerCase().includes('no transgrede') || cellText.toLowerCase().includes('cumple')) {
              data.cell.styles.textColor = [4, 120, 87];
              data.cell.styles.fontStyle = 'bold';
            }
          }
        },
        margin: { left: margin, right: margin },
      });

      y = (doc as any).lastAutoTable.finalY + 6;
      tableRows = [];
      inTable = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableRows.push(trimmed);
      continue;
    } else if (inTable) {
      flushPdfTable();
    }

    if (!trimmed) {
      y += 2;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      checkPageBreak(14);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 76, 129);
      const text = trimmed.replace('# ', '');
      const split = doc.splitTextToSize(text, maxWidth);
      doc.text(split, margin, y);
      y += split.length * 6 + 3;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      checkPageBreak(12);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(2, 132, 199);
      const text = trimmed.replace('## ', '');
      const split = doc.splitTextToSize(text, maxWidth);
      doc.text(split, margin, y);
      y += split.length * 5 + 2;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      checkPageBreak(10);
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 118, 110);
      const text = trimmed.replace('### ', '');
      const split = doc.splitTextToSize(text, maxWidth);
      doc.text(split, margin, y);
      y += split.length * 4.5 + 2;
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      checkPageBreak(8);
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(51, 65, 85);
      const text = trimmed.replace('#### ', '');
      const split = doc.splitTextToSize(text, maxWidth);
      doc.text(split, margin, y);
      y += split.length * 4 + 1;
      continue;
    }

    if (trimmed.startsWith('---')) {
      checkPageBreak(4);
      doc.setDrawColor(203, 213, 225);
      doc.line(margin, y, pageWidth - margin, y);
      y += 4;
      continue;
    }

    if (trimmed.startsWith('[INFORMACIÓN A COMPLETAR') || trimmed.startsWith('*[INFORMACIÓN A COMPLETAR')) {
      checkPageBreak(12);
      doc.setFillColor(254, 243, 199);
      doc.setDrawColor(245, 158, 11);
      const cleanNotice = trimmed.replace(/^[*\[]|\][*]?$/g, '');
      const split = doc.splitTextToSize(`[INFORMACIÓN REQUERIDA]: ${cleanNotice}`, maxWidth - 6);
      const boxHeight = split.length * 3.5 + 4;
      doc.roundedRect(margin, y - 3, maxWidth, boxHeight, 1.5, 1.5, 'FD');
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(146, 64, 14);
      doc.text(split, margin + 3, y);
      y += boxHeight + 3;
      continue;
    }

    // Normal paragraph or bullet
    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ') || /^\d+\.\s/.test(trimmed);
    const cleanText = trimmed.replace(/^[-•]\s*/, '').replace(/\*\*/g, '').replace(/`/g, '');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);

    const indent = isBullet ? 4 : 0;
    const split = doc.splitTextToSize((isBullet ? '• ' : '') + cleanText, maxWidth - indent);
    checkPageBreak(split.length * 3.8 + 2);
    doc.text(split, margin + indent, y);
    y += split.length * 3.8 + 1.5;
  }

  if (inTable) {
    flushPdfTable();
  }

  // Legal footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'AquaRadar Perú - Generado bajo D.S. N° 004-2017-MINAM, Ley N° 28611, Ley N° 29338 y R.J. N° 010-2016-ANA.',
      margin,
      288
    );
    doc.text(`Página ${p} de ${totalPages}`, pageWidth - margin - 22, 288);
  }

  doc.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
}

