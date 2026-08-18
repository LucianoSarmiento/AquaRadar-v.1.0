/**
 * Tablas Oficiales de Amoniaco Total según D.S. N° 004-2017-MINAM
 * Tabla N° 1: Agua Dulce (Página 17)
 * Tabla N° 2: Agua de Mar y Estuarios (Página 19)
 */

// TABLA 1: Agua Dulce (mg/L NH3)
export const AMMONIA_TABLE_1_TEMPS = [0, 5, 10, 15, 20, 25, 30];
export const AMMONIA_TABLE_1_PHS = [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 10.0];

export const AMMONIA_TABLE_1_DATA: Record<number, Record<number, number>> = {
  0: { 6.0: 231, 6.5: 73.0, 7.0: 23.1, 7.5: 7.32, 8.0: 2.33, 8.5: 0.749, 9.0: 0.250, 10.0: 0.042 },
  5: { 6.0: 153, 6.5: 48.3, 7.0: 15.3, 7.5: 4.84, 8.0: 1.54, 8.5: 0.502, 9.0: 0.172, 10.0: 0.034 },
  10: { 6.0: 102, 6.5: 32.4, 7.0: 10.3, 7.5: 3.26, 8.0: 1.04, 8.5: 0.343, 9.0: 0.121, 10.0: 0.029 },
  15: { 6.0: 69.7, 6.5: 22.0, 7.0: 6.98, 7.5: 2.22, 8.0: 0.715, 8.5: 0.239, 9.0: 0.089, 10.0: 0.026 },
  20: { 6.0: 48.0, 6.5: 15.2, 7.0: 4.82, 7.5: 1.54, 8.0: 0.499, 8.5: 0.171, 9.0: 0.067, 10.0: 0.024 },
  25: { 6.0: 33.5, 6.5: 10.6, 7.0: 3.37, 7.5: 1.08, 8.0: 0.354, 8.5: 0.125, 9.0: 0.053, 10.0: 0.022 },
  30: { 6.0: 23.7, 6.5: 7.50, 7.0: 2.39, 7.5: 0.767, 8.0: 0.256, 8.5: 0.094, 9.0: 0.043, 10.0: 0.021 },
};

/**
 * Función para obtener el límite ECA de Amoniaco Total en Agua Dulce (Tabla 1)
 * Regla oficial: Temperatura y pH próximo superior
 */
export function getAmmoniaTable1Limit(temp: number, ph: number): { limit: number; usedTemp: number; usedPh: number } {
  // Find next higher or equal temp in AMMONIA_TABLE_1_TEMPS
  const usedTemp = AMMONIA_TABLE_1_TEMPS.find(t => t >= temp) ?? AMMONIA_TABLE_1_TEMPS[AMMONIA_TABLE_1_TEMPS.length - 1];
  // Find next higher or equal ph in AMMONIA_TABLE_1_PHS
  const usedPh = AMMONIA_TABLE_1_PHS.find(p => p >= ph) ?? AMMONIA_TABLE_1_PHS[AMMONIA_TABLE_1_PHS.length - 1];

  const limit = AMMONIA_TABLE_1_DATA[usedTemp][usedPh];
  return { limit, usedTemp, usedPh };
}

export function getAmmoniaLimitTable1(temp: number, ph: number): number | null {
  try {
    const res = getAmmoniaTable1Limit(temp, ph);
    return res.limit;
  } catch {
    return null;
  }
}

// TABLA 2: Agua de Mar y Estuarios (mg/L NH3)
export const AMMONIA_TABLE_2_SALINITIES = [10, 20, 30];
export const AMMONIA_TABLE_2_TEMPS = [0, 5, 10, 15, 20, 25, 30, 35];
export const AMMONIA_TABLE_2_PHS = [7.0, 7.2, 7.4, 7.6, 7.8, 8.0, 8.2, 8.4, 8.6, 8.8, 9.0];

export const AMMONIA_TABLE_2_DATA: Record<number, Record<number, Record<number, number>>> = {
  10: {
    7.0: { 0: 41.00, 5: 29.00, 10: 20.00, 15: 14.00, 20: 9.40, 25: 6.60, 30: 4.40, 35: 3.10 },
    7.2: { 0: 26.00, 5: 18.00, 10: 12.00, 15: 8.70, 20: 5.90, 25: 4.10, 30: 2.80, 35: 2.00 },
    7.4: { 0: 17.00, 5: 12.00, 10: 7.80, 15: 5.30, 20: 3.70, 25: 2.60, 30: 1.80, 35: 1.20 },
    7.6: { 0: 10.00, 5: 7.20, 10: 5.00, 15: 3.40, 20: 2.40, 25: 1.70, 30: 1.20, 35: 0.84 },
    7.8: { 0: 6.60, 5: 4.70, 10: 3.10, 15: 2.20, 20: 1.50, 25: 1.10, 30: 0.75, 35: 0.53 },
    8.0: { 0: 4.10, 5: 2.90, 10: 2.00, 15: 1.40, 20: 0.97, 25: 0.69, 30: 0.47, 35: 0.34 },
    8.2: { 0: 2.70, 5: 1.80, 10: 1.30, 15: 0.87, 20: 0.62, 25: 0.44, 30: 0.31, 35: 0.23 },
    8.4: { 0: 1.70, 5: 1.20, 10: 0.81, 15: 0.56, 20: 0.41, 25: 0.29, 30: 0.21, 35: 0.16 },
    8.6: { 0: 1.10, 5: 0.75, 10: 0.53, 15: 0.37, 20: 0.27, 25: 0.20, 30: 0.15, 35: 0.11 },
    8.8: { 0: 0.69, 5: 0.50, 10: 0.34, 15: 0.25, 20: 0.18, 25: 0.14, 30: 0.11, 35: 0.08 },
    9.0: { 0: 0.44, 5: 0.31, 10: 0.23, 15: 0.17, 20: 0.13, 25: 0.10, 30: 0.08, 35: 0.07 },
  },
  20: {
    7.0: { 0: 44.00, 5: 30.00, 10: 21.00, 15: 14.00, 20: 9.70, 25: 6.60, 30: 4.70, 35: 3.10 },
    7.2: { 0: 27.00, 5: 19.00, 10: 13.00, 15: 9.00, 20: 6.20, 25: 4.40, 30: 3.00, 35: 2.10 },
    7.4: { 0: 18.00, 5: 12.00, 10: 8.10, 15: 5.60, 20: 4.10, 25: 2.70, 30: 1.90, 35: 1.30 },
    7.6: { 0: 11.00, 5: 7.50, 10: 5.30, 15: 3.40, 20: 2.50, 25: 1.70, 30: 1.20, 35: 0.84 },
    7.8: { 0: 6.90, 5: 4.70, 10: 3.40, 15: 2.30, 20: 1.60, 25: 1.10, 30: 0.78, 35: 0.53 },
    8.0: { 0: 4.40, 5: 3.00, 10: 2.10, 15: 1.50, 20: 1.00, 25: 0.72, 30: 0.50, 35: 0.34 },
    8.2: { 0: 2.80, 5: 1.90, 10: 1.30, 15: 0.94, 20: 0.66, 25: 0.47, 30: 0.31, 35: 0.24 },
    8.4: { 0: 1.80, 5: 1.20, 10: 0.84, 15: 0.59, 20: 0.44, 25: 0.30, 30: 0.22, 35: 0.16 },
    8.6: { 0: 1.10, 5: 0.78, 10: 0.56, 15: 0.41, 20: 0.28, 25: 0.20, 30: 0.15, 35: 0.12 },
    8.8: { 0: 0.72, 5: 0.50, 10: 0.37, 15: 0.26, 20: 0.19, 25: 0.14, 30: 0.11, 35: 0.08 },
    9.0: { 0: 0.47, 5: 0.34, 10: 0.24, 15: 0.18, 20: 0.13, 25: 0.10, 30: 0.08, 35: 0.07 },
  },
  30: {
    7.0: { 0: 47.00, 5: 31.00, 10: 22.00, 15: 15.00, 20: 11.00, 25: 7.20, 30: 5.00, 35: 3.40 },
    7.2: { 0: 29.00, 5: 20.00, 10: 14.00, 15: 9.70, 20: 6.60, 25: 4.70, 30: 3.10, 35: 2.20 },
    7.4: { 0: 19.00, 5: 13.00, 10: 8.70, 15: 5.90, 20: 4.10, 25: 2.90, 30: 2.00, 35: 1.40 },
    7.6: { 0: 12.00, 5: 8.10, 10: 5.60, 15: 3.70, 20: 3.10, 25: 1.80, 30: 1.30, 35: 0.90 },
    7.8: { 0: 7.50, 5: 5.00, 10: 3.40, 15: 2.40, 20: 1.70, 25: 1.20, 30: 0.81, 35: 0.56 },
    8.0: { 0: 4.70, 5: 3.10, 10: 2.20, 15: 1.60, 20: 1.10, 25: 0.75, 30: 0.53, 35: 0.37 },
    8.2: { 0: 3.00, 5: 2.10, 10: 1.40, 15: 1.00, 20: 0.69, 25: 0.50, 30: 0.34, 35: 0.25 },
    8.4: { 0: 1.90, 5: 1.30, 10: 0.90, 15: 0.62, 20: 0.44, 25: 0.31, 30: 0.23, 35: 0.17 },
    8.6: { 0: 1.20, 5: 0.84, 10: 0.59, 15: 0.41, 20: 0.30, 25: 0.22, 30: 0.16, 35: 0.12 },
    8.8: { 0: 0.78, 5: 0.53, 10: 0.37, 15: 0.27, 20: 0.20, 25: 0.15, 30: 0.11, 35: 0.09 },
    9.0: { 0: 0.50, 5: 0.34, 10: 0.26, 15: 0.19, 20: 0.14, 25: 0.11, 30: 0.08, 35: 0.07 },
  }
};

/**
 * Función para obtener el límite ECA de Amoniaco Total en Agua de Mar y Estuarios (Tabla 2)
 * Regla oficial:
 * - Salinidad: próxima inferior (30, 20 o 10 g/kg)
 * - Temperatura y pH: próximo superior
 */
export function getAmmoniaTable2Limit(salinity: number, temp: number, ph: number): { limit: number; usedSalinity: number; usedTemp: number; usedPh: number } {
  // Find next lower salinity: 30 if >=30, 20 if >=20 and <30, 10 if <20
  let usedSalinity = 10;
  if (salinity >= 30) usedSalinity = 30;
  else if (salinity >= 20) usedSalinity = 20;
  else usedSalinity = 10;

  const usedTemp = AMMONIA_TABLE_2_TEMPS.find(t => t >= temp) ?? AMMONIA_TABLE_2_TEMPS[AMMONIA_TABLE_2_TEMPS.length - 1];
  const usedPh = AMMONIA_TABLE_2_PHS.find(p => p >= ph) ?? AMMONIA_TABLE_2_PHS[AMMONIA_TABLE_2_PHS.length - 1];

  const limit = AMMONIA_TABLE_2_DATA[usedSalinity][usedPh][usedTemp];
  return { limit, usedSalinity, usedTemp, usedPh };
}

export function getAmmoniaLimitTable2(temp: number, ph: number, salinity: number = 30): number | null {
  try {
    const res = getAmmoniaTable2Limit(salinity, temp, ph);
    return res.limit;
  } catch {
    return null;
  }
}
