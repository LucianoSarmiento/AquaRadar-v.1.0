import { ParameterDefinition, WaterCategoryId } from '../types';
import { PARAMETERS_CAT1 } from './parametersCat1';
import { PARAMETERS_CAT2 } from './parametersCat2';
import { PARAMETERS_CAT3 } from './parametersCat3';
import { PARAMETERS_CAT4 } from './parametersCat4';

export const ALL_PARAMETERS: Record<WaterCategoryId, ParameterDefinition[]> = {
  '': [],
  CAT1: PARAMETERS_CAT1,
  CAT2: PARAMETERS_CAT2,
  CAT3: PARAMETERS_CAT3,
  CAT4: PARAMETERS_CAT4,
  cat1: PARAMETERS_CAT1,
  cat2: PARAMETERS_CAT2,
  cat3: PARAMETERS_CAT3,
  cat4: PARAMETERS_CAT4,
};

export function getParametersForCategory(categoryId: WaterCategoryId): ParameterDefinition[] {
  if (!categoryId) return [];
  const normalizedKey = categoryId.toUpperCase() as WaterCategoryId;
  return ALL_PARAMETERS[normalizedKey] || ALL_PARAMETERS[categoryId] || [];
}

export function getAllParametersFlat(): ParameterDefinition[] {
  return [
    ...PARAMETERS_CAT1,
    ...PARAMETERS_CAT2,
    ...PARAMETERS_CAT3,
    ...PARAMETERS_CAT4,
  ];
}
