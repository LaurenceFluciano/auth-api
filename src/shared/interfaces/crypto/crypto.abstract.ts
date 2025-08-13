import { EncryptStrategy } from "./encrypt"

export abstract class EncryptService implements EncryptStrategy
{
    async  hash(password: string): Promise<string>
    {
        throw new Error("Ecrypt Service must to be fixed or implemeted")
    }

    async compare(password: string, hashed: string): Promise<boolean> 
    {
        throw new Error("Ecrypt Service must to be fixed or implemeted")
    }
} 