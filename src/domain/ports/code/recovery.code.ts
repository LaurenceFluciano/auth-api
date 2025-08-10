export type RecoveryCodeType = string;
export interface GenerateCodeStrategy {
  generate(): RecoveryCodeType
}
