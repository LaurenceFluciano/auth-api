export class Users<ID> {
    constructor(
        public projectKey: string,
        public name: string,
        public email: string,
        public scopes: string[],
        public active: boolean = true,
        public id?: ID, 
        public password?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ){
        if (!projectKey) throw new Error("ProjectKey obrigatório.");
        if (!email.includes("@")) throw new Error("Email inválido.");
        if (!name || name.trim().length === 0) throw new Error("Nome de usuário inválido.");
        if (!Array.isArray(scopes) || scopes.length === 0) 
        {
            throw new Error("Pelo menos um escopo é obrigatório.");
        }
        if (password !== undefined && password.trim().length === 0) 
        {
            throw new Error("Senha do usuário inválido");
        }
    }
}

/* Regras de Negócios futuras
*
* if (!name || name.length < 3) throw new Error("Nome inválido.");
*
*/