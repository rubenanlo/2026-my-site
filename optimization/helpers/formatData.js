const formatNumber = (number, props) => {
  const {
    decimals = 1,
    thousands = true,
    locale = "en-US",
    exponential = false,
    percentage = false,
  } = props || {};

  // Format the number with specified decimals
  const formattedWithDecimals = number.toFixed(decimals);

  const isZero = [...formattedWithDecimals.replace(/[.-]/g, "")]
    .map(Number)
    .every((num) => num === 0);

  // If the formatted number is '0.00', return it in exponential notation
  if (isZero && exponential) return number.toExponential(decimals);

  if (isZero && exponential && percentage) return number * 100;

  if (percentage) return Number((number * 100).toFixed(decimals));

  // Otherwise, format with thousand separators if required
  if (thousands) {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: decimals,
    }).format(number);
  }

  // Return the number formatted with fixed decimals if thousands separator is not required
  return Number(formattedWithDecimals);
};

module.exports = formatNumber;
