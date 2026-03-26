import type { Browser } from "webdriverio";
import { log } from "../config/env";
import { DEFAULT_RETRY_CONFIG, TIMEOUTS } from "../config/timeouts";

/**
 * Configuración para reintentos con backoff exponencial
 */
export interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  timeout?: number;
}

/**
 * Opciones para waitForWithRetry
 */
export interface WaitForOptions {
  timeout?: number;
  reverse?: boolean;
  timeoutMsg?: string;
  interval?: number;
}

/**
 * Calcula delay con backoff exponencial
 */
function calculateDelay(attempt: number, config: RetryConfig): number {
  const delay = Math.min(
    config.initialDelay * Math.pow(config.backoffMultiplier, attempt),
    config.maxDelay
  );
  return delay;
}

/**
 * Espera con reintentos y backoff exponencial
 */
export async function waitForWithRetry(
  driver: Browser,
  selector: string,
  options: WaitForOptions = {},
  retryConfig: Partial<RetryConfig> = {}
): Promise<ReturnType<Browser["$"]>> {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  const lastError = new Error();

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      log.info(`Intento ${attempt + 1}/${config.maxRetries + 1} para elemento: ${selector.substring(0, 50)}...`);

      const element = await driver.$(selector);

      const waitOptions = {
        timeout: options.timeout || config.timeout,
        timeoutMsg: options.timeoutMsg,
        reverse: options.reverse,
        interval: options.interval || TIMEOUTS.INTERVALS.STABILITY_CHECK,
      };

      await element.waitForDisplayed(waitOptions);
      log.info(`✓ Elemento encontrado`);
      return element;

    } catch (error) {
      lastError.message = (error as Error).message;
      log.warn(`✗ Intento ${attempt + 1} fallido: ${(error as Error).message.substring(0, 100)}`);

      if (attempt < config.maxRetries) {
        const delay = calculateDelay(attempt, config);
        log.info(`Esperando ${delay}ms antes del siguiente intento...`);
        await driver.pause(delay);
      }
    }
  }

  throw new Error(
    `Elemento no encontrado después de ${config.maxRetries + 1} intentos: ${selector}\n` +
    `Último error: ${lastError.message}`
  );
}

/**
 * Ejecuta una acción con reintentos
 */
export async function executeWithRetry<T>(
  action: () => Promise<T>,
  actionName: string,
  retryConfig: Partial<RetryConfig> = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  const lastError = new Error();

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      log.info(`Ejecutando '${actionName}' - Intento ${attempt + 1}/${config.maxRetries + 1}`);
      const result = await action();
      log.info(`✓ '${actionName}' completado exitosamente`);
      return result;

    } catch (error) {
      lastError.message = (error as Error).message;
      log.warn(`✗ '${actionName}' falló: ${(error as Error).message.substring(0, 100)}`);

      if (attempt < config.maxRetries) {
        const delay = calculateDelay(attempt, config);
        log.info(`Esperando ${delay}ms antes de reintentar...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(
    `'${actionName}' falló después de ${config.maxRetries + 1} intentos.\n` +
    `Último error: ${lastError.message}`
  );
}

/**
 * Espera dinámica con timeout jerárquico
 */
export async function waitForElementSmart(
  driver: Browser,
  selector: string,
  isColdStart: boolean = false,
  options: WaitForOptions = {}
): Promise<ReturnType<Browser["$"]>> {
  const timeout = isColdStart ? TIMEOUTS.WAITS.STABILITY : TIMEOUTS.WAITS.LONG;

  return waitForWithRetry(
    driver,
    selector,
    { ...options, timeout },
    { maxRetries: isColdStart ? 4 : 2 }
  );
}

/**
 * Espera a que un elemento desaparezca
 */
export async function waitForElementToDisappear(
  driver: Browser,
  selector: string,
  timeout: number = TIMEOUTS.WAITS.LONG,
  elementName: string = "elemento"
): Promise<void> {
  try {
    await driver.waitUntil(async () => {
      const element = await driver.$(selector);
      const isDisplayed = await element.isDisplayed().catch(() => false);
      return !isDisplayed;
    }, {
      timeout,
      timeoutMsg: `${elementName} no desapareció después de ${timeout}ms`
    });
    log.info(`${elementName} desapareció correctamente`);
  } catch (error) {
    throw new Error(`Error esperando que ${elementName} desaparezca: ${(error as Error).message}`);
  }
}

/**
 * Click seguro con reintentos
 */
export async function safeClick(
  driver: Browser,
  selector: string,
  elementName: string = "elemento",
  options: WaitForOptions = {}
): Promise<void> {
  await executeWithRetry(async () => {
    const element = await waitForWithRetry(driver, selector, options);
    await element.click();
    log.info(`Click en '${elementName}' realizado`);
  }, `click en ${elementName}`);
}

/**
 * SetValue seguro con reintentos
 */
export async function safeSetValue(
  driver: Browser,
  selector: string,
  value: string,
  elementName: string = "campo",
  options: WaitForOptions = {}
): Promise<void> {
  await executeWithRetry(async () => {
    const element = await waitForWithRetry(driver, selector, options);
    await element.clearValue();
    await driver.pause(TIMEOUTS.PAUSES.INSTANT);

    await element.addValue(value);
    log.info(`Valor establecido en '${elementName}': ${value}`);
  }, `setValue en ${elementName}`);
}

/**
 * Calcula la fecha FVC dinámicamente según la hora actual
 */
export function calculateFVCDate(): string {
  const now = new Date();
  const hour = now.getHours();

  let daysToAdd: number;
  if (hour < 17) {
    daysToAdd = 1;
    log.info(`Hora actual: ${hour}:00 - Antes de las 17:00, usando día siguiente (+1)`);
  } else {
    daysToAdd = 2;
    log.info(`Hora actual: ${hour}:00 - Después de las 17:00, usando 48 horas (+2 días)`);
  }

  const futureDate = new Date(now);
  futureDate.setDate(now.getDate() + daysToAdd);

  const day = String(futureDate.getDate()).padStart(2, '0');
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const year = futureDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  log.success(`✓ Fecha FVC calculada: ${formattedDate} (${daysToAdd} días a partir de hoy)`);

  return formattedDate;
}

/**
 * Espera a que la pantalla esté estable (sin loading spinners)
 */
export async function waitForScreenStable(
  driver: Browser,
  stabilityTimeout: number = TIMEOUTS.PAUSES.STABILITY,
  checkInterval: number = TIMEOUTS.INTERVALS.STABILITY_CHECK,
  maxWaitTime: number = TIMEOUTS.WAITS.STABILITY
): Promise<void> {
  const startTime = Date.now();
  let lastStableTime = Date.now();
  let stableCount = 0;

  log.info("Esperando que la pantalla se estabilice...");

  while (Date.now() - startTime < maxWaitTime) {
    try {
      const currentTime = Date.now();
      if (currentTime - lastStableTime >= stabilityTimeout) {
        stableCount++;
        if (stableCount >= 2) {
          log.info("✓ Pantalla estable");
          return;
        }
      }

      await driver.pause(checkInterval);
    } catch (error) {
      lastStableTime = Date.now();
      stableCount = 0;
    }
  }

  log.warn("Timeout esperando estabilidad, continuando...");
}
