import { EncryptStrategy } from "src/utils/interface/crypto/encrypt";
import { DomainException } from "../error/domain.exception";
import { DomainErrorType } from "../error/domain.exception.enum";

export class Password
{
    private readonly REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};:,.<>/?\\|~-])[A-Za-z\d!@#$%^&*()_+=\[\]{};:,.<>/?\\|~-]{8,}$/;
    private readonly ILLEGAL_CHARS_REGEX = /['"`´¨^~çãáàéèíìóòúùâêîôûÇÃÁÀÉÈÍÌÓÒÚÙÂÊÎÔÛ]|[^\x00-\x7F]/;

    constructor(
        private password: string,
    )
    {
        this.validate(password);
    }

    private validate(password: string): void
    {
        if (
            typeof password !== "string" ||
            password === undefined || 
            password.trim().length === 0 
        ) throw new DomainException("Password must to be defined and with valid type.",DomainErrorType.INVALID_VALUE);

        if (this.ILLEGAL_CHARS_REGEX.test(password)) 
            throw new DomainException("Invalid password characters.",DomainErrorType.INVALID_VALUE);

        if (!this.REGEX.test(password)) 
            throw new DomainException("Invalid password.",DomainErrorType.INVALID_VALUE);
    }

    public static match(password: Password, confirm: Password): void {
        if(password.getValue() !== confirm.getValue())
            throw new DomainException("The new password don't match with the new password.",DomainErrorType.INVALID_VALUE);
    }

    public async hashMatch(encryptStrategy: EncryptStrategy, hash: string): Promise<void>
    {
        const match = await encryptStrategy.compare(this.getValue(), hash);
        if(!match)
            throw new DomainException("Current password incorrect", DomainErrorType.FORBIDDEN_VALUE)
    }

    public async generateHash(encryptStrategy: EncryptStrategy): Promise<string>
    {
        return await encryptStrategy.hash(this.getValue())
    }

    public getValue(): string
    {
        return this.password;
    }
}