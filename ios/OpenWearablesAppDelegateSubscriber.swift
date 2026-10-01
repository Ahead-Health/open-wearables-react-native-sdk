import ExpoModulesCore
import OpenWearablesHealthSDK
import UIKit

public class OpenWearablesAppDelegateSubscriber: ExpoAppDelegateSubscriber {
    /// The iOS SDK's background upload session (`bgSessionId`, internal there).
    private static let uploadSessionId = "com.openwearables.healthsdk.upload.session"

    public func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        // Touching `shared` registers the BGTasks.
        let sdk = OpenWearablesHealthSDK.shared

        // Ahead fork: re-configure natively when a host is stored. `configure`
        // restores the tracked types and the HealthKit observers, which Apple
        // expects during launch; leaving it to JS meant a background-delivery
        // launch synced nothing until the JS bundle ran.
        let storedHost = (sdk.getStoredCredentials()["host"] ?? nil) as? String
        if let host = storedHost, !host.isEmpty {
            sdk.configure(host: host)
        }

        return true
    }

    public func application(
        _ application: UIApplication,
        handleEventsForBackgroundURLSession identifier: String,
        completionHandler: @escaping () -> Void
    ) {
        // Only claim our own session's completion handler.
        guard identifier == Self.uploadSessionId else { return }
        OpenWearablesHealthSDK.setBackgroundCompletionHandler(completionHandler)
    }
}
