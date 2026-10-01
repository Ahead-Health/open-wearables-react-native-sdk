import { ConfigPlugin } from "expo/config-plugins";
import withOpenWearablesIOS, {
  OpenWearablesIOSPluginProps,
} from "./withOpenWearablesIOS";
import withOpenWearablesAndroid from "./withOpenWearablesAndroid";

export type OpenWearablesPluginProps = OpenWearablesIOSPluginProps & {
  /**
   * Set false for an iOS-only rollout: skips the Health Connect manifest
   * changes. Pair it with excluding the module from Android autolinking
   * (`expo.autolinking.android.exclude`), or the SDK's AAR still merges
   * its Health Connect permissions into the manifest.
   */
  android?: boolean;
};

const withOpenWearables: ConfigPlugin<OpenWearablesPluginProps> = (
  config,
  options = {}
) => {
  const { android = true, ...iosOptions } = options;
  config = withOpenWearablesIOS(config, iosOptions);
  if (android) {
    config = withOpenWearablesAndroid(config);
  }
  return config;
};

export default withOpenWearables;
