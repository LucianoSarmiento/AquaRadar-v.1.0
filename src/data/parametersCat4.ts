import { ParameterDefinition } from '../types';

export const PARAMETERS_CAT4: ParameterDefinition[] = [
  // FÍSICOS-QUÍMICOS (Págs 18-19)
  {
    id: 'aceites_grasas_cat4',
    name: 'Aceites y Grasas (MEH)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 5.0, displayText: '5.0 mg/L', rawText: '5,0' },
      'E2-CS': { operator: 'MAX', value: 5.0, displayText: '5.0 mg/L', rawText: '5,0' },
      'E2-S': { operator: 'MAX', value: 5.0, displayText: '5.0 mg/L', rawText: '5,0' },
      'E3-Estuarios': { operator: 'MAX', value: 5.0, displayText: '5.0 mg/L', rawText: '5,0' },
      'E3-Marinos': { operator: 'MAX', value: 5.0, displayText: '5.0 mg/L', rawText: '5,0' }
    }
  },
  {
    id: 'cianuro_libre_cat4',
    name: 'Cianuro Libre',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0052, displayText: '0.0052 mg/L', rawText: '0,0052' },
      'E2-CS': { operator: 'MAX', value: 0.0052, displayText: '0.0052 mg/L', rawText: '0,0052' },
      'E2-S': { operator: 'MAX', value: 0.0052, displayText: '0.0052 mg/L', rawText: '0,0052' },
      'E3-Estuarios': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E3-Marinos': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' }
    }
  },
  {
    id: 'color_cat4',
    name: 'Color (Color verdadero Escala Pt/Co)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Escala Pt/Co',
    supportedUnits: ['Escala Pt/Co', 'UC'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 20, footnote: '20 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '20 Pt/Co', rawText: '20 (a)' },
      'E2-CS': { operator: 'MAX', value: 20, footnote: '20 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '20 Pt/Co', rawText: '20 (a)' },
      'E2-S': { operator: 'MAX', value: 20, footnote: '20 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '20 Pt/Co', rawText: '20 (a)' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'clorofila_a_cat4',
    name: 'Clorofila A',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.008, displayText: '0.008 mg/L', rawText: '0,008' },
      'E2-CS': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E2-S': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'conductividad_cat4',
    name: 'Conductividad',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'µS/cm',
    supportedUnits: ['µS/cm', 'mS/cm', 'dS/m'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 1000, displayText: '1000 µS/cm', rawText: '1 000' },
      'E2-CS': { operator: 'MAX', value: 1000, displayText: '1000 µS/cm', rawText: '1 000' },
      'E2-S': { operator: 'MAX', value: 1000, displayText: '1000 µS/cm', rawText: '1 000' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'dbo5_cat4',
    name: 'Demanda Bioquímica de Oxígeno (DBO5)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'E2-CS': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'E2-S': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'E3-Estuarios': { operator: 'MAX', value: 15, displayText: '15 mg/L', rawText: '15' },
      'E3-Marinos': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' }
    }
  },
  {
    id: 'fenoles_cat4',
    name: 'Fenoles',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 2.56, displayText: '2.56 mg/L', rawText: '2,56' },
      'E2-CS': { operator: 'MAX', value: 2.56, displayText: '2.56 mg/L', rawText: '2,56' },
      'E2-S': { operator: 'MAX', value: 2.56, displayText: '2.56 mg/L', rawText: '2,56' },
      'E3-Estuarios': { operator: 'MAX', value: 5.8, displayText: '5.8 mg/L', rawText: '5,8' },
      'E3-Marinos': { operator: 'MAX', value: 5.8, displayText: '5.8 mg/L', rawText: '5,8' }
    }
  },
  {
    id: 'fosforo_total_cat4',
    name: 'Fósforo Total',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.035, displayText: '0.035 mg/L', rawText: '0,035' },
      'E2-CS': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E2-S': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E3-Estuarios': { operator: 'MAX', value: 0.124, displayText: '0.124 mg/L', rawText: '0,124' },
      'E3-Marinos': { operator: 'MAX', value: 0.062, displayText: '0.062 mg/L', rawText: '0,062' }
    }
  },
  {
    id: 'nitratos_cat4',
    name: 'Nitratos (NO3-)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'mg/L NO3-N', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 13, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '13 mg/L', rawText: '13' },
      'E2-CS': { operator: 'MAX', value: 13, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '13 mg/L', rawText: '13' },
      'E2-S': { operator: 'MAX', value: 13, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '13 mg/L', rawText: '13' },
      'E3-Estuarios': { operator: 'MAX', value: 200, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '200 mg/L', rawText: '200' },
      'E3-Marinos': { operator: 'MAX', value: 200, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '200 mg/L', rawText: '200' }
    }
  },
  {
    id: 'amoniaco_total_cat4',
    name: 'Amoniaco Total (NH3)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'mg/L NH3-N'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'AMMONIA_TABLE_1', isSpecialCalculation: true, footnote: '(1) Aplicar Tabla N° 1 según pH y temperatura', displayText: 'Según Tabla N° 1 (pH y T°)', rawText: '(1)' },
      'E2-CS': { operator: 'AMMONIA_TABLE_1', isSpecialCalculation: true, footnote: '(1) Aplicar Tabla N° 1 según pH y temperatura', displayText: 'Según Tabla N° 1 (pH y T°)', rawText: '(1)' },
      'E2-S': { operator: 'AMMONIA_TABLE_1', isSpecialCalculation: true, footnote: '(1) Aplicar Tabla N° 1 según pH y temperatura', displayText: 'Según Tabla N° 1 (pH y T°)', rawText: '(1)' },
      'E3-Estuarios': { operator: 'AMMONIA_TABLE_2', isSpecialCalculation: true, footnote: '(2) Aplicar Tabla N° 2 según pH, T° y salinidad', displayText: 'Según Tabla N° 2 (pH, T°, Sal.)', rawText: '(2)' },
      'E3-Marinos': { operator: 'AMMONIA_TABLE_2', isSpecialCalculation: true, footnote: '(2) Aplicar Tabla N° 2 según pH, T° y salinidad', displayText: 'Según Tabla N° 2 (pH, T°, Sal.)', rawText: '(2)' }
    }
  },
  {
    id: 'nitrogeno_total_cat4',
    name: 'Nitrógeno Total',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.315, displayText: '0.315 mg/L', rawText: '0,315' },
      'E2-CS': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E2-S': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'oxigeno_disuelto_cat4',
    name: 'Oxígeno Disuelto (valor mínimo)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MIN', value: 5, displayText: '≥ 5 mg/L', rawText: '≥ 5' },
      'E2-CS': { operator: 'MIN', value: 5, displayText: '≥ 5 mg/L', rawText: '≥ 5' },
      'E2-S': { operator: 'MIN', value: 5, displayText: '≥ 5 mg/L', rawText: '≥ 5' },
      'E3-Estuarios': { operator: 'MIN', value: 4, displayText: '≥ 4 mg/L', rawText: '≥ 4' },
      'E3-Marinos': { operator: 'MIN', value: 4, displayText: '≥ 4 mg/L', rawText: '≥ 4' }
    }
  },
  {
    id: 'ph_cat4',
    name: 'Potencial de Hidrógeno (pH)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Unidad de pH',
    supportedUnits: ['Unidad de pH'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'RANGE', minValue: 6.5, maxValue: 9.0, displayText: '6.5 a 9.0 pH', rawText: '6,5 a 9,0' },
      'E2-CS': { operator: 'RANGE', minValue: 6.5, maxValue: 9.0, displayText: '6.5 a 9.0 pH', rawText: '6,5 a 9,0' },
      'E2-S': { operator: 'RANGE', minValue: 6.5, maxValue: 9.0, displayText: '6.5 a 9.0 pH', rawText: '6,5 a 9,0' },
      'E3-Estuarios': { operator: 'RANGE', minValue: 6.8, maxValue: 8.5, displayText: '6.8 – 8.5 pH', rawText: '6,8 – 8,5' },
      'E3-Marinos': { operator: 'RANGE', minValue: 6.8, maxValue: 8.5, displayText: '6.8 – 8.5 pH', rawText: '6,8 – 8,5' }
    }
  },
  {
    id: 'sst_cat4',
    name: 'Sólidos Suspendidos Totales (SST)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/m³'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 25, displayText: '≤ 25 mg/L', rawText: '≤ 25' },
      'E2-CS': { operator: 'MAX', value: 100, displayText: '≤ 100 mg/L', rawText: '≤ 100' },
      'E2-S': { operator: 'MAX', value: 400, displayText: '≤ 400 mg/L', rawText: '≤ 400' },
      'E3-Estuarios': { operator: 'MAX', value: 100, displayText: '≤ 100 mg/L', rawText: '≤ 100' },
      'E3-Marinos': { operator: 'MAX', value: 30, displayText: '≤ 30 mg/L', rawText: '≤ 30' }
    }
  },
  {
    id: 'sulfuros_cat4',
    name: 'Sulfuros',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'E2-CS': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'E2-S': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'E3-Estuarios': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'E3-Marinos': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' }
    }
  },
  {
    id: 'temperatura_cat4',
    name: 'Temperatura',
    group: 'FISICO_QUIMICO',
    defaultUnit: '°C',
    supportedUnits: ['°C'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'E2-CS': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'E2-S': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'E3-Estuarios': { operator: 'TEMP_DELTA', value: 2, displayText: 'Δ 2 °C (respecto a promedio multianual)', rawText: 'Δ 2' },
      'E3-Marinos': { operator: 'TEMP_DELTA', value: 2, displayText: 'Δ 2 °C (respecto a promedio multianual)', rawText: 'Δ 2' }
    }
  },

  // INORGÁNICOS (Pág 18)
  {
    id: 'antimonio_cat4',
    name: 'Antimonio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.64, displayText: '0.64 mg/L', rawText: '0,64' },
      'E2-CS': { operator: 'MAX', value: 0.64, displayText: '0.64 mg/L', rawText: '0,64' },
      'E2-S': { operator: 'MAX', value: 0.64, displayText: '0.64 mg/L', rawText: '0,64' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'arsenico_cat4',
    name: 'Arsénico',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.15, displayText: '0.15 mg/L', rawText: '0,15' },
      'E2-CS': { operator: 'MAX', value: 0.15, displayText: '0.15 mg/L', rawText: '0,15' },
      'E2-S': { operator: 'MAX', value: 0.15, displayText: '0.15 mg/L', rawText: '0,15' },
      'E3-Estuarios': { operator: 'MAX', value: 0.036, displayText: '0.036 mg/L', rawText: '0,036' },
      'E3-Marinos': { operator: 'MAX', value: 0.036, displayText: '0.036 mg/L', rawText: '0,036' }
    }
  },
  {
    id: 'bario_cat4',
    name: 'Bario',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'E2-CS': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'E2-S': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' },
      'E3-Estuarios': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cadmio_disuelto_cat4',
    name: 'Cadmio Disuelto',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.00025, displayText: '0.00025 mg/L', rawText: '0,00025' },
      'E2-CS': { operator: 'MAX', value: 0.00025, displayText: '0.00025 mg/L', rawText: '0,00025' },
      'E2-S': { operator: 'MAX', value: 0.00025, displayText: '0.00025 mg/L', rawText: '0,00025' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0088, displayText: '0.0088 mg/L', rawText: '0,0088' },
      'E3-Marinos': { operator: 'MAX', value: 0.0088, displayText: '0.0088 mg/L', rawText: '0,0088' }
    }
  },
  {
    id: 'cobre_cat4',
    name: 'Cobre',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'E2-CS': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'E2-S': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'E3-Estuarios': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E3-Marinos': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'cromo_vi_cat4',
    name: 'Cromo VI',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.011, displayText: '0.011 mg/L', rawText: '0,011' },
      'E2-CS': { operator: 'MAX', value: 0.011, displayText: '0.011 mg/L', rawText: '0,011' },
      'E2-S': { operator: 'MAX', value: 0.011, displayText: '0.011 mg/L', rawText: '0,011' },
      'E3-Estuarios': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E3-Marinos': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'mercurio_cat4',
    name: 'Mercurio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E2-CS': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E2-S': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E3-Marinos': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' }
    }
  },
  {
    id: 'niquel_cat4',
    name: 'Níquel',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.052, displayText: '0.052 mg/L', rawText: '0,052' },
      'E2-CS': { operator: 'MAX', value: 0.052, displayText: '0.052 mg/L', rawText: '0,052' },
      'E2-S': { operator: 'MAX', value: 0.052, displayText: '0.052 mg/L', rawText: '0,052' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0082, displayText: '0.0082 mg/L', rawText: '0,0082' },
      'E3-Marinos': { operator: 'MAX', value: 0.0082, displayText: '0.0082 mg/L', rawText: '0,0082' }
    }
  },
  {
    id: 'plomo_cat4',
    name: 'Plomo',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0025, displayText: '0.0025 mg/L', rawText: '0,0025' },
      'E2-CS': { operator: 'MAX', value: 0.0025, displayText: '0.0025 mg/L', rawText: '0,0025' },
      'E2-S': { operator: 'MAX', value: 0.0025, displayText: '0.0025 mg/L', rawText: '0,0025' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0081, displayText: '0.0081 mg/L', rawText: '0,0081' },
      'E3-Marinos': { operator: 'MAX', value: 0.0081, displayText: '0.0081 mg/L', rawText: '0,0081' }
    }
  },
  {
    id: 'selenio_cat4',
    name: 'Selenio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.005, displayText: '0.005 mg/L', rawText: '0,005' },
      'E2-CS': { operator: 'MAX', value: 0.005, displayText: '0.005 mg/L', rawText: '0,005' },
      'E2-S': { operator: 'MAX', value: 0.005, displayText: '0.005 mg/L', rawText: '0,005' },
      'E3-Estuarios': { operator: 'MAX', value: 0.071, displayText: '0.071 mg/L', rawText: '0,071' },
      'E3-Marinos': { operator: 'MAX', value: 0.071, displayText: '0.071 mg/L', rawText: '0,071' }
    }
  },
  {
    id: 'talio_cat4',
    name: 'Talio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0008, displayText: '0.0008 mg/L', rawText: '0,0008' },
      'E2-CS': { operator: 'MAX', value: 0.0008, displayText: '0.0008 mg/L', rawText: '0,0008' },
      'E2-S': { operator: 'MAX', value: 0.0008, displayText: '0.0008 mg/L', rawText: '0,0008' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'zinc_cat4',
    name: 'Zinc',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.12, displayText: '0.12 mg/L', rawText: '0,12' },
      'E2-CS': { operator: 'MAX', value: 0.12, displayText: '0.12 mg/L', rawText: '0,12' },
      'E2-S': { operator: 'MAX', value: 0.12, displayText: '0.12 mg/L', rawText: '0,12' },
      'E3-Estuarios': { operator: 'MAX', value: 0.081, displayText: '0.081 mg/L', rawText: '0,081' },
      'E3-Marinos': { operator: 'MAX', value: 0.081, displayText: '0.081 mg/L', rawText: '0,081' }
    }
  },

  // ==========================================
  // ORGÁNICOS (D.S. N° 004-2017-MINAM: Incluye Hidrocarburos, HAPs/PCB, Plaguicidas y Microbiológicos)
  // ==========================================

  // --- Subgrupo: Hidrocarburos y Compuestos Orgánicos ---
  {
    id: 'tph_cat4',
    name: 'Hidrocarburos Totales de Petróleo',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'E2-CS': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'E2-S': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'E3-Estuarios': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' },
      'E3-Marinos': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' }
    }
  },
  {
    id: 'hexaclorobutadieno_cat4',
    name: 'Hexaclorobutadieno',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'E2-CS': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'E2-S': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' },
      'E3-Marinos': { operator: 'MAX', value: 0.0006, displayText: '0.0006 mg/L', rawText: '0,0006' }
    }
  },
  {
    id: 'benceno_cat4',
    name: 'Benceno',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E2-CS': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E2-S': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E3-Estuarios': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'E3-Marinos': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'benzo_a_pireno_cat4',
    name: 'Benzo(a)Pireno',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E2-CS': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E2-S': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E3-Marinos': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' }
    }
  },
  {
    id: 'antraceno_cat4',
    name: 'Antraceno',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0004, displayText: '0.0004 mg/L', rawText: '0,0004' },
      'E2-CS': { operator: 'MAX', value: 0.0004, displayText: '0.0004 mg/L', rawText: '0,0004' },
      'E2-S': { operator: 'MAX', value: 0.0004, displayText: '0.0004 mg/L', rawText: '0,0004' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0004, displayText: '0.0004 mg/L', rawText: '0,0004' },
      'E3-Marinos': { operator: 'MAX', value: 0.0004, displayText: '0.0004 mg/L', rawText: '0,0004' }
    }
  },
  {
    id: 'fluoranteno_cat4',
    name: 'Fluoranteno',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E2-CS': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E2-S': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E3-Estuarios': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E3-Marinos': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' }
    }
  },
  {
    id: 'pcb_cat4',
    name: 'Bifenilos Policlorados (PCB)',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.000014, displayText: '0.000014 mg/L', rawText: '0,000014' },
      'E2-CS': { operator: 'MAX', value: 0.000014, displayText: '0.000014 mg/L', rawText: '0,000014' },
      'E2-S': { operator: 'MAX', value: 0.000014, displayText: '0.000014 mg/L', rawText: '0,000014' },
      'E3-Estuarios': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'E3-Marinos': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' }
    }
  },

  // --- Subgrupo: Plaguicidas ---
  {
    id: 'malation_cat4',
    name: 'Malatión',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E2-CS': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E2-S': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'E3-Marinos': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' }
    }
  },
  {
    id: 'paration_cat4',
    name: 'Paratión',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.000013, displayText: '0.000013 mg/L', rawText: '0,000013' },
      'E2-CS': { operator: 'MAX', value: 0.000013, displayText: '0.000013 mg/L', rawText: '0,000013' },
      'E2-S': { operator: 'MAX', value: 0.000013, displayText: '0.000013 mg/L', rawText: '0,000013' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'aldrin_cat4',
    name: 'Aldrín',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.000004, displayText: '0.000004 mg/L', rawText: '0,000004' },
      'E2-CS': { operator: 'MAX', value: 0.000004, displayText: '0.000004 mg/L', rawText: '0,000004' },
      'E2-S': { operator: 'MAX', value: 0.000004, displayText: '0.000004 mg/L', rawText: '0,000004' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'clordano_cat4',
    name: 'Clordano',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0000043, displayText: '0.0000043 mg/L', rawText: '0,0000043' },
      'E2-CS': { operator: 'MAX', value: 0.0000043, displayText: '0.0000043 mg/L', rawText: '0,0000043' },
      'E2-S': { operator: 'MAX', value: 0.0000043, displayText: '0.0000043 mg/L', rawText: '0,0000043' },
      'E3-Estuarios': { operator: 'MAX', value: 0.000004, displayText: '0.000004 mg/L', rawText: '0,000004' },
      'E3-Marinos': { operator: 'MAX', value: 0.000004, displayText: '0.000004 mg/L', rawText: '0,000004' }
    }
  },
  {
    id: 'ddt_cat4',
    name: "DDT (Suma de 4,4'-DDD y 4,4-DDE)",
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.000001, displayText: '0.000001 mg/L', rawText: '0,000001' },
      'E2-CS': { operator: 'MAX', value: 0.000001, displayText: '0.000001 mg/L', rawText: '0,000001' },
      'E2-S': { operator: 'MAX', value: 0.000001, displayText: '0.000001 mg/L', rawText: '0,000001' },
      'E3-Estuarios': { operator: 'MAX', value: 0.000001, displayText: '0.000001 mg/L', rawText: '0,000001' },
      'E3-Marinos': { operator: 'MAX', value: 0.000001, displayText: '0.000001 mg/L', rawText: '0,000001' }
    }
  },
  {
    id: 'dieldrin_cat4',
    name: 'Dieldrín',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.000056, displayText: '0.000056 mg/L', rawText: '0,000056' },
      'E2-CS': { operator: 'MAX', value: 0.000056, displayText: '0.000056 mg/L', rawText: '0,000056' },
      'E2-S': { operator: 'MAX', value: 0.000056, displayText: '0.000056 mg/L', rawText: '0,000056' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0000019, displayText: '0.0000019 mg/L', rawText: '0,0000019' },
      'E3-Marinos': { operator: 'MAX', value: 0.0000019, displayText: '0.0000019 mg/L', rawText: '0,0000019' }
    }
  },
  {
    id: 'endosulfan_cat4',
    name: 'Endosulfán',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.000056, displayText: '0.000056 mg/L', rawText: '0,000056' },
      'E2-CS': { operator: 'MAX', value: 0.000056, displayText: '0.000056 mg/L', rawText: '0,000056' },
      'E2-S': { operator: 'MAX', value: 0.000056, displayText: '0.000056 mg/L', rawText: '0,000056' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0000087, displayText: '0.0000087 mg/L', rawText: '0,0000087' },
      'E3-Marinos': { operator: 'MAX', value: 0.0000087, displayText: '0.0000087 mg/L', rawText: '0,0000087' }
    }
  },
  {
    id: 'endrin_cat4',
    name: 'Endrin',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.000036, displayText: '0.000036 mg/L', rawText: '0,000036' },
      'E2-CS': { operator: 'MAX', value: 0.000036, displayText: '0.000036 mg/L', rawText: '0,000036' },
      'E2-S': { operator: 'MAX', value: 0.000036, displayText: '0.000036 mg/L', rawText: '0,000036' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0000023, displayText: '0.0000023 mg/L', rawText: '0,0000023' },
      'E3-Marinos': { operator: 'MAX', value: 0.0000023, displayText: '0.0000023 mg/L', rawText: '0,0000023' }
    }
  },
  {
    id: 'heptacloro_cat4',
    name: 'Heptacloro',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 18,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0000038, displayText: '0.0000038 mg/L', rawText: '0,0000038' },
      'E2-CS': { operator: 'MAX', value: 0.0000038, displayText: '0.0000038 mg/L', rawText: '0,0000038' },
      'E2-S': { operator: 'MAX', value: 0.0000038, displayText: '0.0000038 mg/L', rawText: '0,0000038' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0000036, displayText: '0.0000036 mg/L', rawText: '0,0000036' },
      'E3-Marinos': { operator: 'MAX', value: 0.0000036, displayText: '0.0000036 mg/L', rawText: '0,0000036' }
    }
  },
  {
    id: 'heptacloro_epoxido_cat4',
    name: 'Heptacloro Epóxido',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 19,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.0000038, displayText: '0.0000038 mg/L', rawText: '0,0000038' },
      'E2-CS': { operator: 'MAX', value: 0.0000038, displayText: '0.0000038 mg/L', rawText: '0,0000038' },
      'E2-S': { operator: 'MAX', value: 0.0000038, displayText: '0.0000038 mg/L', rawText: '0,0000038' },
      'E3-Estuarios': { operator: 'MAX', value: 0.0000036, displayText: '0.0000036 mg/L', rawText: '0,0000036' },
      'E3-Marinos': { operator: 'MAX', value: 0.0000036, displayText: '0.0000036 mg/L', rawText: '0,0000036' }
    }
  },
  {
    id: 'lindano_cat4',
    name: 'Lindano',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 19,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.00095, displayText: '0.00095 mg/L', rawText: '0,00095' },
      'E2-CS': { operator: 'MAX', value: 0.00095, displayText: '0.00095 mg/L', rawText: '0,00095' },
      'E2-S': { operator: 'MAX', value: 0.00095, displayText: '0.00095 mg/L', rawText: '0,00095' },
      'E3-Estuarios': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'E3-Marinos': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'pcp_cat4',
    name: 'Pentaclorofenol (PCP)',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 19,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E2-CS': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E2-S': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E3-Estuarios': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E3-Marinos': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' }
    }
  },
  {
    id: 'aldicarb_cat4',
    name: 'Aldicarb',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 19,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E2-CS': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E2-S': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'E3-Estuarios': { operator: 'MAX', value: 0.00015, displayText: '0.00015 mg/L', rawText: '0,00015' },
      'E3-Marinos': { operator: 'MAX', value: 0.00015, displayText: '0.00015 mg/L', rawText: '0,00015' }
    }
  },

  // --- Subgrupo: Microbiológicos ---
  {
    id: 'coliformes_termo_cat4',
    name: 'Coliformes Termotolerantes',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 19,
    limitsBySubcategory: {
      'E1': { operator: 'MAX', value: 1000, displayText: '1000 NMP/100 ml', rawText: '1 000' },
      'E2-CS': { operator: 'MAX', value: 2000, displayText: '2000 NMP/100 ml', rawText: '2 000' },
      'E2-S': { operator: 'MAX', value: 2000, displayText: '2000 NMP/100 ml', rawText: '2 000' },
      'E3-Estuarios': { operator: 'MAX', value: 1000, displayText: '1000 NMP/100 ml', rawText: '1 000' },
      'E3-Marinos': { operator: 'MAX', value: 2000, displayText: '2000 NMP/100 ml', rawText: '2 000' }
    }
  }
];
