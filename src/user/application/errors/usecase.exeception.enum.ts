
export const UseCaseErrorType = {
    NOT_FOUND: "NOT_FOUND",
    FORBIDDEN_ERROR: "FORBIDDEN_ERROR",
    BAD_REQUEST_ERROR: "BAD_REQUEST_ERROR",
    CONFLICT_ERROR: "CONFLICT_ERROR"
}

export type UseCaseErrorType = typeof UseCaseErrorType[keyof typeof UseCaseErrorType];