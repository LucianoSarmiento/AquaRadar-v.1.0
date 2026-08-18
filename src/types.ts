export type WaterCategoryId = 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4' | 'cat1' | 'cat2' | 'cat3' | 'cat4' | '';
export type WaterCategory = 'cat1' | 'cat2' | 'cat3' | 'cat4' | 'CAT1' | 'CAT2' | 'CAT3' | 'CAT4' | '';

export type SubcategoryId = string;
export type UnitType = string;

export interface CategoryInfo {
  id: WaterCategory;
  name: string;
  shortName: string;
  description: string;
  articleRef: string;
  anexoPages: number[];
  subcategories: SubcategoryInfo[];
}

export interface SubcategoryInfo {
  id: string;
  code: string; // e.g. "A1", "A2", "A3", "B1", "B2", "C1", "C2", "C3", "C4", "D1-NR", "D1-R", "D2", "E1", "E2-CS", "E2-S", "E3-Estuarios", "E3-Marinos"
  name: string;
  category: WaterCategory;
  description: string;
  applicableUses: string[];
  articleRef: string;
  anexoPage: number;
}

export type ParameterGroup = 
  | 'FISICO_QUIMICO'
  | 'INORGANICO'
  | 'ORGANICO';

export type LimitOperator = 
  | 'MAX'             // ≤ limit
  | 'MIN'             // ≥ limit
  | 'RANGE'           // min to max
  | 'TEMP_DELTA'      // Δ X °C
  | 'QUALITATIVE'     // Ausencia, No visible, etc.
  | 'AMMONIA_TABLE_1' // Tabla N° 1 (Agua Dulce)
  | 'AMMONIA_TABLE_2' // Tabla N° 2 (Agua Marina / Estuarios)
  | 'TRIHALOMETHANES_SUM' // Suma de cocientes ≤ 1
  | 'NOT_APPLICABLE'; // ** en la norma

export type EvaluationOperator = LimitOperator;

export interface NormativeLimit {
  operator: LimitOperator;
  value?: number;
  minValue?: number;
  maxValue?: number;
  qualitativeExpected?: string;
  footnote?: string;
  displayText: string;
  rawText?: string;
  isSpecialCalculation?: boolean;
}

export interface ParameterDefinition {
  id: string;
  name: string;
  casNumber?: string;
  group: ParameterGroup;
  subgroup?: string;
  defaultUnit: string;
  supportedUnits: string[];
  description?: string;
  limitsBySubcategory: Record<string, NormativeLimit>;
  referenceNote?: string;
  anexoPage: number;
}

export type EvaluationStatus = 'CUMPLE' | 'TRANSGREDE' | 'LOD_BELOW' | 'NO_EVALUABLE' | 'EMPTY';

export interface EvaluatedParamResult {
  parameterId: string;
  parameterName: string;
  group: ParameterGroup;
  subgroup?: string;
  inputValue: string | number;
  inputUnit: string;
  convertedValue?: number;
  normativeUnit: string;
  normativeText: string;
  normativeLimitValue?: number | null;
  anexoPage?: number;
  status: 'CUMPLE' | 'TRANSGREDE' | 'NO_EVALUABLE' | 'LOD_BELOW';
  percentageOfLimit?: number;
  details: string;
  footnote?: string;
}

export interface SampleMetadata {
  sampleCode?: string;
  waterBody?: string;
  location?: string;
  coordinates?: string;
  samplingDate?: string;
  samplerName?: string;
  projectName?: string;
  laboratory?: string;
  notes?: string;
}

export interface SampleEvaluationSummary {
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryCode: string;
  subcategoryName: string;
  evaluatedAt: string;
  results: EvaluatedParamResult[];
  totalEvaluated: number;
  compliantCount: number;
  transgresionCount: number;
  noEvaluableCount: number;
  compliancePercentage: number;
  overallStatus: 'GLOBAL_COMPLIANT' | 'GLOBAL_TRANSGRESSED';
}

export interface SampleItem {
  id: string;
  name: string;
  categoryId: WaterCategoryId;
  subcategoryId: SubcategoryId;
  metadata: SampleMetadata;
  inputs: Record<string, { value: string | number; unit: UnitType }>;
  fieldMeasurements: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    baselineTemp?: number;
  };
  summary: SampleEvaluationSummary | null;
  isEvaluated: boolean;
}

export interface MultiSampleAggregatedSummary {
  totalSamples: number;
  evaluatedSamplesCount: number;
  compliantSamplesCount: number;
  transgressedSamplesCount: number;
  globalComplianceRate: number;
  criticalTransgressions: {
    parameterName: string;
    sampleName: string;
    sampleCode?: string;
    measuredValue: string | number;
    unit: string;
    normativeText: string;
    percentageOfLimit?: number;
  }[];
}

export interface SavedEvaluation {
  id: string;
  savedAt: string;
  metadata: SampleMetadata;
  summary: SampleEvaluationSummary;
  rawInputs: Record<string, { value: string | number; unit: UnitType }>;
  fieldMeasurements?: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    baselineTemp?: number;
  };
}
