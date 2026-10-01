export type OpenWearablesModuleEvents = {
    onLog: (params: LogEventPayload) => void;
    onAuthError: (params: AuthErrorEventPayload) => void;
};
export type LogEventPayload = {
    message: string;
};
export type AuthErrorEventPayload = {
    statusCode: number;
    message: string;
};
export declare enum OWLogLevel {
    None = 0,
    Always = 1,
    Debug = 2
}
export declare enum HealthDataType {
    Steps = "steps",
    DistanceWalkingRunning = "distanceWalkingRunning",
    DistanceCycling = "distanceCycling",
    FlightsClimbed = "flightsClimbed",
    WalkingSpeed = "walkingSpeed",
    WalkingStepLength = "walkingStepLength",
    WalkingAsymmetryPercentage = "walkingAsymmetryPercentage",
    WalkingDoubleSupportPercentage = "walkingDoubleSupportPercentage",
    SixMinuteWalkTestDistance = "sixMinuteWalkTestDistance",
    ActiveEnergy = "activeEnergy",
    BasalEnergy = "basalEnergy",
    HeartRate = "heartRate",
    RestingHeartRate = "restingHeartRate",
    HeartRateVariabilitySDNN = "heartRateVariabilitySDNN",
    Vo2Max = "vo2Max",
    OxygenSaturation = "oxygenSaturation",
    RespiratoryRate = "respiratoryRate",
    BodyMass = "bodyMass",
    Height = "height",
    Bmi = "bmi",
    BodyFatPercentage = "bodyFatPercentage",
    LeanBodyMass = "leanBodyMass",
    WaistCircumference = "waistCircumference",
    BodyTemperature = "bodyTemperature",
    BloodGlucose = "bloodGlucose",
    InsulinDelivery = "insulinDelivery",
    BloodPressureSystolic = "bloodPressureSystolic",
    BloodPressureDiastolic = "bloodPressureDiastolic",
    BloodPressure = "bloodPressure",
    Sleep = "sleep",
    MindfulSession = "mindfulSession",
    MenstrualFlow = "menstrualFlow",
    CervicalMucusQuality = "cervicalMucusQuality",
    OvulationTestResult = "ovulationTestResult",
    SexualActivity = "sexualActivity",
    DietaryEnergyConsumed = "dietaryEnergyConsumed",
    DietaryCarbohydrates = "dietaryCarbohydrates",
    DietaryProtein = "dietaryProtein",
    DietaryFatTotal = "dietaryFatTotal",
    DietaryWater = "dietaryWater",
    Workout = "workout",
    RestingEnergy = "restingEnergy",
    BloodOxygen = "bloodOxygen"
}
export type HealthDataProvider = {
    id: string;
    displayName: string;
    isAvailable: boolean;
};
export type StoredCredentials = {
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    apiKey: string | null;
    host: string | null;
    /** Always null on iOS — the native SDK exposes no accessor for it yet. */
    customSyncUrl: string | null;
    isSyncActive: boolean;
    /** `"apple"` on iOS; `"google"` or `"samsung"` on Android; null when none is selected. */
    provider: string | null;
};
export type SyncStatus = {
    hasResumableSession: boolean;
    sentCount: number;
    completedTypes: number;
    isFullExport: boolean;
    /** False while the initial full historical export is still pending or in progress. */
    initialExportDone: boolean;
    /** True while a sync round is currently in flight. */
    isSyncing: boolean;
    /** ISO8601 timestamp of the current sync session, or null when there is none. */
    createdAt: string | null;
};
