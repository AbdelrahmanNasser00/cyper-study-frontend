/**
 * Centralized error handling utility for API errors
 * This provides consistent error handling across the application
 */

/**
 * Handle API errors and apply appropriate form errors
 * @param {Object} error - The error object from RTK Query
 * @param {Function} setError - The setError function from react-hook-form
 * @param {Object} schema - The validation schema for the form
 * @returns {string} A general error message
 */
export const handleApiError = (error, setError, schema) => {
  let errorMessage = "An unexpected error occurred. Please try again later.";
  if (!error) {
    return errorMessage;
  }

  switch (error.status) {
    case 400: // Bad Request - Validation errors
      handleValidationErrors(error, setError, schema);
      errorMessage = "Please check the form for errors and try again.";
      break;

    case 401: // Unauthorized
      errorMessage = "Authentication failed. Please log in again.";
      break;

    case 403: // Forbidden
      errorMessage = "You don't have permission to perform this action.";
      break;

    case 404: // Not Found
      errorMessage = "The requested resource was not found.";
      break;

    case 409: // Conflict (e.g., email already exists)
      if (error.data?.field === "email") {
        setError("email", {
          type: "manual",
          message:
            "This email is already registered. Please use a different email or login.",
        });
        errorMessage = "This email is already registered.";
      } else {
        errorMessage =
          error.data?.message || "A conflict occurred with your request.";
      }
      break;

    case 422: // Unprocessable Entity (validation errors)
      handleValidationErrors(error, setError, schema);
      errorMessage = "Please check the form for errors and try again.";
      break;

    case 429: // Too Many Requests
      errorMessage = "Too many requests. Please try again later.";
      break;

    case 500: // Server Error
    case 502: // Bad Gateway
    case 503: // Service Unavailable
      errorMessage = "Server error. Please try again later.";
      break;

    default:
      // Try to get a meaningful error message from the response
      errorMessage = error.data?.message || errorMessage;
  }

  return errorMessage;
};

/**
 * Handle validation errors from the backend
 * @param {Object} error - The error object from RTK Query
 * @param {Function} setError - The setError function from react-hook-form
 * @param {Object} schema - The validation schema for the form
 */
const handleValidationErrors = (error, setError, schema) => {
  const fieldErrors = error.data?.errors || error.data?.fieldErrors || {};

  Object.keys(fieldErrors).forEach((field) => {
    if (schema && schema.fields && field in schema.fields) {
      setError(field, {
        type: "manual",
        message: Array.isArray(fieldErrors[field])
          ? fieldErrors[field][0]
          : fieldErrors[field],
      });
    }
  });
};

/**
 * Log errors to the console in development and potentially to a service in production
 * @param {Object} error - The error object
 * @param {string} context - The context where the error occurred
 */
export const logError = (error, context = "API Error") => {
  if (import.meta.env.VITE_APP_ENV !== "production") {
    console.error(`[${context}]`, error);
  } else {
    // TODO: In production, you might want to log to a service like Sentry
    // Sentry.captureException(error);
  }
};
