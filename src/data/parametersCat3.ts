import { ParameterDefinition } from '../types';

export const PARAMETERS_CAT3: ParameterDefinition[] = [
  // FÍSICO-QUÍMICOS (Pág 17)
  {
    id: 'aceites_grasas_cat3',
    name: 'Aceites y Grasas',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'D1-R': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'D2': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' }
    }
  },
  {
    id: 'bicarbonatos_cat3',
    name: 'Bicarbonatos',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 518, displayText: '518 mg/L', rawText: '518' },
      'D1-R': { operator: 'MAX', value: 518, displayText: '518 mg/L', rawText: '518' },
      'D2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'cianuro_wad_cat3',
    name: 'Cianuro WAD',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D1-R': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D2': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' }
    }
  },
  {
    id: 'cloruros_cat3',
    name: 'Cloruros',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 500, displayText: '500 mg/L', rawText: '500' },
      'D1-R': { operator: 'MAX', value: 500, displayText: '500 mg/L', rawText: '500' },
      'D2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'color_cat3',
    name: 'Color (después de filtración simple)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Escala Pt/Co',
    supportedUnits: ['Escala Pt/Co', 'UC'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 100, footnote: '100 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '100 Pt/Co', rawText: '100 (a)' },
      'D1-R': { operator: 'MAX', value: 100, footnote: '100 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '100 Pt/Co', rawText: '100 (a)' },
      'D2': { operator: 'MAX', value: 100, footnote: '100 (para aguas claras). Sin cambio anormal (para aguas que presentan coloración natural)', displayText: '100 Pt/Co', rawText: '100 (a)' }
    }
  },
  {
    id: 'conductividad_cat3',
    name: 'Conductividad',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'µS/cm',
    supportedUnits: ['µS/cm', 'mS/cm', 'dS/m'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 2500, displayText: '2500 µS/cm', rawText: '2 500' },
      'D1-R': { operator: 'MAX', value: 2500, displayText: '2500 µS/cm', rawText: '2 500' },
      'D2': { operator: 'MAX', value: 5000, displayText: '5000 µS/cm', rawText: '5 000' }
    }
  },
  {
    id: 'dbo5_cat3',
    name: 'Demanda Bioquímica de Oxígeno (DBO5)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 15, displayText: '15 mg/L', rawText: '15' },
      'D1-R': { operator: 'MAX', value: 15, displayText: '15 mg/L', rawText: '15' },
      'D2': { operator: 'MAX', value: 15, displayText: '15 mg/L', rawText: '15' }
    }
  },
  {
    id: 'dqo_cat3',
    name: 'Demanda Química de Oxígeno (DQO)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 40, displayText: '40 mg/L', rawText: '40' },
      'D1-R': { operator: 'MAX', value: 40, displayText: '40 mg/L', rawText: '40' },
      'D2': { operator: 'MAX', value: 40, displayText: '40 mg/L', rawText: '40' }
    }
  },
  {
    id: 'detergentes_saam_cat3',
    name: 'Detergentes (SAAM)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D1-R': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D2': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' }
    }
  },
  {
    id: 'fenoles_cat3',
    name: 'Fenoles',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'D1-R': { operator: 'MAX', value: 0.002, displayText: '0.002 mg/L', rawText: '0,002' },
      'D2': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' }
    }
  },
  {
    id: 'fluoruros_cat3',
    name: 'Fluoruros',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' },
      'D1-R': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' },
      'D2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'nitratos_nitritos_cat3',
    name: 'Nitratos (NO3--N) + Nitritos (NO2--N)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 100, displayText: '100 mg/L', rawText: '100' },
      'D1-R': { operator: 'MAX', value: 100, displayText: '100 mg/L', rawText: '100' },
      'D2': { operator: 'MAX', value: 100, displayText: '100 mg/L', rawText: '100' }
    }
  },
  {
    id: 'nitritos_cat3',
    name: 'Nitritos (NO2--N)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'D1-R': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' },
      'D2': { operator: 'MAX', value: 10, displayText: '10 mg/L', rawText: '10' }
    }
  },
  {
    id: 'oxigeno_disuelto_cat3',
    name: 'Oxígeno Disuelto (valor mínimo)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MIN', value: 4, displayText: '≥ 4 mg/L', rawText: '≥ 4' },
      'D1-R': { operator: 'MIN', value: 4, displayText: '≥ 4 mg/L', rawText: '≥ 4' },
      'D2': { operator: 'MIN', value: 5, displayText: '≥ 5 mg/L', rawText: '≥ 5' }
    }
  },
  {
    id: 'ph_cat3',
    name: 'Potencial de Hidrógeno (pH)',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'Unidad de pH',
    supportedUnits: ['Unidad de pH'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'RANGE', minValue: 6.5, maxValue: 8.5, displayText: '6.5 – 8.5 pH', rawText: '6,5 – 8,5' },
      'D1-R': { operator: 'RANGE', minValue: 6.5, maxValue: 8.5, displayText: '6.5 – 8.5 pH', rawText: '6,5 – 8,5' },
      'D2': { operator: 'RANGE', minValue: 6.5, maxValue: 8.4, displayText: '6.5 – 8.4 pH', rawText: '6,5 – 8,4' }
    }
  },
  {
    id: 'sulfatos_cat3',
    name: 'Sulfatos',
    group: 'FISICO_QUIMICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'g/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 1000, displayText: '1000 mg/L', rawText: '1 000' },
      'D1-R': { operator: 'MAX', value: 1000, displayText: '1000 mg/L', rawText: '1 000' },
      'D2': { operator: 'MAX', value: 1000, displayText: '1000 mg/L', rawText: '1 000' }
    }
  },
  {
    id: 'temperatura_cat3',
    name: 'Temperatura',
    group: 'FISICO_QUIMICO',
    defaultUnit: '°C',
    supportedUnits: ['°C'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'D1-R': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' },
      'D2': { operator: 'TEMP_DELTA', value: 3, displayText: 'Δ 3 °C (respecto a promedio multianual)', rawText: 'Δ 3' }
    }
  },

  // INORGÁNICOS (Pág 17)
  {
    id: 'aluminio_cat3',
    name: 'Aluminio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'D1-R': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'D2': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' }
    }
  },
  {
    id: 'arsenico_cat3',
    name: 'Arsénico',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D1-R': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D2': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' }
    }
  },
  {
    id: 'bario_cat3',
    name: 'Bario',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'D1-R': { operator: 'MAX', value: 0.7, displayText: '0.7 mg/L', rawText: '0,7' },
      'D2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'berilio_cat3',
    name: 'Berilio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D1-R': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D2': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' }
    }
  },
  {
    id: 'boro_cat3',
    name: 'Boro',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' },
      'D1-R': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' },
      'D2': { operator: 'MAX', value: 5.0, displayText: '5.0 mg/L', rawText: '5' }
    }
  },
  {
    id: 'cadmio_cat3',
    name: 'Cadmio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'D1-R': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' },
      'D2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'cobre_cat3',
    name: 'Cobre',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D1-R': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D2': { operator: 'MAX', value: 0.5, displayText: '0.5 mg/L', rawText: '0,5' }
    }
  },
  {
    id: 'cobalto_cat3',
    name: 'Cobalto',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'D1-R': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'D2': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' }
    }
  },
  {
    id: 'cromo_total_cat3',
    name: 'Cromo Total',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D1-R': { operator: 'MAX', value: 0.1, displayText: '0.1 mg/L', rawText: '0,1' },
      'D2': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' }
    }
  },
  {
    id: 'hierro_cat3',
    name: 'Hierro',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'D1-R': { operator: 'MAX', value: 5, displayText: '5 mg/L', rawText: '5' },
      'D2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'litio_cat3',
    name: 'Litio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 2.5, displayText: '2.5 mg/L', rawText: '2,5' },
      'D1-R': { operator: 'MAX', value: 2.5, displayText: '2.5 mg/L', rawText: '2,5' },
      'D2': { operator: 'MAX', value: 2.5, displayText: '2.5 mg/L', rawText: '2,5' }
    }
  },
  {
    id: 'magnesio_cat3',
    name: 'Magnesio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'D1-R': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'D2': { operator: 'MAX', value: 250, displayText: '250 mg/L', rawText: '250' }
    }
  },
  {
    id: 'manganeso_cat3',
    name: 'Manganeso',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D1-R': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D2': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' }
    }
  },
  {
    id: 'mercurio_cat3',
    name: 'Mercurio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'D1-R': { operator: 'MAX', value: 0.001, displayText: '0.001 mg/L', rawText: '0,001' },
      'D2': { operator: 'MAX', value: 0.01, displayText: '0.01 mg/L', rawText: '0,01' }
    }
  },
  {
    id: 'niquel_cat3',
    name: 'Níquel',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D1-R': { operator: 'MAX', value: 0.2, displayText: '0.2 mg/L', rawText: '0,2' },
      'D2': { operator: 'MAX', value: 1.0, displayText: '1.0 mg/L', rawText: '1' }
    }
  },
  {
    id: 'plomo_cat3',
    name: 'Plomo',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'D1-R': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' },
      'D2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'selenio_cat3',
    name: 'Selenio',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'D1-R': { operator: 'MAX', value: 0.02, displayText: '0.02 mg/L', rawText: '0,02' },
      'D2': { operator: 'MAX', value: 0.05, displayText: '0.05 mg/L', rawText: '0,05' }
    }
  },
  {
    id: 'zinc_cat3',
    name: 'Zinc',
    group: 'INORGANICO',
    defaultUnit: 'mg/L',
    supportedUnits: ['mg/L', 'µg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 2.0, displayText: '2.0 mg/L', rawText: '2' },
      'D1-R': { operator: 'MAX', value: 2.0, displayText: '2.0 mg/L', rawText: '2' },
      'D2': { operator: 'MAX', value: 24.0, displayText: '24.0 mg/L', rawText: '24' }
    }
  },

  // ==========================================
  // ORGÁNICOS (D.S. N° 004-2017-MINAM: Incluye PCB, Plaguicidas y Microbiológicos)
  // ==========================================

  // --- Subgrupo: Compuestos Orgánicos (PCB) ---
  {
    id: 'pcb_cat3',
    name: 'Bifenilos Policlorados (PCB)',
    group: 'ORGANICO',
    subgroup: 'Compuestos Orgánicos (PCB)',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.04, displayText: '0.04 µg/L', rawText: '0,04' },
      'D1-R': { operator: 'MAX', value: 0.04, displayText: '0.04 µg/L', rawText: '0,04' },
      'D2': { operator: 'MAX', value: 0.045, displayText: '0.045 µg/L', rawText: '0,045' }
    }
  },

  // --- Subgrupo: Plaguicidas ---
  {
    id: 'paration_cat3',
    name: 'Paratión',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 35, displayText: '35 µg/L', rawText: '35' },
      'D1-R': { operator: 'MAX', value: 35, displayText: '35 µg/L', rawText: '35' },
      'D2': { operator: 'MAX', value: 35, displayText: '35 µg/L', rawText: '35' }
    }
  },
  {
    id: 'aldrin_cat3',
    name: 'Aldrín',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.004, displayText: '0.004 µg/L', rawText: '0,004' },
      'D1-R': { operator: 'MAX', value: 0.004, displayText: '0.004 µg/L', rawText: '0,004' },
      'D2': { operator: 'MAX', value: 0.7, displayText: '0.7 µg/L', rawText: '0,7' }
    }
  },
  {
    id: 'clordano_cat3',
    name: 'Clordano',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.006, displayText: '0.006 µg/L', rawText: '0,006' },
      'D1-R': { operator: 'MAX', value: 0.006, displayText: '0.006 µg/L', rawText: '0,006' },
      'D2': { operator: 'MAX', value: 7, displayText: '7 µg/L', rawText: '7' }
    }
  },
  {
    id: 'ddt_cat3',
    name: 'Dicloro Difenil Tricloroetano (DDT)',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.001, displayText: '0.001 µg/L', rawText: '0,001' },
      'D1-R': { operator: 'MAX', value: 0.001, displayText: '0.001 µg/L', rawText: '0,001' },
      'D2': { operator: 'MAX', value: 30, displayText: '30 µg/L', rawText: '30' }
    }
  },
  {
    id: 'dieldrin_cat3',
    name: 'Dieldrín',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.5, displayText: '0.5 µg/L', rawText: '0,5' },
      'D1-R': { operator: 'MAX', value: 0.5, displayText: '0.5 µg/L', rawText: '0,5' },
      'D2': { operator: 'MAX', value: 0.5, displayText: '0.5 µg/L', rawText: '0,5' }
    }
  },
  {
    id: 'endosulfan_cat3',
    name: 'Endosulfán',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.01, displayText: '0.01 µg/L', rawText: '0,01' },
      'D1-R': { operator: 'MAX', value: 0.01, displayText: '0.01 µg/L', rawText: '0,01' },
      'D2': { operator: 'MAX', value: 0.01, displayText: '0.01 µg/L', rawText: '0,01' }
    }
  },
  {
    id: 'endrin_cat3',
    name: 'Endrin',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.004, displayText: '0.004 µg/L', rawText: '0,004' },
      'D1-R': { operator: 'MAX', value: 0.004, displayText: '0.004 µg/L', rawText: '0,004' },
      'D2': { operator: 'MAX', value: 0.2, displayText: '0.2 µg/L', rawText: '0,2' }
    }
  },
  {
    id: 'heptacloro_cat3',
    name: 'Heptacloro y Heptacloro Epóxido',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 0.01, displayText: '0.01 µg/L', rawText: '0,01' },
      'D1-R': { operator: 'MAX', value: 0.01, displayText: '0.01 µg/L', rawText: '0,01' },
      'D2': { operator: 'MAX', value: 0.03, displayText: '0.03 µg/L', rawText: '0,03' }
    }
  },
  {
    id: 'lindano_cat3',
    name: 'Lindano',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 4, displayText: '4 µg/L', rawText: '4' },
      'D1-R': { operator: 'MAX', value: 4, displayText: '4 µg/L', rawText: '4' },
      'D2': { operator: 'MAX', value: 4, displayText: '4 µg/L', rawText: '4' }
    }
  },
  {
    id: 'aldicarb_cat3',
    name: 'Aldicarb',
    group: 'ORGANICO',
    subgroup: 'Plaguicidas',
    defaultUnit: 'µg/L',
    supportedUnits: ['µg/L', 'mg/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 1, displayText: '1 µg/L', rawText: '1' },
      'D1-R': { operator: 'MAX', value: 1, displayText: '1 µg/L', rawText: '1' },
      'D2': { operator: 'MAX', value: 11, displayText: '11 µg/L', rawText: '11' }
    }
  },

  // --- Subgrupo: Microbiológicos y Parasitológicos ---
  {
    id: 'coliformes_termo_cat3',
    name: 'Coliformes Termotolerantes',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 1000, footnote: '(c) Para riego de parques públicos y áreas verdes aplican parámetros microbiológicos del tipo no restringido', displayText: '1000 NMP/100 ml', rawText: '1 000' },
      'D1-R': { operator: 'MAX', value: 2000, displayText: '2000 NMP/100 ml', rawText: '2 000' },
      'D2': { operator: 'MAX', value: 1000, displayText: '1000 NMP/100 ml', rawText: '1 000' }
    }
  },
  {
    id: 'ecoli_cat3',
    name: 'Escherichia coli',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'NMP/100 ml',
    supportedUnits: ['NMP/100 ml', 'UFC/100 ml'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 1000, displayText: '1000 NMP/100 ml', rawText: '1 000' },
      'D1-R': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' },
      'D2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  },
  {
    id: 'huevos_helmintos_cat3',
    name: 'Huevos de Helmintos',
    group: 'ORGANICO',
    subgroup: 'Microbiológicos y Parasitológicos',
    defaultUnit: 'Huevo/L',
    supportedUnits: ['Huevo/L'],
    anexoPage: 17,
    limitsBySubcategory: {
      'D1-NR': { operator: 'MAX', value: 1, displayText: '1 Huevo/L', rawText: '1' },
      'D1-R': { operator: 'MAX', value: 1, displayText: '1 Huevo/L', rawText: '1' },
      'D2': { operator: 'NOT_APPLICABLE', displayText: 'No aplica (**)', rawText: '**' }
    }
  }
];
