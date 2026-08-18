import { GoogleGenAI } from '@google/genai';
import { generateStandardizedTechnicalReport } from '../src/utils/reportGenerator';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utilice POST.' });
  }

  try {
    const { summary, metadata, mode, samples } = req.body || {};

    if (!summary && (!samples || samples.length === 0)) {
      return res.status(400).json({ error: 'Resumen de evaluación no proporcionado.' });
    }

    const isMulti = mode === 'all' && Array.isArray(samples) && samples.length > 0;

    if (!isMulti) {
      if (!summary?.categoryId || !summary?.subcategoryId) {
        return res.status(400).json({
          error: 'No se puede realizar el análisis: No se ha configurado una Categoría o Subcategoría de agua válida (D.S. N° 004-2017-MINAM).'
        });
      }
      if (!summary?.results || summary.results.length === 0 || summary.totalEvaluated === 0) {
        return res.status(400).json({
          error: 'No se puede realizar el análisis: Debe ingresar como mínimo un (1) parámetro a evaluar en la matriz de resultados y medición analítica.'
        });
      }
    } else {
      const validSamples = (samples || []).filter(
        (s: any) => s.categoryId && s.subcategoryId && s.summary && s.summary.totalEvaluated > 0
      );
      if (validSamples.length === 0) {
        return res.status(400).json({
          error: 'No se puede realizar el análisis: Ninguna de las muestras cuenta con Categoría configurada y al menos un parámetro analítico evaluado.'
        });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;

    const prompt = `
Eres un especialista sénior en calidad ambiental, recursos hídricos y derecho ambiental en el Perú.
Tu tarea es redactar un INFORME TÉCNICO DE EVALUACIÓN DE CALIDAD AMBIENTAL DEL RECURSO HÍDRICO exhaustivo, estructurado obligatoriamente según el formato oficial peruano (D.S. N° 004-2017-MINAM, Ley N° 28611, Ley N° 29338 y Protocolo R.J. N° 010-2016-ANA).

REGLA CLAVE:
Completa con los datos pertinentes al análisis en función a lo que pide la estructura del documento. Lo que no puedas completar con los datos de entrada (como coordenadas UTM exactas si faltan, caudal en m3/s, N° de acreditación de laboratorio, CIRA, firma de colegiatura CIP), indica explícitamente entre corchetes: [INFORMACIÓN A COMPLETAR POR EL TITULAR/LABORATORIO: ...].

ALCANCE: ${isMulti ? `INFORME INTEGRAL MULTIMUESTRA (${samples.length} puntos de monitoreo)` : `INFORME PUNTUAL (${metadata?.sampleCode || 'Muestra 01'})`}

ESTRUCTURA OBLIGATORIA DEL DOCUMENTO EN MARKDOWN:
# INFORME TÉCNICO DE EVALUACIÓN DE CALIDAD AMBIENTAL DE RECURSOS HÍDRICOS
**[Nombre del cuerpo de agua / cuenca / proyecto]**
- Código de informe: [XXX-XXX-XXXX]
- Fecha de emisión: [dd/mm/aaaa]
- Versión: [N.º]
- Elaborado por: [Nombre / Consultora / Laboratorio]

## 0. Control de versiones y aprobación
(Incluir tabla de versiones y tabla de Elaborado por, Revisado por, Aprobado por con cargos y colegiaturas)

## ÍNDICE
(Listar numerado los puntos del 0 al 12 con sus subsecciones)

## 1. Resumen ejecutivo
(Síntesis del objetivo, cuerpo de agua evaluado, periodo de muestreo, principales hallazgos frente a ECA aplicables y conclusión general)

## 2. Introducción
(Contexto general, importancia del recurso hídrico, antecedentes, motivo de la evaluación y alcance)

## 3. Objetivos
### 3.1 Objetivo general
### 3.2 Objetivos específicos
(Viñetas específicas para caracterizar, comparar con ECA D.S. 004-2017-MINAM, identificar fuentes y proponer recomendaciones)

## 4. Marco legal y normativo
(Tabla de normas: Ley 28611 Arts. 31/32/74/142, D.S. 004-2017-MINAM, Ley 29338 Arts. III/15/76/79/120, D.S. 001-2010-AG Arts. 103/131/277, R.J. 010-2016-ANA y R.J. 056-2018-ANA)

## 5. Descripción del área de estudio
### 5.1 Ubicación (Región, provincia, distrito, coordenadas UTM/WGS84, cuenca)
### 5.2 Características generales (Tipo de agua, caudal aproximado, uso actual, categoría ECA)
### 5.3 Mapa de ubicación (Indicar qué información cartográfica temática debe insertarse)

## 6. Metodología
### 6.1 Diseño del monitoreo
### 6.2 Puntos de monitoreo (Tabla con Código, Nombre, Coordenadas Este/Norte, Altitud, Fecha)
### 6.3 Parámetros evaluados y métodos analíticos (Tabla: Físicos, Químicos, Metales, Microbiológicos, Hidrobiológicos con métodos Standard Methods / EPA)
### 6.4 Cadena de custodia y aseguramiento de calidad (Preservación HNO3/H2SO4, cadena de frío 5±3°C, laboratorio acreditado INACAL NTP-ISO/IEC 17025, blancos y duplicados Num. 6.17)

## 7. Resultados
### 7.1 Resultados de campo y laboratorio
Incluye como encabezado/guía textual exactamente:
*[Presentar de forma resumida los resultados obtenidos en cada punto de monitoreo. Los informes de ensayo de laboratorio deben adjuntarse como anexo.]*
(Presenta una síntesis ejecutiva y resumen descriptivo de los resultados obtenidos en cada punto de monitoreo evaluado tanto en campo como laboratorio con número de parámetros y estado global. Si no existe información de informes de laboratorio físicos o acreditación no provista por el usuario, indica explícitamente [INFORMACIÓN A COMPLETAR POR EL TITULAR / LABORATORIO: Adjuntar manualmente los informes de ensayo de laboratorio acreditado ante INACAL como Anexo 1]).

### 7.2 Comparación con los Estándares de Calidad Ambiental (ECA)
Incluye como encabezado/guía textual exactamente:
*[Indicar qué parámetros cumplen o exceden los valores establecidos en el ECA para la categoría correspondiente. Resaltar los parámetros críticos.]*
(REGLA OBLIGATORIA: En este punto 7.2 deben estar insertados los cuadros comparativos de TODAS las muestras configuradas, separadas obligatoriamente en cuadros/tablas independientes para cada muestra identificando el código y subcategoría. Cada cuadro debe tener exactamente estas 5 columnas:
| Parámetro | Valor medido | Límite de la norma correspondiente y pertinente de comparación (D.S. N° 004-2017-MINAM) | Condición | % Límite |
En 'Condición' indica 'Transgrede' o 'No transgrede (Cumple)'. En '% Límite' indica el valor porcentual numérico e.g. 125.0% o Dentro de rango / Fuera de rango. Seguidamente, presenta el análisis comparativo discriminando parámetros conformes y resaltando los parámetros críticos transgresores).

### 7.3 Gráficos y tendencias
Incluye como encabezado/guía textual:
*[Insertar gráficos comparativos por parámetro y punto de monitoreo (series temporales, barras comparativas frente al ECA, etc.)]*
(Incluye la representación gráfica y tabla porcentual de barras comparando cada parámetro evaluado frente al 100% del umbral normativo del ECA para Agua D.S. N° 004-2017-MINAM. REGLA OBLIGATORIA: Si no existe información de series temporales históricas o datos estacionales en lo configurado por el usuario y no se puede generar por el asistente, indicar explícitamente que dicha información se tiene que completar manualmente en el aviso [INFORMACIÓN A COMPLETAR POR EL TITULAR / LABORATORIO: Se debe completar manualmente la información y gráficos de series temporales históricas y variaciones estacionales avenida/estiaje para los puntos que no cuenten con registros previos cargados en el sistema]).

## 8. Análisis e interpretación de resultados
(Interpretación científica y ambiental rigurosa, posibles fuentes puntuales y difusas, variabilidad estacional y riesgos por subcategoría)

## 9. Conclusiones
(Viñetas con dictamen de calidad, cumplimiento normativo y fuentes)

## 10. Recomendaciones
(Medidas de manejo, protocolo de remuestreo ANA R.J. 010-2016-ANA y coordinaciones institucionales)

## 11. Referencias bibliográficas
(Citas formales de la normativa y manuales de métodos estandarizados)

## 12. Anexos
(Lista de Anexos 1 al 6: Informes de laboratorio, Cadena de custodia, Registro fotográfico, Mapa, Calibración de equipos y Panel analítico).

DATOS DE ENTRADA:
${
  isMulti
    ? `MUESTRAS A EVALUAR:\n` +
      samples
        .map(
          (s: any, idx: number) =>
            `Muestra ${idx + 1}: ${s.name} (${s.metadata?.sampleCode || '-'}) | Cuerpo: ${s.metadata?.waterBody || '-'} | Punto: ${s.metadata?.location || '-'} | Cat: ${s.categoryId} (${s.subcategoryId}) | Estado: ${s.summary?.overallStatus} | Conformes: ${s.summary?.compliantCount}/${s.summary?.totalEvaluated}`
        )
        .join('\n') +
      `\n\nDETALLE DE RESULTADOS:\n` +
      samples
        .filter((s: any) => s.summary)
        .map((s: any) =>
          s.summary.results
            .map((r: any) => `[${s.metadata?.sampleCode || s.name}] [${r.status}] ${r.parameterName} (${r.group}): Medido = ${r.inputValue} ${r.inputUnit} | ECA = ${r.normativeText} | Pág. ${r.anexoPage}`)
            .join('\n')
        )
        .join('\n')
    : `Muestra: ${metadata?.sampleCode || 'Muestra de ensayo'}
Punto / Ubicación: ${metadata?.location || 'No especificado'}
Cuerpo de Agua: ${metadata?.waterBody || 'No especificado'}
Categoría Normativa: ${summary?.categoryId} - ${summary?.categoryName}
Subcategoría: ${summary?.subcategoryCode} - ${summary?.subcategoryName}
Estado General: ${summary?.overallStatus === 'GLOBAL_COMPLIANT' ? 'CUMPLE CON EL ECA' : 'TRANSGREDE EL ECA'}
Cumplimiento: ${summary?.compliancePercentage?.toFixed(1)}% (${summary?.compliantCount} conformes, ${summary?.transgresionCount} transgresiones de ${summary?.totalEvaluated} evaluados)

DETALLE DE PARÁMETROS:
${summary?.results
  ?.map((r: any) => `• [${r.status}] ${r.parameterName} (${r.group}): Medido = ${r.inputValue} ${r.inputUnit} | ECA = ${r.normativeText} | Pág. ${r.anexoPage} | Detalle: ${r.details}`)
  .join('\n') || ''}`
}
`;

    // Candidate models in preference order
    const candidateModels = [
      'gemini-3.7-flash',
      'gemini-3.1-flash-lite',
      'gemini-3.1-pro-preview',
    ];

    let generatedAnalysis: string | null = null;

    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
          });

          if (response && response.text) {
            generatedAnalysis = response.text;
            break;
          }
        } catch (modelErr: any) {
          console.warn(`Model ${modelName} returned error in Vercel function: ${modelErr?.message}. Trying fallback...`);
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    }

    if (generatedAnalysis) {
      return res.status(200).json({ analysis: generatedAnalysis, source: 'ai' });
    }

    const fallbackReport = generateStandardizedTechnicalReport({
      mode,
      summary,
      metadata,
      samples,
    });

    return res.status(200).json({
      analysis: fallbackReport,
      source: 'standard_engine',
    });
  } catch (err: any) {
    console.error('Error generating report in Vercel function:', err);
    const fallbackReport = generateStandardizedTechnicalReport({
      mode: req.body?.mode,
      summary: req.body?.summary,
      metadata: req.body?.metadata,
      samples: req.body?.samples,
    });
    return res.status(200).json({
      analysis: fallbackReport,
      source: 'standard_engine',
    });
  }
}
