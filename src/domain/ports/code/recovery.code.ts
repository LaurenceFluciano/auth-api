import { RecoveryCodeType } from "src/domain/util/recovery.code.generation";

export interface GenerateCodeStrategy {
  generate(): RecoveryCodeType
}
