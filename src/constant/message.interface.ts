export const Message = {
  // General
  INTERNAL_SERVER_ERROR: "We hit a snag on our side. Please try again.",
  SUCCESS: "Request completed successfully",
  CREATED: "Record created successfully",
  FETCHED: "Record fetched successfully",
  UPDATED: "Record updated successfully",
  DELETED: "Record removed successfully",
  NOT_FOUND: "Resource not found",
  HEALTH_OK: "recruiting-service-ok",

  // User
  USER_ALREADY_EXISTS: "A user with this email already exists",
  USER_NOT_FOUND: "User not found",
  USER_CREATED_SUCCESS: "User profile created successfully",
  USER_UPDATED_SUCCESS: "User profile updated successfully",
  USER_DELETED_SUCCESS: "User profile removed successfully",

  // Authentication
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
  LOGIN_SUCCESS: "Signed in successfully",
  UNAUTHORIZED: "Unauthorized request",
  FORBIDDEN: "Access denied",
  ACCESS_TOKEN_MISSING: "Session expired. Please sign in again",
  INVALID_TOKEN_PAYLOAD: "Invalid session token",
  INVALID_OR_EXPIRED_TOKEN: "Session invalid or expired. Please sign in again",
  FORBIDDEN_ROLE: "Access denied: insufficient role",
  RESET_EMAIL_SENT: "Password reset email sent",
  RESET_TOKEN_INVALID: "Reset token is invalid or expired",
  PASSWORD_RESET_SUCCESS: "Password reset successful",

  // Validation
  INVALID_REQUEST: "Invalid request data",
  MISSING_FIELDS: "Required fields are missing",
  CAPTCHA_REQUIRED: "Captcha token is required",
  CAPTCHA_FAILED: "Captcha verification failed",

  // Recruiting
  FLIGHT_BOOKing_SUCCESS: "Interview scheduled successfully",
  BOOKING_NOT_FOUND: "Interview not found",
  BOOKING_CANCELLED: "Interview has been cancelled",
  NEWSLETTER_SUBSCRIBED: "Subscribed to job alerts",
  NEWSLETTER_SENT: "Job alert sent"
};

Object.freeze(Message)
