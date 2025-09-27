
export const DomainErrorType = {
    INVALID_VALUE: "INVALID_VALUE",
    FORBIDDEN_VALUE: "FORBIDDEN_VALUE"
}

export type DomainErrorType = typeof DomainErrorType[keyof typeof DomainErrorType];