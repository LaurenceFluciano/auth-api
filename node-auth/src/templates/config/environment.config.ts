import { ConfigError } from 'src/templates/context/error/others/config.error';

/**
 * @interface IEnvironmentConfig
 * @description Define o contrato para qualquer serviço de configuração
 * que o template irá utilizar (variáveis de ambiente, Vault, etc.).
 * Esta interface garante que o acesso à configuração seja agnóstico à fonte.
 */
export interface IEnvironmentConfig {
  /**
   * Obtém o valor de uma variável de ambiente ou configuração.
   * @param {string} key - A chave da configuração a ser buscada (ex: 'DB_CONN_STRING').
   * @returns {string} O valor da configuração.
   * @throws {ConfigError} Se a chave não for encontrada ou o valor for nulo/vazio.
   */
  getEnv(key: string): string;

  /**
   * Define um valor de ambiente para fins de teste ou inicialização em runtime.
   * (Pode ser opcional dependendo da sua necessidade).
   * @param {string} key - A chave a ser definida.
   * @param {string} value - O valor a ser atribuído.
   */
  setEnvironment(key: string, value: string);
}

/**
 * @abstract
 * @class StaticConfigEnv
 * @description Classe base que fornece acesso estático e centralizado
 * à instância de configuração (`IEnvironmentConfig`) em toda a aplicação.
 * Classes que herdam desta base têm acesso fácil à configuração do ambiente.
 */
export abstract class StaticConfigEnv {
  private static environmentConfig: IEnvironmentConfig;

  /**
   * Inicializa a instancia de environmentConfig.
   * @returns {IEnvironmentConfig} A instância concreta de configuração.
   * @throws {ConfigError} Se a configuração já tiver sido inicializada.
   */
  public static initialize(config: IEnvironmentConfig) {
    if (StaticConfigEnv.environmentConfig)
      throw new ConfigError('Configuração já inicializada.');
    StaticConfigEnv.environmentConfig = config;
  }

  /**
   * Obtém a instância única de IEnvironmentConfig.
   * É garantido que esta instância estará inicializada.
   * @returns {IEnvironmentConfig} A instância de configuração.
   * @throws {ConfigError} Se a configuração não tiver sido inicializada antes do uso.
   */
  public static getEnvironmentConfig(): IEnvironmentConfig {
    if (!StaticConfigEnv.environmentConfig)
      throw new ConfigError(
        'Configuração não inicializada. Chame StaticConfigEnv.initialize() primeiro.',
      );
    return StaticConfigEnv.environmentConfig;
  }
}
