export interface ReportPayload {
  mode?: 'single' | 'all';
  summary?: any;
  metadata?: any;
  samples?: any[];
}

export function generateStandardizedTechnicalReport(payload: ReportPayload): string {
  const isMulti = payload.mode === 'all' && Array.isArray(payload.samples) && payload.samples.length > 0;
  const samples = isMulti
    ? payload.samples!
    : [
        {
          name: payload.metadata?.sampleCode || 'Muestra 01',
          metadata: payload.metadata || {},
          summary: payload.summary,
          categoryId: payload.summary?.categoryId,
          subcategoryId: payload.summary?.subcategoryId,
        },
      ];

  const firstSample = samples[0];
  const sampleCode = firstSample?.metadata?.sampleCode || 'INF-ECA-001';
  const waterBody = firstSample?.metadata?.waterBody || 'Cuerpo Hídrico en Evaluación';
  const location = firstSample?.metadata?.location || 'Cuenca Hidrográfica';
  const sampler = firstSample?.metadata?.samplerName || 'Especialista en Calidad Ambiental';
  const emissionDate = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Global counts
  const totalSamplesCount = samples.length;
  const evaluatedSamples = samples.filter((s: any) => s.summary);
  const totalParams = evaluatedSamples.reduce((acc: number, s: any) => acc + (s.summary?.totalEvaluated || 0), 0);
  const totalCompliant = evaluatedSamples.reduce((acc: number, s: any) => acc + (s.summary?.compliantCount || 0), 0);
  const totalTransgressions = evaluatedSamples.reduce((acc: number, s: any) => acc + (s.summary?.transgresionCount || 0), 0);
  const globalCompliance = totalParams > 0 ? (totalCompliant / totalParams) * 100 : 0;
  const isOverallCompliant = totalTransgressions === 0 && totalParams > 0;

  // Collect all transgressions across samples
  const allTransgressions: any[] = [];
  evaluatedSamples.forEach((s: any) => {
    if (s.summary?.results) {
      s.summary.results
        .filter((r: any) => r.status === 'TRANSGREDE')
        .forEach((r: any) => {
          allTransgressions.push({
            ...r,
            sampleName: s.name || s.metadata?.sampleCode || 'Muestra',
            sampleCode: s.metadata?.sampleCode || '-',
            location: s.metadata?.location || '-',
            subcategoryCode: s.summary.subcategoryCode,
          });
        });
    }
  });

  return `# INFORME TÉCNICO DE EVALUACIÓN DE CALIDAD AMBIENTAL DE RECURSOS HÍDRICOS

**Cuerpo Hídrico / Proyecto:** ${waterBody} (${location})  
- **Código de informe:** \`INF-${sampleCode.replace(/[^A-Z0-9]/gi, '')}-${new Date().getFullYear()}\`  
- **Fecha de emisión:** ${emissionDate}  
- **Versión:** 1.0 (Definitivo)  
- **Elaborado por:** ${sampler} / AquaRadar Perú  
- **Alcance de Evaluación:** ${isMulti ? `Evaluación Integral Multimuestra (${totalSamplesCount} Puntos de Monitoreo)` : `Evaluación Puntual de Muestra (${sampleCode})`}

---

## 0. Control de versiones y aprobación

### Historial de Revisiones
| Versión | Fecha | Descripción del cambio | Elaborado / Revisado por |
| :--- | :--- | :--- | :--- |
| 1.0 | ${emissionDate} | Emisión inicial del informe técnico de evaluación de calidad ambiental | ${sampler} |

### Cuadro de Firmas y Responsabilidad Técnica
| Elaborado por | Revisado por | Aprobado por |
| :--- | :--- | :--- |
| **${sampler}**<br/>Especialista Ambiental<br/>*[INFORMACIÓN A COMPLETAR: N° CIP/CBP]* | **Ing. Revisor de Calidad**<br/>Coordinador de Monitoreo<br/>*[INFORMACIÓN A COMPLETAR: N° Colegiatura]* | **Director Técnico / Gerente**<br/>Responsable de Gestión Ambiental<br/>*[INFORMACIÓN A COMPLETAR: N° Colegiatura]* |

---

## ÍNDICE
- **0. Control de versiones y aprobación**
- **1. Resumen ejecutivo**
- **2. Introducción**
- **3. Objetivos**
  - 3.1 Objetivo general
  - 3.2 Objetivos específicos
- **4. Marco legal y normativo**
- **5. Descripción del área de estudio**
  - 5.1 Ubicación
  - 5.2 Características generales
  - 5.3 Mapa de ubicación
- **6. Metodología**
  - 6.1 Diseño del monitoreo
  - 6.2 Puntos de monitoreo
  - 6.3 Parámetros evaluados y métodos analíticos
  - 6.4 Cadena de custodia y aseguramiento de calidad
- **7. Resultados**
  - 7.1 Resultados de campo y laboratorio
  - 7.2 Comparación con los Estándares de Calidad Ambiental (ECA)
  - 7.3 Gráficos y tendencias
- **8. Análisis e interpretación de resultados**
- **9. Conclusiones**
- **10. Recomendaciones**
- **11. Referencias bibliográficas**
- **12. Anexos**

---

## 1. Resumen ejecutivo
El presente informe técnico expone la evaluación hidroquímica, física, inorgánica, orgánica y microbiológica de la calidad ambiental en el cuerpo de agua **${waterBody}** (${location}), correspondiente a **${isMulti ? `${totalSamplesCount} puntos de monitoreo` : `el punto de monitoreo ${sampleCode}` }**.

Los resultados obtenidos fueron contrastados rigurosamente frente a los **Estándares de Calidad Ambiental (ECA) para Agua**, aprobados mediante el **Decreto Supremo N° 004-2017-MINAM**, según las subcategorías normativas asignadas por la Autoridad Nacional del Agua (ANA).

- **Total de Parámetros Evaluados:** ${totalParams} determinaciones analíticas.
- **Parámetros Conformes:** ${totalCompliant} (${globalCompliance.toFixed(1)}% de conformidad global).
- **Parámetros No Conformes (Transgresiones):** ${totalTransgressions}.
- **Dictamen Técnico Global:** ${isOverallCompliant ? '**CONFORME CON EL ECA-AGUA** (Apto para el uso asignado sin superaciones reglamentarias).' : '**NO CONFORME — TRANSGRESIÓN REGISTRADA** (Presencia de concentraciones que superan los límites del ECA-Agua).' }

---

## 2. Introducción
El agua es un recurso natural renovable, vulnerable y estratégico para el desarrollo socioeconómico y el equilibrio ecológico en el Perú. El monitoreo de su calidad ambiental constituye una herramienta indispensable de fiscalización, prevención y control ante posibles impactos generados por actividades antrópicas (vertimientos poblacionales, escorrentía agrícola, actividad minero-metalúrgica o industrial) y dinámicas hidrológicas naturales.

El presente estudio se enmarca en la vigilancia continua de los cuerpos de agua conforme al **Protocolo Nacional para el Monitoreo de la Calidad de los Recursos Hídricos Superficiales (R.J. N° 010-2016-ANA)** y la **Ley de Recursos Hídricos (Ley N° 29338)**, con el propósito de diagnosticar el estado del recurso y orientar medidas preventivas o correctivas.

---

## 3. Objetivos

### 3.1 Objetivo general
Evaluar la calidad ambiental del recurso hídrico en **${waterBody}** mediante la determinación analítica de parámetros fisicoquímicos, inorgánicos, orgánicos y microbiológicos, en comparación estricta con el **D.S. N° 004-2017-MINAM**.

### 3.2 Objetivos específicos
- Determinar las características fisicoquímicas y microbiológicas del agua en ${isMulti ? `los ${totalSamplesCount} puntos de monitoreo` : `el punto de monitoreo ${sampleCode}`}.
- Comparar los resultados obtenidos con los Estándares de Calidad Ambiental (ECA) para Agua vigentes, según la categoría y subcategoría correspondiente.
- Identificar posibles fuentes de contaminación o factores causales de alteración de la calidad del cuerpo receptor.
- Formular recomendaciones técnicas y medidas de manejo ambiental orientadas a la protección y remediación del recurso hídrico.

---

## 4. Marco legal y normativo

| Norma | Descripción / Aplicación Técnica | Entidad Emisora |
| :--- | :--- | :--- |
| **Ley N° 28611** | **Ley General del Ambiente**: Establece los principios de prevención (Art. 75), responsabilidad por daño ambiental (Arts. 142 y 144) y la definición de ECA como parámetro de calidad en cuerpo receptor (Art. 31). | Congreso de la República |
| **D.S. N° 004-2017-MINAM** | **Estándares de Calidad Ambiental (ECA) para Agua**: Establece las concentraciones máximas y rangos para Categorías 1 (Poblacional y Recreacional), 2 (Extracción y Cultivo Marino-Costero), 3 (Riego de Vegetales y Bebida de Animales) y 4 (Conservación del Ambiente Acuático). | Ministerio del Ambiente (MINAM) |
| **Ley N° 29338** | **Ley de Recursos Hídricos**: Regula el uso multisectorial, la protección del agua (Arts. 76, 79 y 80), las autorizaciones de vertimiento y tipifica infracciones graves (Arts. 120 al 122). | Autoridad Nacional del Agua (ANA) |
| **D.S. N° 001-2010-AG** | **Reglamento de la Ley de Recursos Hídricos**: Condiciones técnicas de vertimiento en cuerpo receptor (Arts. 103, 131, 133) y régimen sancionador (Arts. 277 al 280). | MINAGRI / ANA |
| **R.J. N° 010-2016-ANA** | **Protocolo Nacional de Monitoreo de Recursos Hídricos Superficiales**: Disposiciones técnicas de ubicación fuera de zona de mezcla (Num. 5.1), preservación, cadena de custodia y control de calidad (Num. 6.17). | Autoridad Nacional del Agua (ANA) |
| **R.J. N° 056-2018-ANA** | **Clasificación Oficial de Cuerpos de Agua Continentales Superficiales**: Asigna la categoría ECA a las cuencas hidrográficas del Perú. | Autoridad Nacional del Agua (ANA) |

---

## 5. Descripción del área de estudio

### 5.1 Ubicación
- **Cuerpo Hídrico Principal:** ${waterBody}
- **Sector / Localidad:** ${location}
- **Puntos Evaluados:** ${samples.map((s: any) => s.metadata?.sampleCode || s.name).join(', ')}
- *[INFORMACIÓN A COMPLETAR POR EL TITULAR/LABORATORIO: Especificar Departamento, Provincia, Distrito, Cuenca/Subcuenca Hidrográfica oficial y Datum de referencia (WGS84 Zona 17S/18S/19S)].*

### 5.2 Características generales
- **Tipo de Cuerpo de Agua:** Superficial continental / lótico o léntico.
- **Uso Actual del Recurso:** ${firstSample?.summary?.subcategoryName || 'Usos multisectoriales según asignación ECA'}.
- **Caudal Estimado / Régimen Hidrológico:** *[INFORMACIÓN A COMPLETAR POR EL TITULAR: Indicar caudal aforado en m³/s o régimen estacional de estiaje/avenida].*
- **Categorización ECA:** ${firstSample?.summary?.categoryId || 'Categoría asignada'} — ${firstSample?.summary?.subcategoryCode || 'Subcategoría'}.

### 5.3 Mapa de ubicación
*[INFORMACIÓN A COMPLETAR POR EL TITULAR/CONSULTORA: Insertar el plano cartográfico temático del área de estudio con la red hidrográfica, faja marginal, fuentes de vertimiento y la ubicación georreferenciada de los puntos de monitoreo (coordenadas UTM WGS84)].*

---

## 6. Metodología

### 6.1 Diseño del monitoreo
El muestreo se planificó de conformidad con el **Protocolo Nacional R.J. N° 010-2016-ANA**, seleccionando puntos representativos de la dinámica hidroquímica del cuerpo receptor, asegurando la toma de muestras fuera de la zona de mezcla y aguas arriba/abajo de las áreas de influencia.

### 6.2 Puntos de monitoreo
| Código | Nombre del punto | Coord. Este (X) | Coord. Norte (Y) | Altitud (m.s.n.m.) | Fecha de muestreo |
| :--- | :--- | :--- | :--- | :--- | :--- |
${samples
  .map((s: any, idx: number) => {
    const coords = s.metadata?.coordinates || '[A completar: UTM X / Y]';
    const date = s.metadata?.samplingDate ? s.metadata.samplingDate.replace('T', ' ') : emissionDate;
    return `| **${s.metadata?.sampleCode || `PM-0${idx + 1}`}** | ${s.name || s.metadata?.location || `Punto ${idx + 1}`} | ${coords} | ${coords} | [A completar] | ${date} |`;
  })
  .join('\n')}

### 6.3 Parámetros evaluados y métodos analíticos
| Categoría | Parámetro | Método de Análisis | Equipo / Norma Técnica |
| :--- | :--- | :--- | :--- |
| **Físicos** | pH, Temperatura, Conductividad, Turbidez, Oxígeno Disuelto (OD), Sólidos Totales Disueltos (STD) | Medición *in situ* | Multiparámetro calibrado / Standard Methods SM 2510 B, EPA 150.1 |
| **Químicos** | DBO₅, DQO, Nitratos, Fosfatos, Sulfatos, Aceites y Grasas | Espectrofotometría UV-Vis / Gravimetría | Standard Methods SM 5210 B, SM 4500-NO3, EPA 353.2 |
| **Metales** | As, Cd, Pb, Hg, Cr, Cu, Zn, Fe, Mn y otros metaloides | Espectrometría de Masas (ICP-MS) / Absorción Atómica | EPA 200.8 / Standard Methods SM 3125 B |
| **Microbiológicos** | Coliformes Totales, Coliformes Termotolerantes, *Escherichia coli* | Filtración por Membrana / NMP | Standard Methods SM 9222 D / SM 9221 |
| **Hidrobiológicos** | Fitoplancton, Zooplancton, Macroinvertebrados bentónicos | *[INFORMACIÓN A COMPLETAR: Análisis taxonómico bajo Protocolo ANA / Índices EPT]* | Microscopía óptica / Protocolos ANA |

### 6.4 Cadena de custodia y aseguramiento de calidad
- **Preservación y Recipientes:** Recipientes de polietileno de alta densidad (PE-HD) acidificados con $\\text{HNO}_3$ ($\text{pH} < 2$) para metales pesados; frascos de vidrio ámbar con tapa de teflón acidificados con $\\text{H}_2\\text{SO}_4$ para nutrientes y DBO/DQO; frascos de vidrio estéril para microbiología.
- **Cadena de Frío:** Transporte en contenedores herméticos (coolers) a temperatura controlada de $5 \\pm 3\\text{ °C}$ con geles refrigerantes.
- **Acreditación del Laboratorio:** Análisis ejecutados en laboratorio acreditado por **INACAL** bajo la norma **NTP-ISO/IEC 17025**. *[INFORMACIÓN A COMPLETAR: Indicar N° de Registro y Razón Social del Laboratorio]*.
- **Controles de Calidad:** Aplicación de blancos de viaje, blancos de campo y duplicados ciegos para validar la exactitud y reproducibilidad analítica (Numeral 6.17 de la R.J. N° 010-2016-ANA).

---

## 7. Resultados

### 7.1 Resultados de campo y laboratorio
*[Presentar de forma resumida los resultados obtenidos en cada punto de monitoreo. Los informes de ensayo de laboratorio deben adjuntarse como anexo.]*

A continuación se presenta el resumen ejecutivo de la caracterización ambiental obtenida para cada punto de monitoreo evaluado en campo e informado por el laboratorio:

${samples
  .filter((s: any) => s.summary)
  .map((s: any, sIdx: number) => {
    const sampleCode = s.metadata?.sampleCode || s.name || `Punto 0${sIdx + 1}`;
    const location = s.metadata?.location || 'Área de influencia directa';
    const waterBody = s.metadata?.waterBody || 'Cuerpo receptor';
    const totalParams = s.summary.totalEvaluated;
    const compliant = s.summary.compliantCount;
    const transgressions = s.summary.transgresionCount;
    const statusText = transgressions === 0 ? 'Conforme (Cumple ECA)' : `${transgressions} Parámetro(s) Crítico(s) en Transgresión`;

    return `• **Punto ${sIdx + 1} (${sampleCode}):** Ubicado en *${location}* (${waterBody}). Se determinaron **${totalParams} parámetros** (físico-químicos, inorgánicos, metales y microbiológicos). Condición global: **${statusText}** (${compliant}/${totalParams} conformes).`;
  })
  .join('\n')}

[INFORMACIÓN A COMPLETAR POR EL TITULAR / LABORATORIO: Adjuntar obligatoriamente como Anexo 1 los informes de ensayo físicos y digitales originales emitidos por el laboratorio acreditado ante INACAL con sus respectivas cadenas de custodia debidamente foliadas.]

### 7.2 Comparación con los Estándares de Calidad Ambiental (ECA)
*[Indicar qué parámetros cumplen o exceden los valores establecidos en el ECA para la categoría correspondiente. Resaltar los parámetros críticos.]*

En los siguientes cuadros se realiza la contrastación individual de todos los parámetros evaluados frente a los valores límite establecidos en el **D.S. N° 004-2017-MINAM (Estándares de Calidad Ambiental para Agua)** para cada una de las muestras configuradas:

${samples
  .filter((s: any) => s.summary)
  .map((s: any, sIdx: number) => {
    const sampleCode = s.metadata?.sampleCode || s.name || `Punto 0${sIdx + 1}`;
    const location = s.metadata?.location ? ` - ${s.metadata.location}` : '';
    const catText = `Categoría ${s.summary.categoryId} (${s.summary.subcategoryCode}: ${s.summary.subcategoryName})`;
    
    return `#### Cuadro 7.2.${sIdx + 1}: Comparación con los Estándares de Calidad Ambiental - Muestra ${sampleCode}${location}
*Norma de comparación aplicable:* D.S. N° 004-2017-MINAM (${catText})

| Parámetro | Valor medido | Límite de la norma correspondiente y pertinente de comparación (D.S. N° 004-2017-MINAM) | Condición | % Límite |
| :--- | :--- | :--- | :--- | :--- |
${s.summary.results
  .map(
    (r: any) => {
      const isTrans = r.status === 'TRANSGREDE';
      const cond = isTrans ? '**Transgrede**' : 'No transgrede (Cumple)';
      const pct = r.percentageOfLimit !== undefined && r.percentageOfLimit !== null
        ? `${r.percentageOfLimit.toFixed(1)}%`
        : (isTrans ? 'Fuera de rango' : 'Dentro de rango');
      return `| ${r.parameterName} | ${r.inputValue} ${r.inputUnit} | ${r.normativeText} | ${cond} | ${pct} |`;
    }
  )
  .join('\n')}`;
  })
  .join('\n\n')}

#### Evaluación de Conformidad y Parámetros Críticos
${
  allTransgressions.length === 0
    ? `**Conformidad Total:** En todas las muestras evaluadas, el 100% de los parámetros se ubican dentro de los límites y rangos permitidos por el D.S. N° 004-2017-MINAM.`
    : `Se registraron **${allTransgressions.length} transgresión(es)** normativas críticas que exceden el valor umbral ambiental:
${allTransgressions
  .map(
    (t: any, i: number) =>
      `• **${i + 1}. Parámetro Crítico: ${t.parameterName}** en *${t.sampleName}* (${t.sampleCode}): Reportó \`${t.inputValue} ${t.inputUnit}\` superando el ECA de \`${t.normativeText}\` (${t.percentageOfLimit ? `${t.percentageOfLimit.toFixed(1)}% del límite` : 'Fuera de rango'}).`
  )
  .join('\n')}`
}

### 7.3 Gráficos y tendencias
*[Insertar gráficos comparativos por parámetro y punto de monitoreo (series temporales, barras comparativas frente al ECA, etc.)]*

A continuación se presenta la representación gráfica porcentual de las concentraciones evaluadas respecto al **100% del umbral normativo del ECA para Agua (D.S. N° 004-2017-MINAM)**. Los valores superiores al 100% representan transgresiones a la calidad ambiental del recurso hídrico:

${samples
  .filter((s: any) => s.summary)
  .map((s: any, sIdx: number) => {
    const sampleLabel = s.metadata?.sampleCode || s.name || `Muestra 0${sIdx + 1}`;
    const chartRows = s.summary.results
      .filter((r: any) => r.percentageOfLimit !== undefined && r.percentageOfLimit !== null)
      .slice(0, 15);
    
    if (chartRows.length === 0) return '';

    return `#### Gráfico 7.${sIdx + 1}: Comparación porcentual frente al 100% del ECA - Muestra ${sampleLabel}
| Parámetro | % del Límite ECA | Condición | Representación Gráfica (Umbral 100% ECA) |
| :--- | :--- | :--- | :--- |
${chartRows
  .map((r: any) => {
    const pct = r.percentageOfLimit!;
    const isTrans = r.status === 'TRANSGREDE';
    const barChar = isTrans ? '█' : '▓';
    const barLength = Math.min(Math.max(Math.round(pct / 10), 1), 20);
    const bar = barChar.repeat(barLength);
    return `| ${r.parameterName} | **${pct.toFixed(1)}%** | ${isTrans ? '**Transgrede (>100%)**' : 'No transgrede (≤100%)'} | \`${bar} ${pct.toFixed(1)}%\` |`;
  })
  .join('\n')}`;
  })
  .filter(Boolean)
  .join('\n\n')}

[INFORMACIÓN A COMPLETAR POR EL TITULAR / LABORATORIO: En caso de requerirse análisis de tendencias temporales históricas o variabilidad estacional (avenida y estiaje) que no hayan sido cargadas previamente en el sistema, dicha información y sus gráficos de series temporales complementarias deberán completarse manualmente e insertarse en esta sección conforme a los antecedentes del cuerpo de agua monitoreado.]

---

## 8. Análisis e interpretación de resultados
${
  allTransgressions.length === 0
    ? `El análisis hidroquímico y microbiológico integral evidencia un **equilibrio favorable en el cuerpo receptor**, sin perturbaciones antropogénicas significativas que comprometan los usos asignados bajo la normativa peruana. Las concentraciones de metales, nutrientes y parámetros organolépticos se conservan dentro de la capacidad de autodepuración del ecosistema hídrico.`
    : `La evaluación técnica evidencia alteraciones hidroquímicas puntuales que superan los umbrales máximos establecidos por el **D.S. N° 004-2017-MINAM**:

${allTransgressions
  .map((t: any) => {
    const isMicro = t.group === 'Microbiológico' || t.parameterName.toLowerCase().includes('coliform');
    const isMetal = t.group === 'Metales y Metaloides' || t.group === 'INORGANICO';
    const isOrganic = t.group === 'ORGANICO' || t.parameterName.includes('DBO') || t.parameterName.includes('DQO');

    let diag = '';
    if (isMicro) {
      diag = `La superación en **${t.parameterName}** (${t.inputValue} ${t.inputUnit}) evidencia aportes directos de efluentes domésticos sin tratamiento o escorrentías pecuarias en el área de influencia (Art. 114 de la Ley 28611), representando un riesgo sanitario inmediato para usos poblacionales o recreativos.`;
    } else if (isMetal) {
      diag = `La concentración de **${t.parameterName}** (${t.inputValue} ${t.inputUnit}) excede el estándar de protección ambiental, lo cual puede vincularse a drenajes mineros, alteraciones geológicas de la cuenca o vertimientos industriales no neutralizados, con potencial toxicidad y bioacumulación en la biota acuática (Art. 76 de la Ley 29338).`;
    } else if (isOrganic) {
      diag = `El exceso en **${t.parameterName}** (${t.inputValue} ${t.inputUnit}) indica una elevada carga de materia orgánica degradable que deprime el balance de oxígeno disuelto y altera la capacidad de asimilación natural del cuerpo de agua (Art. 133 del D.S. 001-2010-AG).`;
    } else {
      diag = `El parámetro **${t.parameterName}** reportó \`${t.inputValue} ${t.inputUnit}\`, excediendo el límite normativo de \`${t.normativeText}\` y demandando una inspección de fuentes aguas arriba.`;
    }

    return `### Diagnóstico: ${t.parameterName} (${t.sampleName})\n- **Severidad:** ${t.percentageOfLimit ? `${t.percentageOfLimit.toFixed(1)}% del límite legal` : 'Fuera de rango'}\n- **Análisis Causal e Implicancia:** ${diag}`;
  })
  .join('\n\n')}`
}

---

## 9. Conclusiones
- **Estado General:** El cuerpo de agua **${waterBody}** presenta una tasa de conformidad global del **${globalCompliance.toFixed(1)}%** respecto a los Estándares de Calidad Ambiental (D.S. N° 004-2017-MINAM).
- **Cumplimiento Normativo:** ${isOverallCompliant ? 'El cuerpo hídrico cumple satisfactoriamente con la totalidad de los parámetros evaluados para la subcategoría asignada.' : `Se constataron ${allTransgressions.length} transgresión(es) normativa(s) que requieren intervención y seguimiento prioritario.`}
- **Fuentes de Alteración:** ${allTransgressions.length === 0 ? 'No se evidencian impactos directos significativos de fuentes puntuales o difusas durante el periodo evaluado.' : 'Las transgresiones registradas sugieren aportes antrópicos (efluentes domésticos, industriales o escorrentías) que sobrepasan la capacidad de asimilación del recurso.'}

---

## 10. Recomendaciones
1. **Campaña de Remuestreo y Verificación:** Ejecutar un nuevo monitoreo de confirmación en un plazo no mayor a 15 días hábiles, siguiendo estrictamente el **Protocolo Nacional R.J. N° 010-2016-ANA**, incorporando controles de calidad (blancos y duplicados).
2. **Inspección de Fajas Marginales y Vertimientos:** Coordinar con la **Autoridad Local del Agua (ALA)** e inspeccionar fuentes aguas arriba (50 m referencial y 200 m aguas abajo fuera de zona de mezcla) para fiscalizar autorizaciones de vertimiento vigentes (Arts. 79 y 80 de la Ley N° 29338).
3. **Mantenimiento y Optimización de Tratamientos:** En caso de titulares de actividades productivas, optimizar los sistemas de tratamiento de aguas residuales (PTAR/PTARI) para garantizar que los efluentes no degraden la calidad del cuerpo receptor fuera del ECA.
4. **Registro en la Red de Vigilancia:** Incorporar los datos a la serie temporal histórica de la cuenca para diferenciar impactos estacionales (avenida/estiaje) de afectaciones continuas.

---

## 11. Referencias bibliográficas
1. **Ministerio del Ambiente (MINAM).** (2017). *Decreto Supremo N° 004-2017-MINAM: Aprueban Estándares de Calidad Ambiental (ECA) para Agua y establecen Disposiciones Complementarias*. Diario Oficial El Peruano.
2. **Autoridad Nacional del Agua (ANA).** (2016). *Resolución Jefatural N° 010-2016-ANA: Protocolo Nacional para el Monitoreo de la Calidad de los Recursos Hídricos Superficiales*. Lima, Perú.
3. **Congreso de la República del Perú.** (2005). *Ley N° 28611: Ley General del Ambiente*. Lima, Perú.
4. **Congreso de la República del Perú.** (2009). *Ley N° 29338: Ley de Recursos Hídricos y su Reglamento (D.S. N° 001-2010-AG)*. Lima, Perú.
5. **APHA, AWWA, WEF.** (2017). *Standard Methods for the Examination of Water and Wastewater* (23rd ed.). American Public Health Association, Washington, D.C.

---

## 12. Anexos
- **Anexo 1:** Informes de ensayo originales del laboratorio de ensayo acreditado ante INACAL.
- **Anexo 2:** Cadena de custodia de las muestras (firmas, sellos, preservantes y temperatura de recepción).
- **Anexo 3:** Registro fotográfico de campo georreferenciado (toma de muestras y entorno).
- **Anexo 4:** Mapa de ubicación de puntos de monitoreo y red hidrográfica (Datum WGS84).
- **Anexo 5:** Certificados de calibración vigente de equipos multiparámetros de campo.
- **Anexo 6:** Panel consolidado de resultados analíticos y matrices de datos de AquaRadar.
`;
}
