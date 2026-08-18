import {
  EvaluatedParamResult,
  EvaluationOperator,
  NormativeLimit,
  ParameterDefinition,
  SampleEvaluationSummary,
  SubcategoryId,
  UnitType,
  WaterCategoryId
} from '../types';
import { getAmmoniaLimitTable1, getAmmoniaLimitTable2 } from '../data/ammoniaTables';
import { CATEGORIES } from '../data/categories';
import { getParametersForCategory } from '../data/parametersIndex';

/**
 * Converts a numerical value from inputUnit to targetUnit if compatible.
 */
export function convertUnit(
  value: number,
  fromUnit: UnitType,
  toUnit: UnitType,
  paramId?: string
): { convertedValue: number; note?: string } {
  if (fromUnit === toUnit) {
    return { convertedValue: value };
  }

  // mg/L vs µg/L
  if (fromUnit === 'µg/L' && toUnit === 'mg/L') {
    return { convertedValue: value / 1000, note: 'Convertido de µg/L a mg/L (/1000)' };
  }
  if (fromUnit === 'mg/L' && toUnit === 'µg/L') {
    return { convertedValue: value * 1000, note: 'Convertido de mg/L a µg/L (x1000)' };
  }
  if (fromUnit === 'g/L' && toUnit === 'mg/L') {
    return { convertedValue: value * 1000, note: 'Convertido de g/L a mg/L (x1000)' };
  }

  // Nitratos NO3-N -> NO3- (Factor 4.43 según D.S. N° 004-2017-MINAM)
  if (fromUnit === 'mg/L NO3-N' && toUnit === 'mg/L') {
    return { convertedValue: value * 4.43, note: 'Convertido con factor oficial NO3-N x 4.43 a NO3-' };
  }

  // Amoniaco NH3-N -> NH3 (Factor 1.216)
  if (fromUnit === 'mg/L NH3-N' && toUnit === 'mg/L') {
    return { convertedValue: value * 1.216, note: 'Convertido de NH3-N a NH3 (x1.216)' };
  }

  // Conductividad
  if (fromUnit === 'mS/cm' && toUnit === 'µS/cm') {
    return { convertedValue: value * 1000, note: 'Convertido de mS/cm a µS/cm (x1000)' };
  }
  if (fromUnit === 'dS/m' && toUnit === 'µS/cm') {
    return { convertedValue: value * 1000, note: 'Convertido de dS/m a µS/cm (x1000)' };
  }

  // Equivalencias directas
  if ((fromUnit === 'UFC/100 ml' && toUnit === 'NMP/100 ml') || (fromUnit === 'NMP/100 ml' && toUnit === 'UFC/100 ml')) {
    return { convertedValue: value, note: 'Unidad equivalente para comparación microbiológica' };
  }
  if ((fromUnit === 'UC' && toUnit === 'Escala Pt/Co') || (fromUnit === 'Escala Pt/Co' && toUnit === 'UC')) {
    return { convertedValue: value };
  }

  // Default fallback if unknown conversion
  return { convertedValue: value };
}

/**
 * Checks if input is non-detect or below LOD.
 */
export function parseSpecialInput(inputStr: string): {
  isLOD: boolean;
  lodValue?: number;
  isND: boolean;
  numericVal?: number;
} {
  const clean = inputStr.trim().toUpperCase();

  if (clean === 'ND' || clean === 'N.D.' || clean === 'NO DETECTADO') {
    return { isLOD: true, isND: true };
  }

  if (clean.startsWith('<')) {
    const val = parseFloat(clean.replace('<', '').trim().replace(',', '.'));
    if (!isNaN(val)) {
      return { isLOD: true, lodValue: val, isND: false };
    }
  }

  const num = parseFloat(clean.replace(',', '.'));
  if (!isNaN(num)) {
    return { isLOD: false, isND: false, numericVal: num };
  }

  return { isLOD: false, isND: false };
}

/**
 * Evaluates a single parameter against its normative limit.
 */
export function evaluateParameter(
  param: ParameterDefinition,
  subcategoryId: SubcategoryId,
  rawValue: string | number,
  inputUnit: UnitType,
  context?: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    baselineTemp?: number;
  }
): EvaluatedParamResult {
  const limit: NormativeLimit | undefined = param.limitsBySubcategory[subcategoryId];

  const baseResult: EvaluatedParamResult = {
    parameterId: param.id,
    parameterName: param.name,
    group: param.group,
    subgroup: param.subgroup,
    inputValue: rawValue,
    inputUnit: inputUnit,
    normativeUnit: param.defaultUnit,
    status: 'NO_EVALUABLE',
    normativeText: limit?.displayText || 'No normado para esta subcategoría',
    anexoPage: param.anexoPage,
    footnote: limit?.footnote,
    details: ''
  };

  if (!limit || limit.operator === 'NOT_APPLICABLE') {
    baseResult.status = 'NO_EVALUABLE';
    baseResult.details = 'Este parámetro no cuenta con valor límite asignado (**) en la subcategoría seleccionada.';
    return baseResult;
  }

  const stringVal = String(rawValue).trim();
  if (!stringVal) {
    baseResult.status = 'NO_EVALUABLE';
    baseResult.details = 'Sin valor registrado.';
    return baseResult;
  }

  // Check qualitative limits
  if (limit.operator === 'QUALITATIVE') {
    const expected = (limit.qualitativeExpected || '').toLowerCase().trim();
    const entered = stringVal.toLowerCase().trim();

    // Match keywords like "ausencia", "no visible", "incoloro", "sin olor"
    const passes =
      entered.includes('ausencia') ||
      entered.includes('no visible') ||
      entered.includes('sin olor') ||
      entered.includes('incoloro') ||
      entered === expected;

    baseResult.status = passes ? 'CUMPLE' : 'TRANSGREDE';
    baseResult.details = passes
      ? `El valor cualitativo '${stringVal}' satisface el criterio normativo ('${limit.displayText}').`
      : `El valor cualitativo '${stringVal}' incumple el criterio normativo exigido ('${limit.displayText}').`;
    return baseResult;
  }

  // Handle Dynamic Ammonia limits
  if (limit.operator === 'AMMONIA_TABLE_1' || limit.operator === 'AMMONIA_TABLE_2') {
    const temp = context?.temperature;
    const ph = context?.pH;
    const sal = context?.salinity || 30; // default salinity if marine

    if (temp === undefined || ph === undefined) {
      baseResult.status = 'NO_EVALUABLE';
      baseResult.details = 'Se requiere registrar los parámetros de campo pH y Temperatura para determinar el límite dinámico de Amoniaco según la Tabla N° 1/2.';
      return baseResult;
    }

    const dynLimit = limit.operator === 'AMMONIA_TABLE_1'
      ? getAmmoniaLimitTable1(temp, ph)
      : getAmmoniaLimitTable2(temp, ph, sal);

    if (dynLimit === null) {
      baseResult.status = 'NO_EVALUABLE';
      baseResult.details = `Los valores de pH (${ph}) o Temperatura (${temp}°C) están fuera del rango de la tabla normativa de Amoniaco.`;
      return baseResult;
    }

    baseResult.normativeLimitValue = dynLimit;
    baseResult.normativeText = `${dynLimit} mg/L (Calculado con pH ${ph} y T° ${temp}°C)`;

    // Convert input unit if needed
    const parsed = parseSpecialInput(stringVal);
    if (parsed.isND) {
      baseResult.status = 'CUMPLE';
      baseResult.details = 'No detectado (ND). Cumple con el estándar dinámico.';
      return baseResult;
    }
    if (parsed.isLOD && parsed.lodValue !== undefined) {
      const conv = convertUnit(parsed.lodValue, inputUnit, param.defaultUnit, param.id);
      if (conv.convertedValue <= dynLimit) {
        baseResult.status = 'CUMPLE';
        baseResult.details = `< ${parsed.lodValue} ${inputUnit}. Límite de detección menor al límite normativo (${dynLimit} mg/L).`;
      } else {
        baseResult.status = 'TRANSGREDE';
        baseResult.details = `Límite de cuantificación del laboratorio (${parsed.lodValue} ${inputUnit}) supera el ECA dinámico (${dynLimit} mg/L).`;
      }
      return baseResult;
    }

    if (parsed.numericVal !== undefined) {
      const conv = convertUnit(parsed.numericVal, inputUnit, param.defaultUnit, param.id);
      baseResult.convertedValue = conv.convertedValue;
      baseResult.percentageOfLimit = (conv.convertedValue / dynLimit) * 100;

      if (conv.convertedValue <= dynLimit) {
        baseResult.status = 'CUMPLE';
        baseResult.details = `Valor ${conv.convertedValue} mg/L ≤ ${dynLimit} mg/L (ECA dinámico cumplido).`;
      } else {
        baseResult.status = 'TRANSGREDE';
        baseResult.details = `Valor ${conv.convertedValue} mg/L > ${dynLimit} mg/L (Excede el ECA dinámico en ${(baseResult.percentageOfLimit - 100).toFixed(1)}%).`;
      }
      return baseResult;
    }
  }

  // Handle Temp Delta operator
  if (limit.operator === 'TEMP_DELTA') {
    const parsed = parseSpecialInput(stringVal);
    if (parsed.numericVal !== undefined) {
      let delta = parsed.numericVal;
      if (context?.baselineTemp !== undefined) {
        delta = Math.abs(parsed.numericVal - context.baselineTemp);
      }
      baseResult.convertedValue = delta;
      const maxDelta = limit.value || 3;
      baseResult.normativeLimitValue = maxDelta;

      if (delta <= maxDelta) {
        baseResult.status = 'CUMPLE';
        baseResult.details = `Variación térmica de ${delta.toFixed(2)} °C ≤ Δ ${maxDelta} °C respecto al promedio.`;
      } else {
        baseResult.status = 'TRANSGREDE';
        baseResult.details = `Variación térmica de ${delta.toFixed(2)} °C supera el límite de Δ ${maxDelta} °C.`;
      }
      return baseResult;
    }
  }

  // Standard Quantitative Limits (MAX, MIN, RANGE)
  const specialCheck = parseSpecialInput(stringVal);

  if (specialCheck.isND) {
    baseResult.status = 'CUMPLE';
    baseResult.details = 'No detectado (ND). Se considera conforme.';
    return baseResult;
  }

  if (specialCheck.isLOD && specialCheck.lodValue !== undefined) {
    const conv = convertUnit(specialCheck.lodValue, inputUnit, param.defaultUnit, param.id);
    const val = conv.convertedValue;

    if (limit.operator === 'MAX' && limit.value !== undefined) {
      if (val <= limit.value) {
        baseResult.status = 'CUMPLE';
        baseResult.details = `LOD (< ${val} ${param.defaultUnit}) es inferior al límite máximo permitido (${limit.value} ${param.defaultUnit}).`;
      } else {
        baseResult.status = 'TRANSGREDE';
        baseResult.details = `Límite de cuantificación (< ${val} ${param.defaultUnit}) excede el ECA (${limit.value} ${param.defaultUnit}).`;
      }
    } else {
      baseResult.status = 'CUMPLE';
      baseResult.details = `Valor bajo límite de detección (< ${val} ${param.defaultUnit}).`;
    }
    return baseResult;
  }

  if (specialCheck.numericVal !== undefined) {
    const conv = convertUnit(specialCheck.numericVal, inputUnit, param.defaultUnit, param.id);
    const num = conv.convertedValue;
    baseResult.convertedValue = num;

    if (limit.operator === 'MAX' && limit.value !== undefined) {
      baseResult.normativeLimitValue = limit.value;
      baseResult.percentageOfLimit = (num / limit.value) * 100;

      if (num <= limit.value) {
        baseResult.status = 'CUMPLE';
        baseResult.details = `El resultado (${num} ${param.defaultUnit}) CUMPLE con el límite máximo de ${limit.value} ${param.defaultUnit} (${baseResult.percentageOfLimit.toFixed(1)}% del ECA).`;
      } else {
        baseResult.status = 'TRANSGREDE';
        const ex = (num - limit.value).toFixed(4);
        baseResult.details = `El resultado (${num} ${param.defaultUnit}) TRANSGREDE el límite de ${limit.value} ${param.defaultUnit} por +${ex} ${param.defaultUnit} (${baseResult.percentageOfLimit.toFixed(1)}% del ECA).`;
      }
      return baseResult;
    }

    if (limit.operator === 'MIN' && limit.value !== undefined) {
      baseResult.normativeLimitValue = limit.value;
      baseResult.percentageOfLimit = (num / limit.value) * 100;

      if (num >= limit.value) {
        baseResult.status = 'CUMPLE';
        baseResult.details = `El resultado (${num} ${param.defaultUnit}) CUMPLE con el valor mínimo exigido de ≥ ${limit.value} ${param.defaultUnit}.`;
      } else {
        baseResult.status = 'TRANSGREDE';
        baseResult.details = `El resultado (${num} ${param.defaultUnit}) TRANSGREDE por encontrarse debajo del mínimo requerido de ≥ ${limit.value} ${param.defaultUnit}.`;
      }
      return baseResult;
    }

    if (limit.operator === 'RANGE' && limit.minValue !== undefined && limit.maxValue !== undefined) {
      baseResult.normativeLimitValue = limit.maxValue;

      if (num >= limit.minValue && num <= limit.maxValue) {
        baseResult.status = 'CUMPLE';
        baseResult.details = `El resultado (${num}) CUMPLE por encontrarse dentro del rango normativo [${limit.minValue} – ${limit.maxValue}].`;
      } else {
        baseResult.status = 'TRANSGREDE';
        if (num < limit.minValue) {
          baseResult.details = `El resultado (${num}) TRANSGREDE por encontrarse por debajo del rango mínimo permitido (${limit.minValue}).`;
        } else {
          baseResult.details = `El resultado (${num}) TRANSGREDE por encontrarse por encima del rango máximo permitido (${limit.maxValue}).`;
        }
      }
      return baseResult;
    }
  }

  return baseResult;
}

/**
 * Runs a full evaluation across all recorded inputs for a sample.
 */
export function evaluateSampleSet(
  categoryId: WaterCategoryId,
  subcategoryId: SubcategoryId,
  sampleInputs: Record<string, { value: string | number; unit: UnitType }>,
  fieldMeasurements?: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    baselineTemp?: number;
  }
): SampleEvaluationSummary {
  if (!categoryId || !subcategoryId) {
    return {
      evaluatedAt: new Date().toISOString(),
      categoryId: '',
      categoryName: 'Sin Categoría Configurada',
      subcategoryId: '',
      subcategoryCode: 'N/A',
      subcategoryName: 'Sin Subcategoría Configurada',
      totalEvaluated: 0,
      compliantCount: 0,
      transgresionCount: 0,
      noEvaluableCount: 0,
      overallStatus: 'GLOBAL_COMPLIANT',
      compliancePercentage: 0,
      results: [],
    };
  }

  const categoryDef = CATEGORIES.find(c => c.id === categoryId);
  const subcategoryDef = categoryDef?.subcategories.find(s => s.id === subcategoryId);
  const paramDefs = getParametersForCategory(categoryId);

  const results: EvaluatedParamResult[] = [];
  let totalEvaluated = 0;
  let compliantCount = 0;
  let transgresionCount = 0;
  let notEvaluableCount = 0;

  // Extract pH and Temp from sample inputs if not explicitly given in field measurements
  const effectiveContext = { ...fieldMeasurements };
  for (const [pId, item] of Object.entries(sampleInputs)) {
    if (pId.includes('ph') && typeof item.value === 'number') {
      effectiveContext.pH = item.value;
    } else if (pId.includes('ph') && typeof item.value === 'string' && !isNaN(parseFloat(item.value))) {
      effectiveContext.pH = parseFloat(item.value);
    }
    if (pId.includes('temperatura') && typeof item.value === 'number') {
      effectiveContext.temperature = item.value;
    } else if (pId.includes('temperatura') && typeof item.value === 'string' && !isNaN(parseFloat(item.value))) {
      effectiveContext.temperature = parseFloat(item.value);
    }
  }

  for (const pDef of paramDefs) {
    const inputData = sampleInputs[pDef.id];
    if (!inputData || inputData.value === '' || inputData.value === undefined) {
      continue; // Skip params not entered by user
    }

    const evalResult = evaluateParameter(
      pDef,
      subcategoryId,
      inputData.value,
      inputData.unit || pDef.defaultUnit,
      effectiveContext
    );

    results.push(evalResult);

    if (evalResult.status === 'CUMPLE') {
      compliantCount++;
      totalEvaluated++;
    } else if (evalResult.status === 'TRANSGREDE') {
      transgresionCount++;
      totalEvaluated++;
    } else {
      notEvaluableCount++;
    }
  }

  const overallStatus: 'GLOBAL_COMPLIANT' | 'GLOBAL_TRANSGRESSED' =
    transgresionCount > 0 ? 'GLOBAL_TRANSGRESSED' : 'GLOBAL_COMPLIANT';

  const compliancePercentage =
    totalEvaluated > 0 ? (compliantCount / totalEvaluated) * 100 : 100;

  return {
    evaluatedAt: new Date().toISOString(),
    categoryId,
    categoryName: categoryDef?.name || '',
    subcategoryId,
    subcategoryCode: subcategoryDef?.code || '',
    subcategoryName: subcategoryDef?.name || '',
    totalEvaluated,
    compliantCount,
    transgresionCount,
    noEvaluableCount: notEvaluableCount,
    overallStatus,
    compliancePercentage,
    results
  };
}
