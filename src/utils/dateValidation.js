export const validateDates = (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    return "Both dates are required";
  }

  // Normalize dates to remove time component for comparison
  const d1 = new Date(fromDate);
  const d2 = new Date(toDate);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  if (d1.getTime() >= d2.getTime()) {
    return "StartDate should be less than End Date";
  }

  return "";
};
