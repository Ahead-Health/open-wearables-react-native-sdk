import { ConfigPlugin } from "expo/config-plugins";
export interface OpenWearablesIOSPluginProps {
    healthShareUsage?: string;
    /** The SDK only reads HealthKit, so this is written only when given. */
    healthUpdateUsage?: string;
}
declare const withOpenWearablesIOS: ConfigPlugin<OpenWearablesIOSPluginProps>;
export default withOpenWearablesIOS;
