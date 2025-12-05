'use client';

// A unique symbol to identify our custom error type
export const FIRESTORE_PERMISSION_ERROR_TYPE = Symbol.for(
  'firebase.permission-error'
);

/**
 * Represents the context of a Firestore security rule denial.
 * This information helps in debugging and understanding why a request was blocked.
 */
export type SecurityRuleContext = {
  // The full path to the document or collection being accessed (e.g., 'users/userId/posts/postId').
  path: string;
  // The type of operation that was denied.
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  // The data that the client attempted to write to Firestore (for create/update operations).
  requestResourceData?: any;
};

/**
 * A custom error class for Firestore permission errors.
 * It extends the standard Error class with additional context about the failed operation.
 */
export class FirestorePermissionError extends Error {
  public readonly type = FIRESTORE_PERMISSION_ERROR_TYPE;
  public readonly context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `Firestore Permission Denied: Insufficient permissions for '${context.operation}' on '${context.path}'.`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;

    // This ensures the stack trace is captured correctly
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  /**
   * Converts the error context into a JSON string for display or logging.
   */
  public toJSON() {
    return {
      message: this.message,
      name: this.name,
      context: this.context,
    };
  }
}
