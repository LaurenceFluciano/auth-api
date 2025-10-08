import { ConfigError } from '../context/error/others/config.error';
import { IEnvironmentConfig } from './environment.config';
import dotenv from 'dotenv';
dotenv.config();

export class DotEnvEnvironmentConfig implements IEnvironmentConfig {
  private vars: Record<string, string> = {};

  getEnv(key: string): string {
    if (!this.vars[key]) throw new ConfigError(`Key: ${key} is not defined.`);
    return this.vars[key];
  }

  getManyEnv(...keys: string[]): string[] {
    return keys.map((key) => this.getEnv(key));
  }

  setEnvironment(envName: string, alias?: string) {
    if (!alias) alias = envName;
    const result = process.env[envName];
    if (!result) throw new ConfigError(`Not defined ${envName} var.`);
    this.vars[alias] = result;
  }
}
