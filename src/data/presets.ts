import { SubcategoryId, UnitType, WaterCategoryId } from '../types';

export interface SamplePreset {
  id: string;
  name: string;
  description: string;
  categoryId: WaterCategoryId;
  subcategoryId: SubcategoryId;
  waterBody: string;
  location: string;
  fieldMeasurements: {
    temperature: number;
    pH: number;
    salinity?: number;
    baselineTemp?: number;
  };
  inputs: Record<string, { value: string | number; unit: UnitType }>;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'preset_rimac_urban',
    name: 'Río Rímac - Chosica (Cat. 4 - E2 Ríos Costa/Sierra)',
    description: 'Monitoreo de río andino-costero con impacto urbano e industrial moderado.',
    categoryId: 'CAT4',
    subcategoryId: 'E2-CS',
    waterBody: 'Río Rímac',
    location: 'Estación Chosica (06°55\'S, 76°40\'W)',
    fieldMeasurements: {
      temperature: 18.5,
      pH: 7.8,
      baselineTemp: 18.0
    },
    inputs: {
      'ph_cat4': { value: 7.8, unit: 'Unidad de pH' },
      'oxigeno_disuelto_cat4': { value: 4.2, unit: 'mg/L' }, // Transgrede (min 5)
      'dbo5_cat4': { value: 14.5, unit: 'mg/L' }, // Transgrede (max 10)
      'conductividad_cat4': { value: 850, unit: 'µS/cm' }, // Cumple (max 1000)
      'sst_cat4': { value: 45, unit: 'mg/L' }, // Cumple (max 100)
      'plomo_cat4': { value: 0.0085, unit: 'mg/L' }, // Transgrede (max 0.0025)
      'arsenico_cat4': { value: 0.08, unit: 'mg/L' }, // Cumple (max 0.15)
      'cobre_cat4': { value: 0.045, unit: 'mg/L' }, // Cumple (max 0.1)
      'zinc_cat4': { value: 0.18, unit: 'mg/L' }, // Transgrede (max 0.12)
      'cadmio_disuelto_cat4': { value: '< 0.0001', unit: 'mg/L' }, // Cumple (max 0.00025)
      'coliformes_termo_cat4': { value: 3400, unit: 'NMP/100 ml' }, // Transgrede (max 2000)
      'amoniaco_total_cat4': { value: 0.85, unit: 'mg/L' },
      'nitratos_cat4': { value: 6.5, unit: 'mg/L' }
    }
  },
  {
    id: 'preset_cat1_a2_sedapal',
    name: 'Captación Bocatoma - Agua Potable (Cat. 1 - A2)',
    description: 'Agua superficial destinada a potabilización con tratamiento convencional.',
    categoryId: 'CAT1',
    subcategoryId: 'A2',
    waterBody: 'Río Santa - Captación',
    location: 'Bocatoma La Huaca, Ancash',
    fieldMeasurements: {
      temperature: 14.0,
      pH: 7.2
    },
    inputs: {
      'ph_cat1': { value: 7.2, unit: 'Unidad de pH' },
      'oxigeno_disuelto_cat1': { value: 6.8, unit: 'mg/L' }, // Cumple (min 5)
      'color_cat1': { value: 15, unit: 'Escala Pt/Co' }, // Cumple (max 100)
      'turbiedad_cat1': { value: 45, unit: 'UNT' }, // Cumple (max 100)
      'dbo5_cat1': { value: 3.2, unit: 'mg/L' }, // Cumple (max 5)
      'cloruros_cat1': { value: 120, unit: 'mg/L' }, // Cumple (max 250)
      'sulfatos_cat1': { value: 180, unit: 'mg/L' }, // Cumple (max 250)
      'aluminio_cat1': { value: 0.45, unit: 'mg/L' }, // Cumple (max 5)
      'arsenico_cat1': { value: 0.008, unit: 'mg/L' }, // Cumple (max 0.01)
      'plomo_cat1': { value: 0.004, unit: 'mg/L' }, // Cumple (max 0.01)
      'hierro_cat1': { value: 0.65, unit: 'mg/L' }, // Cumple (max 1)
      'coliformes_termo_cat1': { value: 1800, unit: 'NMP/100 ml' } // Cumple (max 2000)
    }
  },
  {
    id: 'preset_cat3_riego',
    name: 'Canal de Riego Agrícola - Valle Chancay (Cat. 3 - D1 Riego No Restringido)',
    description: 'Agua para riego de cultivos de tallo bajo y consumo en crudo.',
    categoryId: 'CAT3',
    subcategoryId: 'D1-NR',
    waterBody: 'Canal Principal Chancay-Huaral',
    location: 'Sector Esperanza, Huaral',
    fieldMeasurements: {
      temperature: 20.0,
      pH: 7.6
    },
    inputs: {
      'ph_cat3': { value: 7.6, unit: 'Unidad de pH' },
      'conductividad_cat3': { value: 1850, unit: 'µS/cm' }, // Cumple (max 2500)
      'oxigeno_disuelto_cat3': { value: 5.5, unit: 'mg/L' }, // Cumple (min 4)
      'boro_cat3': { value: 0.85, unit: 'mg/L' }, // Cumple (max 1)
      'cloruros_cat3': { value: 320, unit: 'mg/L' }, // Cumple (max 500)
      'coliformes_termo_cat3': { value: 850, unit: 'NMP/100 ml' }, // Cumple (max 1000)
      'ecoli_cat3': { value: 620, unit: 'NMP/100 ml' }, // Cumple (max 1000)
      'huevos_helmintos_cat3': { value: '< 1', unit: 'Huevo/L' }, // Cumple (max 1)
      'cadmio_cat3': { value: 0.004, unit: 'mg/L' } // Cumple (max 0.01)
    }
  },
  {
    id: 'preset_cat2_marino',
    name: 'Zona de Moluscos Bivalvos - Bahía Sechura (Cat. 2 - C1)',
    description: 'Extracción y cultivo de moluscos bivalvos (Conchas de Abanico).',
    categoryId: 'CAT2',
    subcategoryId: 'C1',
    waterBody: 'Bahía de Sechura - Piura',
    location: 'Área de Concesión Acuícola Sector Matacaballo',
    fieldMeasurements: {
      temperature: 19.2,
      pH: 8.1,
      salinity: 34
    },
    inputs: {
      'ph_cat2': { value: 8.1, unit: 'Unidad de pH' }, // Cumple (7 - 8.5)
      'oxigeno_disuelto_cat2': { value: 5.8, unit: 'mg/L' }, // Cumple (min 4)
      'aceites_grasas_cat2': { value: 0.4, unit: 'mg/L' }, // Cumple (max 1.0)
      'mercurio_cat2': { value: 0.0002, unit: 'mg/L' }, // Cumple (max 0.00094)
      'cadmio_cat2': { value: 0.003, unit: 'mg/L' }, // Cumple (max 0.01)
      'plomo_cat2': { value: 0.002, unit: 'mg/L' }, // Cumple (max 0.0081)
      'coliformes_termo_cat2': { value: 8, unit: 'NMP/100 ml' }, // Cumple (max 14 en área aprobada)
      'materiales_flotantes_cat2': { value: 'Ausencia de material flotante', unit: 'Cualitativo' },
      'hidrocarburos_petroleo_organoleptico_cat2': { value: 'No visible', unit: 'Cualitativo' }
    }
  }
];
