import { ConfigPlugin } from "expo/config-plugins";
import { OpenWearablesIOSPluginProps } from "./withOpenWearablesIOS";
export type OpenWearablesPluginProps = OpenWearablesIOSPluginProps & {
    /**
     * Set false for an iOS-only rollout: skips the Health Connect manifest
     * changes. Pair it with excluding the module from Android autolinking
     * (`expo.autolinking.android.exclude`), or the SDK's AAR still merges
     * its Health Connect permissions into the manifest.
     */
    android?: boolean;
};
declare const withOpenWearables: ConfigPlugin<OpenWearablesPluginProps>;
export default withOpenWearables;
