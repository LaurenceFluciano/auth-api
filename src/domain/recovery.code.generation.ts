import { GenerateCodeStrategy } from "src/domain/ports/recovery.code.strategy";
import { RandomUtil } from "./random";

export type RecoveryCodeType = string;
const SIZE_CODE_FIELD = 6;
const MIN_CODE = 100000;
const MAX_CODE = 999999;

export class GenerateCode implements GenerateCodeStrategy {
    generate(): RecoveryCodeType {
        const code = RandomUtil.getRandomInt(MIN_CODE,MAX_CODE).toString();
        
        if(code.length !== SIZE_CODE_FIELD)
        {
            throw new Error("[DOMAIN] Error to generate recovery code!")
        }

        return code;
    }
}