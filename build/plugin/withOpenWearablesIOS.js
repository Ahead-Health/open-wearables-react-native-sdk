"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
/** Appends to a plist string array without dropping what other plugins set. */
function mergeStringArray(existing, additions) {
    const current = Array.isArray(existing) ? existing : [];
    return [...current, ...additions.filter((v) => !current.includes(v))];
}
const withOpenWearablesIOS = (config, options = {}) => {
    const { healthShareUsage = "Allow access to your health data.", healthUpdateUsage, } = options;
    // Add HealthKit entitlements
    config = (0, config_plugins_1.withEntitlementsPlist)(config, (config) => {
        config.modResults["com.apple.developer.healthkit"] = true;
        config.modResults["com.apple.developer.healthkit.background-delivery"] =
            true;
        return config;
    });
    // Add Info.plist usage descriptions & BGTask identifiers
    config = (0, config_plugins_1.withInfoPlist)(config, (config) => {
        config.modResults["NSHealthShareUsageDescription"] = healthShareUsage;
        if (healthUpdateUsage) {
            config.modResults["NSHealthUpdateUsageDescription"] = healthUpdateUsage;
        }
        // Merge, not replace: overwriting dropped modes like remote-notification
        // that other plugins (e.g. expo-notifications) had already set.
        config.modResults["UIBackgroundModes"] = mergeStringArray(config.modResults["UIBackgroundModes"], ["fetch", "processing"]);
        config.modResults["BGTaskSchedulerPermittedIdentifiers"] = mergeStringArray(config.modResults["BGTaskSchedulerPermittedIdentifiers"], [
            "com.openwearables.healthsdk.task.refresh",
            "com.openwearables.healthsdk.task.process",
        ]);
        return config;
    });
    return config;
};
exports.default = withOpenWearablesIOS;
