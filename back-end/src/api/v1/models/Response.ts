/**
 * Interface representing a standard API response.
 * @template T - The type of the data property.
 */
interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: { message: string; code?: string };
    timestamp?: string;
}

/**
 * Creates a success response object.
 * @template T - The type of the data property.
 * @param {T} [data] - The data to include in the response.
 * @param {string} [message] - A message providing additional information about the response.
 * @returns {ApiResponse<T>} The success response object.
 */
export const successResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

/**
 * Creates a standardized error response object.
 * Ensures all API errors follow the same format.
 * @param message - The error message.
 * @param code - Optional error code for debugging.
 * @returns {ApiResponse<null>} An ApiResponse object with null data, containing the error details and a timestamp.
 */
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    error: { message, code },
    timestamp: new Date().toISOString(),
});
