// Just definition, I must implemented this
type Account = {
    accountName: string;
    accountScopes: string[];
    accessJti: string;
    refreshJti: string;
    primaryAccount: boolean;
    lastLogin?: string;
}

// Just definition, I must implemented this
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
