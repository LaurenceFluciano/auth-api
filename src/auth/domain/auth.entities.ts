type Account = {
    accountName: string;
    accountScopes: string[];
    accessJti: string;
    refreshJti: string;
    primaryAccount: boolean;
    lastLogin?: string;
}

type Device = {
    accounts: string[] | Account[];
    lastLogin?: string;
}

export type SimpleDevice = Record<string, {
    accessJti: string;
    refreshJti: string;
    primaryAccount?: boolean;
    scopes?: string[];
    lastLogin?: string;
}>
