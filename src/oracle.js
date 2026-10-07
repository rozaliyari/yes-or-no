export function getAnswer(random = Math.random) {
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError('Random value must be in [0, 1).');
  }
  return value < 0.5 ? 'yes' : 'no';
}

export const answers = {
  yes: { title: 'آره!', message: 'شاید این همون نشونه‌ایه که منتظرش بودی.' },
  no: { title: 'نه!', message: 'شاید یه مسیر قشنگ‌تر منتظرته.' },
};
