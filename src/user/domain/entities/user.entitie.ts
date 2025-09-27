import { Scope } from "../domain-types/Scope";
import { Email } from "../domain-types/Email";
import { Name } from "../domain-types/Name";
import { Password } from "../domain-types/Password";
import { ProjectKey } from "../domain-types/ProjectKey";
import { DomainException } from "../error/domain.exception";

export class UserEntity<Id> {
    private scopes: Set<Scope>;

    constructor(
        private projectKey: ProjectKey,
        private name: Name,
        private email: Email,
        scopes: Scope[],
        public active: boolean = true,
        private id?: Id, 
        private password?: Password,
        public createdAt?: Date,
        public updatedAt?: Date
    ){
        if (!Array.isArray(scopes) || scopes.length === 0) 
            throw new DomainException("Pelo menos um escopo é obrigatório.");

        this.scopes = new Set(scopes);
    }

    public getEmail(): string
    {
        return this.email.getValue();
    }

    public setEmail(email: string): this
    {
        this.email = new Email(email);
        return this;
    }

    public getUsername(): string
    {
        return this.name.getValue();
    }

    public setUsername(name: string): this
    {
        this.name = new Name(name);
        return this;
    }

    public getProjectKey(): string
    {
        return this.projectKey.getValue();
    }

    public setProjectKey(projectKey: string): this
    {
        this.projectKey = new ProjectKey(projectKey);
        return this;
    }

    public getScopes(): string[]
    {
        return Array.from(this.scopes).map(scope => scope.getValue());
    }

    public setScopes(scopes: string[]): this
    {
        scopes.forEach(scopeStr => this.scopes.add(new Scope(scopeStr)));
        return this;
    }

    public getId(): Id | undefined {
        return this.id
    }

    public setId(id: Id): this {
        this.id = id;
        return this;
    }

    public getPassword(): string | undefined {
        return this.password?.getValue()
    }

    public setPassword(password: string): this {
        this.password = new Password(password);
        return this;
    }

}
