export abstract class EncryptService
{
    static async  hash(password: string): Promise<string>
    {
        throw new Error("Ecrypt Service must to be fixed or implemeted")
    }

    static async compare(password: string, hashed: string): Promise<boolean> 
    {
        throw new Error("Ecrypt Service must to be fixed or implemeted")
    }
} 