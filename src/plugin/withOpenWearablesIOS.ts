import {
  ConfigPlugin,
  withEntitlementsPlist,
  withInfoPlist,
} from "expo/config-plugins";

export interface OpenWearablesIOSPluginProps {
  healthShareUsage?: string;
  /** The SDK only reads HealthKit, so this is written only when given. */
  healthUpdateUsage?: string;
}

/** Appends to a plist string array without dropping what other plugins set. */
function mergeStringArray(existing: unknown, additions: string[]): string[] {
  const current = Array.isArray(existing) ? (existing as string[]) : [];
  return [...current, ...additions.filter((v) => !current.includes(v))];
}

const withOpenWearablesIOS: ConfigPlugin<OpenWearablesIOSPluginProps> = (
  config,
  options = {}
) => {
  const {
    healthShareUsage = "Allow access to your health data.",
    healthUpdateUsage,
  } = options;

  // Add HealthKit entitlements
  config = withEntitlementsPlist(config, (config) => {
    config.modResults["com.apple.developer.healthkit"] = true;
    config.modResults["com.apple.developer.healthkit.background-delivery"] =
      true;
    return config;
  });

  // Add Info.plist usage descriptions & BGTask identifiers
  config = withInfoPlist(config, (config) => {
    config.modResults["NSHealthShareUsageDescription"] = healthShareUsage;
    if (healthUpdateUsage) {
      config.modResults["NSHealthUpdateUsageDescription"] = healthUpdateUsage;
    }

    // Merge, not replace: overwriting dropped modes like remote-notification
    // that other plugins (e.g. expo-notifications) had already set.
    config.modResults["UIBackgroundModes"] = mergeStringArray(
      config.modResults["UIBackgroundModes"],
      ["fetch", "processing"]
    );

    config.modResults["BGTaskSchedulerPermittedIdentifiers"] = mergeStringArray(
      config.modResults["BGTaskSchedulerPermittedIdentifiers"],
      [
        "com.openwearables.healthsdk.task.refresh",
        "com.openwearables.healthsdk.task.process",
      ]
    );

    return config;
  });

  return config;
};

export default withOpenWearablesIOS;
