export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone); // Change format based on country
};

export const validateRequired = (fields, body) => {
  const missing = [];

  fields.forEach((field) => {
    if (!body[field]) {
      missing.push(field);
    }
  });

  return missing;
};
