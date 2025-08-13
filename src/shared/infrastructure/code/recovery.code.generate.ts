import { GenerateCodeStrategy } from "src/shared/interface/code/recovery.code";
import { RandomUtil } from "../../interface/random.util";
import { RecoveryCodeType } from "src/shared/interface/code/recovery.code";

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