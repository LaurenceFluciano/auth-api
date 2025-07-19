import { RecoveryCodeType } from "../recovery.code.generation";

export interface GenerateCodeStrategy {
  generate(): RecoveryCodeType
}

export const GENERATE_CODE_STRATEGY = 'GENERATE_CODE_STRATEGY';