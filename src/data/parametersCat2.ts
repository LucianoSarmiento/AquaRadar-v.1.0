import { ParameterDefinition } from '../types';

export const PARAMETERS_CAT2: ParameterDefinition[] = [
  // FÍSICOS-QUÍMICOS (Pág 16)
  {
    id: 'aceites_grasas_cat2',
    name: 'Aceites y Grasas',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1,0' },
      'C2': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1,0' },
      'C3': { operator: 'MAX', value: 2.0, displayText: '2.0 mg/L', rawText: '2,0' },
      'C4': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1,0' }
    }
  },
  {
    id: 'cianuro_wad_cat2',
    name: 'Cianuro WAD',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.004, displayText: '0.004 mg/L', rawText: '0,004' },
      'C2': { operator: 'MAX', value: 0.004, displayText: '0.004 mg/L', rawText: '0,004' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 0.0052, displayText: '0.0052 mg/L', rawText: '0,0052' }
    }
  },
  {
    id: 'color_cat2',
    name: 'Color (después de filtración simple)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Escala Pt/Co',
    supportedUnits: ['Escala Pt/Co', 'UC'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 100, footnote: '100 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '100 Pt/Co', rawText: '100 (a)' },
      'C2': { operator: 'MAX', value: 100, footnote: '100 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '100 Pt/Co', rawText: '100 (a)' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 100, footnote: '100 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '100 Pt/Co', rawText: '100 (a)' }
    }
  },
  {
    id: 'materiales_flotantes_cat2',
    name: 'Materiales Flotantes de Origen Antropogénico',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Cualitativo',
    supportedUnits: ['Cualitativo'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante', displayText: 'Ausencia de material flotante', rawText: 'Ausencia de material flotante' },
      'C2': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante', displayText: 'Ausencia de material flotante', rawText: 'Ausencia de material flotante' },
      'C3': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante', displayText: 'Ausencia de material flotante', rawText: 'Ausencia de material flotante' },
      'C4': { operator: 'QUALITATIVE', qualitativeExpected: 'Ausencia de material flotante', displayText: 'Ausencia de material flotante', rawText: 'Ausencia de material flotante' }
    }
  },
  {
    id: 'dbo5_cat2',
    name: 'Demanda Bioquímica de Oxígeno (DBO5)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C2': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'C3': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'C4': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' }
    }
  },
  {
    id: 'fosforo_total_cat2',
    name: 'Fósforo Total',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.062, displayText: '0.062 mg/L', rawText: '0,062' },
      'C2': { operator: 'MAX', value: 0.062, displayText: '0.062 mg/L', rawText: '0,062' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 0.025, displayText: '0.025 mg/L', rawText: '0,025' }
    }
  },
  {
    id: 'nitratos_cat2',
    name: 'Nitratos (NO3-)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'mg/L NO3-N', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 16, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '16 mg/L', rawText: '16' },
      'C2': { operator: 'MAX', value: 16, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '16 mg/L', rawText: '16' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 13, footnote: 'Si se determina en NO3-N, multiplicar por 4.43', displayText: '13 mg/L', rawText: '13' }
    }
  },
  {
    id: 'oxigeno_disuelto_cat2',
    name: 'Oxígeno Disuelto (valor mínimo)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MIN', value: 4, displayText: '≥ 4 mg/L', rawText: '≥ 4' },
      'C2': { operator: 'MIN', value: 3, displayText: '≥ 3 mg/L', rawText: '≥ 3' },
      'C3': { operator: 'MIN', value: 2.5, displayText: '≥ 2.5 mg/L', rawText: '≥ 2,5' },
      'C4': { operator: 'MIN', value: 5, displayText: '≥ 5 mg/L', rawText: '≥ 5' }
    }
  },
  {
    id: 'ph_cat2',
    name: 'Potencial de Hidrógeno (pH)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Unidad de pH',
    supportedUnits: ['Unidad de pH'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'RANGE', minValue: 7.0, maxValue: 8.5, displayText: '7.0 – 8.5 pH', rawText: '7 – 8,5' },
      'C2': { operator: 'RANGE', minValue: 6.8, maxValue: 8.5, displayText: '6.8 – 8.5 pH', rawText: '6,8 – 8,5' },
      'C3': { operator: 'RANGE', minValue: 6.8, maxValue: 8.5, displayText: '6.8 – 8.5 pH', rawText: '6,8 – 8,5' },
      'C4': { operator: 'RANGE', minValue: 6.0, maxValue: 9.0, displayText: '6.0 – 9.0 pH', rawText: '6,0-9,0' }
    }
  },
  {
    id: 'sst_cat2',
    name: 'Sólidos Suspendidos Totales (SST)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/m³'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 80, displayText: '80 mg/L', rawText: '80' },
      'C2': { operator: 'MAX', value: 60, displayText: '60 mg/L', rawText: '60' },
      'C3': { operator: 'MAX', value: 70, displayText: '70 mg/L', rawText: '70' },
      'C4': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'sulfuros_cat2',
    name: 'Sulfuros',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C3': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C4': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'temperatura_cat2',
    name: 'Temperatura',
    group: 'FISICO_QUIMICO',
    defaultUnit: '°C',
    supportedUnits: ['°C'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'C2': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'C3': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'C4': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' }
    }
  },

  // INORGÁNICOS (Pág 16)
  {
    id: 'amoniaco_total_cat2',
    name: 'Amoniaco Total (NH3)',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'mg/L NH3-N'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'AMMONIA_TABLE_1', isSpecialCalculation: true, footnote: '(1) Aplicar Tabla N° 1 en función de pH y temperatura', displayText: 'Según Tabla N° 1 (pH y T°)', rawText: '(1)' }
    }
  },
  {
    id: 'antimonio_cat2',
    name: 'Antimonio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.64, displayText: '0.64 mg/L', rawText: '0,64' },
      'C2': { operator: 'MAX', value: 0.64, displayText: '0.64 mg/L', rawText: '0,64' },
      'C3': { operator: 'MAX', value: 0.64, displayText: '0.64 mg/L', rawText: '0,64' },
      'C4': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'arsenico_cat2',
    name: 'Arsénico',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C3': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C4': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' }
    }
  },
  {
    id: 'boro_cat2',
    name: 'Boro',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'C2': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 0.75, displayText: '0.75 mg/L', rawText: '0,75' }
    }
  },
  {
    id: 'cadmio_cat2',
    name: 'Cadmio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'C2': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' }
    }
  },
  {
    id: 'cobre_cat2',
    name: 'Cobre',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.0031, displayText: '0.0031 mg/L', rawText: '0,0031' },
      'C2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C3': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C4': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' }
    }
  },
  {
    id: 'cromo_vi_cat2',
    name: 'Cromo VI',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C3': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'C4': { operator: 'MAX', value: 0.10, displayText: '0.10 mg/L', rawText: '0,10' }
    }
  },
  {
    id: 'mercurio_cat2',
    name: 'Mercurio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.00094, displayText: '0.00094 mg/L', rawText: '0,00094' },
      'C2': { operator: 'MAX', value: 0.0001, displayText: '0.0001 mg/L', rawText: '0,0001' },
      'C3': { operator: 'MAX', value: 0.0018, displayText: '0.0018 mg/L', rawText: '0,0018' },
      'C4': { operator: 'MAX', value: 0.00077, displayText: '0.00077 mg/L', rawText: '0,00077' }
    }
  },
  {
    id: 'niquel_cat2',
    name: 'Níquel',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.0082, displayText: '0.0082 mg/L', rawText: '0,0082' },
      'C2': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'C3': { operator: 'MAX', value: 0.074, displayText: '0.074 mg/L', rawText: '0,074' },
      'C4': { operator: 'MAX', value: 0.052, displayText: '0.052 mg/L', rawText: '0,052' }
    }
  },
  {
    id: 'plomo_cat2',
    name: 'Plomo',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.0081, displayText: '0.0081 mg/L', rawText: '0,0081' },
      'C2': { operator: 'MAX', value: 0.0081, displayText: '0.0081 mg/L', rawText: '0,0081' },
      'C3': { operator: 'MAX', value: 0.03, displayText: '0.03 mg/L', rawText: '0,03' },
      'C4': { operator: 'MAX', value: 0.0025, displayText: '0.0025 mg/L', rawText: '0,0025' }
    }
  },
  {
    id: 'selenio_cat2',
    name: 'Selenio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.071, displayText: '0.071 mg/L', rawText: '0,071' },
      'C2': { operator: 'MAX', value: 0.071, displayText: '0.071 mg/L', rawText: '0,071' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 0.005, displayText: '0.005 mg/L', rawText: '0,005' }
    }
  },
  {
    id: 'talio_cat2',
    name: 'Talio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C3': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'C4': { operator: 'MAX', value: 0.0008, displayText: '0.0008 mg/L', rawText: '0,0008' }
    }
  },
  {
    id: 'zinc_cat2',
    name: 'Zinc',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.081, displayText: '0.081 mg/L', rawText: '0,081' },
      'C2': { operator: 'MAX', value: 0.081, displayText: '0.081 mg/L', rawText: '0,081' },
      'C3': { operator: 'MAX', value: 0.12, displayText: '0.12 mg/L', rawText: '0,12' },
      'C4': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1,0' }
    }
  },

  // ==========================================
  // ORGÁNICOS (D.S. N° 004-2017-MINAM: Incluye Hidrocarburos, PCB, Aspecto y Microbiológicos)
  // ==========================================

  // --- Subgrupo: Hidrocarburos y Derivados Orgánicos ---
  {
    id: 'tph_aromatic_cat2',
    name: 'Hidrocarburos Totales de Petróleo (fracción aromática)',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.007, displayText: '0.007 mg/L', rawText: '0,007' },
      'C2': { operator: 'MAX', value: 0.007, displayText: '0.007 mg/L', rawText: '0,007' },
      'C3': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'C4': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'pcb_cat2',
    name: 'Bifenilos Policlorados (PCB)',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'C2': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'C3': { operator: 'MAX', value: 0.00003, displayText: '0.00003 mg/L', rawText: '0,00003' },
      'C4': { operator: 'MAX', value: 0.000014, displayText: '0.000014 mg/L', rawText: '0,000014' }
    }
  },
  {
    id: 'hidrocarburos_petroleo_organoleptico_cat2',
    name: 'Hidrocarburos de Petróleo (Aspecto)',
    group: 'ORGANICO',
    subgroup: 'Hidrocarburos y Compuestos Orgánicos',
    defaultUnit: 'Cualitativo',
    supportedUnits: ['Cualitativo'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'QUALITATIVE', qualitativeExpected: 'No visible', displayText: 'No visible', rawText: 'No visible' },
      'C2': { operator: 'QUALITATIVE', qualitativeExpected: 'No visible', displayText: 'No visible', rawText: 'No visible' },
      'C3': { operator: 'QUALITATIVE', qualitativeExpected: 'No visible', displayText: 'No visible', rawText: 'No visible' },
      'C4': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },

  // --- Subgrupo: Microbiológicos ---
  {
    id: 'coliformes_termo_cat2',
    name: 'Coliformes Termotolerantes',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 16,
    limitsBySubcategory: {
      'C1': { operator: 'MAX', value: 14, footnote: '(d) ≤ 14 NMP/100ml en Área Aprobada; ≤ 88 NMP/100ml en Área Restringida', displayText: '≤ 14 (Área aprobada) / ≤ 88 (Área restringida)', rawText: '≤ 14 (área aprobada) / ≤ 88 (área restringida)' },
      'C2': { operator: 'MAX', value: 30, displayText: '≤ 30 NMP/100 ml', rawText: '≤ 30' },
      'C3': { operator: 'MAX', value: 1000, displayText: '1000 NMP/100 ml', rawText: '1 000' },
      'C4': { operator: 'MAX', value: 200, displayText: '200 NMP/100 ml', rawText: '200' }
    }
  }
];
