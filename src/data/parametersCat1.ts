import { ParameterDefinition } from '../types';

export const PARAMETERS_CAT1: ParameterDefinition[] = [
  // FÍSICO-QUÍMICOS (A1, A2, A3 - Anexo pág 13)
  {
    id: 'aceites_grasas_cat1',
    name: 'Aceites y Grasas',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'A2': { operator: 'MAX', value: 1.7, displayText: '1.7 mg/L', rawText: '1,7' },
      'A3': { operator: 'MAX', value: 1.7, displayText: '1.7 mg/L', rawText: '1,7' },
      'B1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de película visible', displayText: 'Ausencia de película visible', rawText: 'Ausencia de película visible' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cianuro_total_cat1',
    name: 'Cianuro Total',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.07, displayText: '0.07 mg/L', rawText: '0,07' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cianuro_libre_cat1',
    name: 'Cianuro Libre',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'A3': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'B1': { operator: 'MAX', value: 0.022, displayText: '0.022 mg/L', rawText: '0,022' },
      'B2': { operator: 'MAX', value: 0.022, displayText: '0.022 mg/L', rawText: '0,022' }
    }
  },
  {
    id: 'cianuro_wad_cat1',
    name: 'Cianuro WAD',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.08, displayText: '0.08 mg/L', rawText: '0,08' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cloruros_cat1',
    name: 'Cloruros',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 250, displayText: '250 mg/L', rawText: '250' },
      'A2': { operator: 'MAX', value: 250, displayText: '250 mg/L', rawText: '250' },
      'A3': { operator: 'MAX', value: 250, displayText: '250 mg/L', rawText: '250' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'color_cat1',
    name: 'Color (Color verdadero Escala Pt/Co)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Escala Pt/Co',
    supportedUnits: ['Escala Pt/Co', 'UC'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 15, footnote: 'Después de filtración simple', displayText: '15 Pt/Co', rawText: '15' },
      'A2': { operator: 'MAX', value: 100, footnote: '100 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '100 Pt/Co', rawText: '100 (a)' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'QUALITATIVE', qualitativeExpected: 'Sin cambio normal', displayText: 'Sin cambio normal', rawText: 'Sin cambio normal' },
      'B2': { operator: 'QUALITATIVE', qualitativeExpected: 'Sin cambio normal', displayText: 'Sin cambio normal', rawText: 'Sin cambio normal' }
    }
  },
  {
    id: 'conductividad_cat1',
    name: 'Conductividad',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'µS/cm',
    supportedUnits: ['µS/cm', 'mS/cm', 'dS/m'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 1500, displayText: '1500 µS/cm', rawText: '1 500' },
      'A2': { operator: 'MAX', value: 1600, displayText: '1600 µS/cm', rawText: '1 600' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'dbo5_cat1',
    name: 'Demanda Bioquímica de Oxígeno (DBO5)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/m³'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 3, displayText: '3 mg/L', rawText: '3' },
      'A2': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'A3': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'B1': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'B2': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' }
    }
  },
  {
    id: 'dureza_cat1',
    name: 'Dureza',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 500, displayText: '500 mg/L', rawText: '500' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'dqo_cat1',
    name: 'Demanda Química de Oxígeno (DQO)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'A2': { operator: 'MAX', value: 20, displayText: '20 mg/L', rawText: '20' },
      'A3': { operator: 'MAX', value: 30, displayText: '30 mg/L', rawText: '30' },
      'B1': { operator: 'MAX', value: 30, displayText: '30 mg/L', rawText: '30' },
      'B2': { operator: 'MAX', value: 50, displayText: '50 mg/L', rawText: '50' }
    }
  },
  {
    id: 'detergentes_saam_cat1',
    name: 'Detergentes (SAAM)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'B2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de espuma persistente', displayText: 'Ausencia de espuma persistente', rawText: 'Ausencia de espuma persistente' }
    }
  },
  {
    id: 'fenoles_cat1',
    name: 'Fenoles',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.003, displayText: '0.003 mg/L', rawText: '0,003' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'fluoruros_cat1',
    name: 'Fluoruros',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 1.5, displayText: '1.5 mg/L', rawText: '1,5' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'fosforo_total_cat1',
    name: 'Fósforo Total',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'A2': { operator: 'MAX', value: 0.15, displayText: '0.15 mg/L', rawText: '0,15' },
      'A3': { operator: 'MAX', value: 0.15, displayText: '0.15 mg/L', rawText: '0,15' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'materiales_flotantes_cat1',
    name: 'Materiales Flotantes de Origen Antropogénico',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Cualitativo',
    supportedUnits: ['Cualitativo'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante de origen antrópico', displayText: 'Ausencia de material flotante de origen antrópico', rawText: 'Ausencia de material flotante de origen antrópico' },
      'A2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante de origen antrópico', displayText: 'Ausencia de material flotante de origen antrópico', rawText: 'Ausencia de material flotante de origen antrópico' },
      'A3': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante de origen antrópico', displayText: 'Ausencia de material flotante de origen antrópico', rawText: 'Ausencia de material flotante de origen antrópico' },
      'B1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante', displayText: 'Ausencia de material flotante', rawText: 'Ausencia de material flotante' },
      'B2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante', displayText: 'Ausencia de material flotante', rawText: 'Ausencia de material flotante' }
    }
  },
  {
    id: 'nitratos_cat1',
    name: 'Nitratos (NO3-)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'mg/L NO3-N', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 50, footnote: 'Si se determina en NO3-N, multiplicar por 4.43 para expresarlo en NO3-', displayText: '50 mg/L', rawText: '50' },
      'A2': { operator: 'MAX', value: 50, footnote: 'Si se determina en NO3-N, multiplicar por 4.43 para expresarlo en NO3-', displayText: '50 mg/L', rawText: '50' },
      'A3': { operator: 'MAX', value: 50, footnote: 'Si se determina en NO3-N, multiplicar por 4.43 para expresarlo en NO3-', displayText: '50 mg/L', rawText: '50' },
      'B1': { operator: 'MAX', value: 10, footnote: 'Reportado como Nitratos (NO3--N)', displayText: '10 mg/L (como NO3-N)', rawText: '10' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'nitritos_cat1',
    name: 'Nitritos (NO2-)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'mg/L NO2-N', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 3, footnote: 'Si se determina en NO2-N, multiplicar por 3.28 para expresarlo en NO2-', displayText: '3 mg/L', rawText: '3' },
      'A2': { operator: 'MAX', value: 3, footnote: 'Si se determina en NO2-N, multiplicar por 3.28 para expresarlo en NO2-', displayText: '3 mg/L', rawText: '3' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 1, footnote: 'Reportado como Nitritos (NO2--N)', displayText: '1 mg/L (como NO2-N)', rawText: '1' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'amoniaco_n_cat1',
    name: 'Amoniaco - N',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 1.5, displayText: '1.5 mg/L', rawText: '1,5' },
      'A2': { operator: 'MAX', value: 1.5, displayText: '1.5 mg/L', rawText: '1,5' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'oxigeno_disuelto_cat1',
    name: 'Oxígeno Disuelto (valor mínimo)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MIN', value: 6, displayText: '≥ 6 mg/L', rawText: '≥ 6' },
      'A2': { operator: 'MIN', value: 5, displayText: '≥ 5 mg/L', rawText: '≥ 5' },
      'A3': { operator: 'MIN', value: 4, displayText: '≥ 4 mg/L', rawText: '≥ 4' },
      'B1': { operator: 'MIN', value: 5, displayText: '≥ 5 mg/L', rawText: '≥ 5' },
      'B2': { operator: 'MIN', value: 4, displayText: '≥ 4 mg/L', rawText: '≥ 4' }
    }
  },
  {
    id: 'ph_cat1',
    name: 'Potencial de Hidrógeno (pH)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Unidad de pH',
    supportedUnits: ['Unidad de pH'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'RANGE', minValue: 6.5, maxValue: 8.5, displayText: '6.5 – 8.5 pH', rawText: '6,5 – 8,5' },
      'A2': { operator: 'RANGE', minValue: 5.5, maxValue: 9.0, displayText: '5.5 – 9.0 pH', rawText: '5,5 – 9,0' },
      'A3': { operator: 'RANGE', minValue: 5.5, maxValue: 9.0, displayText: '5.5 – 9.0 pH', rawText: '5,5 - 9,0' },
      'B1': { operator: 'RANGE', minValue: 6.0, maxValue: 9.0, displayText: '6.0 a 9.0 pH', rawText: '6,0 a 9,0' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'sdt_cat1',
    name: 'Sólidos Disueltos Totales (SDT)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 1000, displayText: '1000 mg/L', rawText: '1 000' },
      'A2': { operator: 'MAX', value: 1000, displayText: '1000 mg/L', rawText: '1 000' },
      'A3': { operator: 'MAX', value: 1500, displayText: '1500 mg/L', rawText: '1 500' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'sulfatos_cat1',
    name: 'Sulfatos',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 250, displayText: '250 mg/L', rawText: '250' },
      'A2': { operator: 'MAX', value: 500, displayText: '500 mg/L', rawText: '500' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'sulfuros_cat1',
    name: 'Sulfuros',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'temperatura_cat1',
    name: 'Temperatura',
    group: 'FISICO_QUIMICO',
    defaultUnit: '°C',
    supportedUnits: ['°C'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'A2': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'turbiedad_cat1',
    name: 'Turbiedad',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'UNT',
    supportedUnits: ['UNT', 'NTU'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 5, displayText: '5 UNT', rawText: '5' },
      'A2': { operator: 'MAX', value: 100, displayText: '100 UNT', rawText: '100' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 100, displayText: '100 UNT', rawText: '100' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'olor_cat1',
    name: 'Olor (Factor de dilución a 25° C)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Cualitativo',
    supportedUnits: ['Cualitativo'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'QUALITATIVE', qualitativeExpected: 'Aceptable', displayText: 'Aceptable', rawText: 'Aceptable' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // INORGÁNICOS (A1, A2, A3, B1, B2)
  {
    id: 'aluminio_cat1',
    name: 'Aluminio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.9, displayText: '0.9 mg/L', rawText: '0,9' },
      'A2': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'A3': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'B1': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'antimonio_cat1',
    name: 'Antimonio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'A2': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.006, displayText: '0.006 mg/L', rawText: '0,006' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'arsenico_cat1',
    name: 'Arsénico',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A2': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A3': { operator: 'MAX', value: 0.15, displayText: '0.15 mg/L', rawText: '0,15' },
      'B1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'bario_cat1',
    name: 'Bario',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'A2': { operator: 'MAX', value: 1, displayText: '1 mg/L', rawText: '1' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'berilio_cat1',
    name: 'Berilio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.012, displayText: '0.012 mg/L', rawText: '0,012' },
      'A2': { operator: 'MAX', value: 0.04, displayText: '0.04 mg/L', rawText: '0,04' },
      'A3': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'B1': { operator: 'MAX', value: 0.04, displayText: '0.04 mg/L', rawText: '0,04' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'boro_cat1',
    name: 'Boro',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 2.4, displayText: '2.4 mg/L', rawText: '2,4' },
      'A2': { operator: 'MAX', value: 2.4, displayText: '2.4 mg/L', rawText: '2,4' },
      'A3': { operator: 'MAX', value: 2.4, displayText: '2.4 mg/L', rawText: '2,4' },
      'B1': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cadmio_cat1',
    name: 'Cadmio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.003, displayText: '0.003 mg/L', rawText: '0,003' },
      'A2': { operator: 'MAX', value: 0.005, displayText: '0.005 mg/L', rawText: '0,005' },
      'A3': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'B1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cobre_cat1',
    name: 'Cobre',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 2, displayText: '2 mg/L', rawText: '2' },
      'A2': { operator: 'MAX', value: 2, displayText: '2 mg/L', rawText: '2' },
      'A3': { operator: 'MAX', value: 2, displayText: '2 mg/L', rawText: '2' },
      'B1': { operator: 'MAX', value: 2, displayText: '2 mg/L', rawText: '2' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cromo_total_cat1',
    name: 'Cromo Total',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'A2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'A3': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'B1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cromo_vi_cat1',
    name: 'Cromo VI',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'hierro_cat1',
    name: 'Hierro',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.3, displayText: '0.3 mg/L', rawText: '0,3' },
      'A2': { operator: 'MAX', value: 1, displayText: '1 mg/L', rawText: '1' },
      'A3': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'B1': { operator: 'MAX', value: 0.3, displayText: '0.3 mg/L', rawText: '0,3' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'manganeso_cat1',
    name: 'Manganeso',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.4, displayText: '0.4 mg/L', rawText: '0,4' },
      'A2': { operator: 'MAX', value: 0.4, displayText: '0.4 mg/L', rawText: '0,4' },
      'A3': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'B1': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'mercurio_cat1',
    name: 'Mercurio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'A2': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'A3': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'B1': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'molibdeno_cat1',
    name: 'Molibdeno',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 13,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.07, displayText: '0.07 mg/L', rawText: '0,07' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'niquel_cat1',
    name: 'Níquel',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.07, displayText: '0.07 mg/L', rawText: '0,07' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'plata_cat1',
    name: 'Plata',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'B2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'plomo_cat1',
    name: 'Plomo',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'A3': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'B1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'selenio_cat1',
    name: 'Selenio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.04, displayText: '0.04 mg/L', rawText: '0,04' },
      'A2': { operator: 'MAX', value: 0.04, displayText: '0.04 mg/L', rawText: '0,04' },
      'A3': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'B1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'uranio_cat1',
    name: 'Uranio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'A2': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'A3': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'B1': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'B2': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' }
    }
  },
  {
    id: 'vanadio_cat1',
    name: 'Vanadio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'B2': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' }
    }
  },
  {
    id: 'zinc_cat1',
    name: 'Zinc',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 3, displayText: '3 mg/L', rawText: '3' },
      'A2': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'A3': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'B1': { operator: 'MAX', value: 3, displayText: '3 mg/L', rawText: '3' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // ==========================================
  // ORGÁNICOS (D.S. N° 004-2017-MINAM: Hidrocarburos, COVs, BTEX, Aromáticos, Plaguicidas, Cianotoxinas, PCB, Microbiológicos)
  // ==========================================

  // --- Subgrupo: Hidrocarburos y Trihalometanos ---
  {
    id: 'tph_cat1',
    name: 'Hidrocarburos Totales de Petróleo (C8 - C40)',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Trihalometanos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A2': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'A3': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1,0' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'trihalometanos_cat1',
    name: 'Trihalometanos (Suma de cocientes)',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Trihalometanos',
    defaultUnit: 'Adimensional',
    supportedUnits: ['Adimensional'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 1.0, footnote: '(e) Suma de cocientes (Bromoformo/0.1 + Cloroformo/0.3 + Dibromoclorometano/0.1 + Bromodiclorometano/0.06) ≤ 1', displayText: '≤ 1.0', rawText: '1,0' },
      'A2': { operator: 'MAX', value: 1.0, footnote: '(e) Suma de cocientes ≤ 1', displayText: '≤ 1.0', rawText: '1,0' },
      'A3': { operator: 'MAX', value: 1.0, footnote: '(e) Suma de cocientes ≤ 1', displayText: '≤ 1.0', rawText: '1,0' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'bromoformo_cat1',
    name: 'Bromoformo',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Trihalometanos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cloroformo_cat1',
    name: 'Cloroformo',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Trihalometanos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.3, displayText: '0.3 mg/L', rawText: '0,3' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'dibromoclorometano_cat1',
    name: 'Dibromoclorometano',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Trihalometanos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'bromodiclorometano_cat1',
    name: 'Bromodiclorometano',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Trihalometanos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.06, displayText: '0.06 mg/L', rawText: '0,06' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: I. Compuestos Orgánicos Volátiles ---
  {
    id: 'tricloroetano_111_cat1',
    name: '1,1,1-Tricloroetano',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'A2': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'dicloroeteno_11_cat1',
    name: '1,1-Dicloroeteno',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.03, displayText: '0.03 mg/L', rawText: '0,03' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'dicloroetano_12_cat1',
    name: '1,2-Dicloroetano',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.03, displayText: '0.03 mg/L', rawText: '0,03' },
      'A2': { operator: 'MAX', value: 0.03, displayText: '0.03 mg/L', rawText: '0,03' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'diclorobenceno_12_cat1',
    name: '1,2-Diclorobenceno',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'hexaclorobutadieno_cat1',
    name: 'Hexaclorobutadieno',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'A2': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'tetracloroeteno_cat1',
    name: 'Tetracloroeteno',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.04, displayText: '0.04 mg/L', rawText: '0,04' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'tetracloruro_carbono_cat1',
    name: 'Tetracloruro de carbono',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.004, displayText: '0.004 mg/L', rawText: '0,004' },
      'A2': { operator: 'MAX', value: 0.004, displayText: '0.004 mg/L', rawText: '0,004' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'tricloroeteno_cat1',
    name: 'Tricloroeteno',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.07, displayText: '0.07 mg/L', rawText: '0,07' },
      'A2': { operator: 'MAX', value: 0.07, displayText: '0.07 mg/L', rawText: '0,07' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cloruro_vinilo_cat1',
    name: 'Cloruro de Vinilo',
    group: 'ORGANICO',
    subgroup: 'I. Compuestos Orgánicos Volátiles',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: BTEX ---
  {
    id: 'benceno_cat1',
    name: 'Benceno',
    group: 'ORGANICO',
    subgroup: 'BTEX',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A2': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'etilbenceno_cat1',
    name: 'Etilbenceno',
    group: 'ORGANICO',
    subgroup: 'BTEX',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.3, displayText: '0.3 mg/L', rawText: '0,3' },
      'A2': { operator: 'MAX', value: 0.3, displayText: '0.3 mg/L', rawText: '0,3' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'tolueno_cat1',
    name: 'Tolueno',
    group: 'ORGANICO',
    subgroup: 'BTEX',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'A2': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'xilenos_cat1',
    name: 'Xilenos',
    group: 'ORGANICO',
    subgroup: 'BTEX',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'A2': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: Hidrocarburos Aromáticos ---
  {
    id: 'benzo_a_pireno_cat1',
    name: 'Benzo(a)pireno',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos Aromáticos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.0007, displayText: '0.0007 mg/L', rawText: '0,0007' },
      'A2': { operator: 'MAX', value: 0.0007, displayText: '0.0007 mg/L', rawText: '0,0007' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'pentaclorofenol_cat1',
    name: 'Pentaclorofenol (PCP)',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos Aromáticos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.009, displayText: '0.009 mg/L', rawText: '0,009' },
      'A2': { operator: 'MAX', value: 0.009, displayText: '0.009 mg/L', rawText: '0,009' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: Organofosforados ---
  {
    id: 'malation_cat1',
    name: 'Malatión',
    group: 'ORGANICO',
    subgroup: 'Organofosforados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.19, displayText: '0.19 mg/L', rawText: '0,19' },
      'A2': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: Organoclorados ---
  {
    id: 'aldrin_dieldrin_cat1',
    name: 'Aldrín + Dieldrín',
    group: 'ORGANICO',
    subgroup: 'Organoclorados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'A2': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'clordano_cat1',
    name: 'Clordano',
    group: 'ORGANICO',
    subgroup: 'Organoclorados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.0002, displayText: '0.0002 mg/L', rawText: '0,0002' },
      'A2': { operator: 'MAX', value: 0.0002, displayText: '0.0002 mg/L', rawText: '0,0002' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'ddt_cat1',
    name: 'Dicloro Difenil Tricloroetano (DDT)',
    group: 'ORGANICO',
    subgroup: 'Organoclorados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'A2': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'endrin_cat1',
    name: 'Endrín',
    group: 'ORGANICO',
    subgroup: 'Organoclorados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'A2': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'heptacloro_cat1',
    name: 'Heptacloro + Heptacloro Epóxido',
    group: 'ORGANICO',
    subgroup: 'Organoclorados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'A2': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'lindano_cat1',
    name: 'Lindano',
    group: 'ORGANICO',
    subgroup: 'Organoclorados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'A2': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: Carbamato ---
  {
    id: 'aldicarb_cat1',
    name: 'Aldicarb',
    group: 'ORGANICO',
    subgroup: 'Carbamato',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A2': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: II. Cianotoxinas ---
  {
    id: 'microcistina_cat1',
    name: 'Microcistina-LR',
    group: 'ORGANICO',
    subgroup: 'II. Cianotoxinas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'A2': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: III. Bifenilos Policlorados ---
  {
    id: 'pcb_cat1',
    name: 'Bifenilos Policlorados (PCB)',
    group: 'ORGANICO',
    subgroup: 'III. Bifenilos Policlorados',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0.0005, displayText: '0.0005 mg/L', rawText: '0,0005' },
      'A2': { operator: 'MAX', value: 0.0005, displayText: '0.0005 mg/L', rawText: '0,0005' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: Microbiológicos y Parasitológicos ---
  {
    id: 'coliformes_totales_cat1',
    name: 'Coliformes Totales',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 50, displayText: '50 NMP/100 ml', rawText: '50' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'coliformes_termo_cat1',
    name: 'Coliformes Termotolerantes',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 20, displayText: '20 NMP/100 ml', rawText: '20' },
      'A2': { operator: 'MAX', value: 2000, displayText: '2000 NMP/100 ml', rawText: '2 000' },
      'A3': { operator: 'MAX', value: 20000, displayText: '20000 NMP/100 ml', rawText: '20 000' },
      'B1': { operator: 'MAX', value: 200, displayText: '200 NMP/100 ml', rawText: '200' },
      'B2': { operator: 'MAX', value: 1000, displayText: '1000 NMP/100 ml', rawText: '1 000' }
    }
  },
  {
    id: 'formas_parasitarias_cat1',
    name: 'Formas Parasitarias',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'N° Organismo/L',
    supportedUnits: ['N° Organismo/L', 'Org/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0, displayText: '0 Org/L', rawText: '0' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0, displayText: '0 Org/L', rawText: '0' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'ecoli_cat1',
    name: 'Escherichia coli',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0, displayText: '0 NMP/100 ml', rawText: '0' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' },
      'B2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' }
    }
  },
  {
    id: 'vibrio_cholerae_cat1',
    name: 'Vibrio cholerae',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'Presencia/100 ml',
    supportedUnits: ['Presencia/100 ml', 'Cualitativo'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' },
      'A2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' },
      'A3': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' },
      'B1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' },
      'B2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' }
    }
  },
  {
    id: 'organismos_vida_libre_cat1',
    name: 'Organismos de vida libre (algas, protozoarios, copépodos, rotíferos, nemátodos, en todos sus estadios evolutivos)',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'N° Organismo/L',
    supportedUnits: ['N° Organismo/L', 'Org/L'],
    anexoPage: 14,
    limitsBySubcategory: {
      'A1': { operator: 'MAX', value: 0, footnote: '(f) Aplica para agua destinada a producción de agua potable con desinfección', displayText: '0 Org/L', rawText: '0' },
      'A2': { operator: 'MAX', value: 5000000, displayText: '< 5×10⁶ Org/L', rawText: '< 5 x 10^6' },
      'A3': { operator: 'MAX', value: 5000000, displayText: '< 5×10⁶ Org/L', rawText: '< 5 x 10^6' },
      'B1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'enterococos_cat1',
    name: 'Enterococos intestinales',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 200, displayText: '200 NMP/100 ml', rawText: '200' },
      'B2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'giardia_cat1',
    name: 'Giardia duodenalis',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'N° Organismo/L',
    supportedUnits: ['N° Organismo/L', 'Cualitativo'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' },
      'B2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia', displayText: 'Ausencia', rawText: 'Ausencia' }
    }
  },
  {
    id: 'salmonella_cat1',
    name: 'Salmonella spp',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'Presencia/100 ml',
    supportedUnits: ['Presencia/100 ml', 'Cualitativo'],
    anexoPage: 15,
    limitsBySubcategory: {
      'A1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'A3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'B1': { operator: 'MAX', value: 0, displayText: '0 (Ausencia)', rawText: '0' },
      'B2': { operator: 'MAX', value: 0, displayText: '0 (Ausencia)', rawText: '0' }
    }
  }
];
