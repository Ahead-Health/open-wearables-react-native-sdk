import { NativeModule } from "expo";
import { HealthDataType, OpenWearablesModuleEvents, HealthDataProvider, OWLogLevel, StoredCredentials, SyncStatus } from "./OpenWearables.types";
declare class OpenWearablesModule extends NativeModule<OpenWearablesModuleEvents> {
    configure(host: string, customSyncURL?: string): void;
    signIn(userId: string, accessToken: string | null, refreshToken: string | null, apiKey: string | null): Promise<void>;
    signOut(): Promise<void>;
    updateTokens(accessToken: string, refreshToken: string | null): void;
    restoreSession(): string | null;
    isSessionValid(): boolean;
    requestAuthorization(types: HealthDataType[]): Promise<boolean>;
    setSyncInterval(minutes: number): void;
    startBackgroundSync(syncDaysBack: number | null): Promise<boolean>;
    stopBackgroundSync(): Promise<void>;
    isSyncActive(): boolean;
    getSyncStatus(): SyncStatus;
    resumeSync(): Promise<boolean>;
    resetAnchors(): void;
    getStoredCredentials(): StoredCredentials;
    getAvailableProviders(): HealthDataProvider[];
    setProvider(providerId: string): boolean;
    setLogLevel(logLevel: OWLogLevel): void;
    getLogLevel(): OWLogLevel;
}
declare const _default: OpenWearablesModule;
export default _default;
