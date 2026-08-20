import SwiftUI

@main
struct AirmateFanApp: App {
    @StateObject private var controller = FanController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(controller)
        }
    }
}
