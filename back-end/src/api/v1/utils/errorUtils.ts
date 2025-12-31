/**
 * Extracts the error message from unknown error types
 * @param error - The error object
 * @returns The error message as a string
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

    return String(error);
};

/**
 * Extracts error code from Firebase or other errors
 * @param error - The error object
 * @returns The error code as a string
 */
type ErrorWithCode = Error & { code?: string };

const hasErrorCode = (error: unknown): error is ErrorWithCode => {
    if (!(error instanceof Error)) {
        return false;
    }

    return "code" in error && typeof (error as { code?: unknown }).code === "string";
};

export const getErrorCode = (error: unknown): string => {
    if (hasErrorCode(error)) {
        return error.code ?? "UNKNOWN_ERROR";
    }

    return "UNKNOWN_ERROR";
};
