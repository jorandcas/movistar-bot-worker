import "dotenv/config";

function mustGet(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Falta variable de entorno: ${name}`);
  return v.trim();
}

export const ENV = {
  // Worker Configuration
  WORKER_PORT: Number(process.env.WORKER_PORT || "3002"),
  WORKER_ID: (process.env.WORKER_ID || "bot-worker-1").trim(),

  // TEMM App Credentials
  TEMM_USER: mustGet("TEMM_USER"),
  TEMM_PASS: mustGet("TEMM_PASS"),
  DEVICE_UDID: mustGet("DEVICE_UDID"),
  APPIUM_HOST: (process.env.APPIUM_HOST || "127.0.0.1").trim(),
  APPIUM_PORT: Number(process.env.APPIUM_PORT || "4723"),

  // Search Parameters (passed via request)
  SEARCH_DN: "",
  ICC: "",
  LINEA_NIP: "",
  FVC_FECHA: "",

  // Personal Data (passed via request)
  DATOS_NOMBRE: "",
  DATOS_NOMBRE_SEGUNDO: "",
  DATOS_APELLIDO_PATERNO: "",
  DATOS_APELLIDO_MATERNO: "",
  DATOS_CURP: "",
  DATOS_TELEFONO: "",
  DATOS_TELEFONO_2: "",
  DATOS_GENERO: "Masculino",
  DATOS_EMAIL: "",
  DATOS_FECHA_NACIMIENTO: "",

  // Verbose mode
  VERBOSE: process.env.VERBOSE === "true",
} as const;

// Logging functions
export const log = {
  step: (msg: string) => console.log(`\n📍 ${msg}`),
  success: (msg: string) => console.log(`✅ ${msg}`),
  info: (msg: string) => {
    if (ENV.VERBOSE) console.log(`ℹ️  ${msg}`);
  },
  error: (msg: string) => console.error(`❌ ${msg}`),
  warn: (msg: string) => console.warn(`⚠️  ${msg}`),
};

// Update ENV from request data
export function updateEnvFromRequest(data: Record<string, any>): void {
  if (data.SEARCH_DN) ENV.SEARCH_DN = data.SEARCH_DN;
  if (data.ICC) ENV.ICC = data.ICC;
  if (data.FVC_FECHA) ENV.FVC_FECHA = data.FVC_FECHA;
  if (data.LINEA_NIP) ENV.LINEA_NIP = data.LINEA_NIP;
  if (data.DATOS_NOMBRE) ENV.DATOS_NOMBRE = data.DATOS_NOMBRE;
  if (data.DATOS_NOMBRE_SEGUNDO) ENV.DATOS_NOMBRE_SEGUNDO = data.DATOS_NOMBRE_SEGUNDO;
  if (data.DATOS_APELLIDO_PATERNO) ENV.DATOS_APELLIDO_PATERNO = data.DATOS_APELLIDO_PATERNO;
  if (data.DATOS_APELLIDO_MATERNO) ENV.DATOS_APELLIDO_MATERNO = data.DATOS_APELLIDO_MATERNO;
  if (data.DATOS_CURP) ENV.DATOS_CURP = data.DATOS_CURP;
  if (data.DATOS_TELEFONO) ENV.DATOS_TELEFONO = data.DATOS_TELEFONO;
  if (data.DATOS_TELEFONO_2) ENV.DATOS_TELEFONO_2 = data.DATOS_TELEFONO_2;
  if (data.DATOS_GENERO) ENV.DATOS_GENERO = data.DATOS_GENERO;
  if (data.DATOS_EMAIL) ENV.DATOS_EMAIL = data.DATOS_EMAIL;
  if (data.DATOS_FECHA_NACIMIENTO) ENV.DATOS_FECHA_NACIMIENTO = data.DATOS_FECHA_NACIMIENTO;
}
