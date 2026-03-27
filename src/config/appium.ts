import { remote } from "webdriverio";
import type { Capabilities } from "@wdio/types";
import { ENV } from "./env";

export async function createDriver() {
  const opts: Capabilities.WebdriverIOConfig = {
    hostname: ENV.APPIUM_HOST,
    port: ENV.APPIUM_PORT,
    path: "/",
    connectionRetryTimeout: 180000, // 3 minutos - tiempo para crear sesión inicial
    connectionRetryCount: 3, // Reintentar 3 veces si falla
    capabilities: {
      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:udid": ENV.DEVICE_UDID,
      "appium:deviceName": ENV.DEVICE_UDID,

      "appium:appPackage": "es.indra.pc.mobile.activity.temm",
      "appium:appActivity": "es.indra.pc.mobile.activity.temm.LoginActivityTEMM",

      "appium:noReset": true,
      "appium:newCommandTimeout": 120,
      "appium:fullReset": false,

      "appium:uiautomator2ServerLaunchTimeout": 180000,
      "appium:uiautomator2ServerInstallTimeout": 180000,
      "appium:adbExecTimeout": 180000,

      "appium:ignoreUnimportantViews": true,
      "appium:disableWindowAnimation": true,
      "appium:skipServerInstallation": false,
      "appium:waitForIdleTimeout": 0,
    },
  };

  return remote(opts);
}
