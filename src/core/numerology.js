// src/core/numerology.js

export function reduceToSingleDigit(n) {
  n = Math.abs(Number(n) || 0);
  while (n > 9) {
    let sum = 0;
    for (const digit of String(n)) {
      sum += Number(digit);
    }
    n = sum;
  }
  return n;
}

/**
 * dobString is expected as "YYYY-MM-DD"
 */
export function parseDob(dobString) {
  if (!dobString) return { day: null, month: null, year: null };

  const [yearStr, monthStr, dayStr] = dobString.split("-");
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (!day || !month || !year) {
    return { day: null, month: null, year: null };
  }

  return { day, month, year };
}

// Mulyank = sum of digits of day -> single digit
export function calculateMulyank(day) {
  if (!day) return null;
  return reduceToSingleDigit(day);
}

// Jeevank = sum of digits of day + month -> single digit
export function calculateJeevank(day, month) {
  if (!day || !month) return null;

  const digits = String(day) + String(month);
  let sum = 0;
  for (const d of digits) {
    sum += Number(d);
  }
  return reduceToSingleDigit(sum);
}

// Bhagyank = sum of all digits of DDMMYYYY -> single digit
export function calculateBhagyank(day, month, year) {
  if (!day || !month || !year) return null;

  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yyyy = String(year).padStart(4, "0");

  const allDigits = dd + mm + yyyy;
  let sum = 0;
  for (const d of allDigits) {
    sum += Number(d);
  }
  return reduceToSingleDigit(sum);
}

// Namank (name number)

const LETTER_TO_NUMBER = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

function normalizeName(name) {
  if (!name) return "";
  return name.toUpperCase().replace(/[^A-Z]/g, "");
}

export function calculateNamank(name) {
  const normalized = normalizeName(name);
  if (!normalized) return null;

  let sum = 0;
  for (const ch of normalized) {
    const val = LETTER_TO_NUMBER[ch];
    if (val) sum += val;
  }
  return reduceToSingleDigit(sum);
}

// Rashi (simple mapping using sun sign dates)
export function calculateRashi(day, month) {
  if (!day || !month) return null;

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Makar";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Kumbh";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Meena";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Mesha";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Vrishabha";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Mithuna";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Karka";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Simha";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Kanya";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Tula";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Vrishchik";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Dhanu";

  return null;
}

// Aggregator: calculate all core numbers
export function calculateAllNumbers(name, dobString) {
  const { day, month, year } = parseDob(dobString);

  if (!day || !month || !year) {
    return null;
  }

  const mulyank = calculateMulyank(day);
  const jeevank = calculateJeevank(day, month);
  const bhagyank = calculateBhagyank(day, month, year);
  const namank = calculateNamank(name);
  const rashi = calculateRashi(day, month);

  return {
    core: {
      mulyank,
      jeevank,
      bhagyank,
      namank,
      rashi,
      rawDay: day,
      rawMonth: month,
      rawYear: year
    }
  };
}
