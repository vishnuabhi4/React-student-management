// Form validation utilities
export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.name.trim()) {
    errors.name = 'Full name is required';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return errors;
};