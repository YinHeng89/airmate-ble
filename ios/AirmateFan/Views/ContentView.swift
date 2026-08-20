import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var controller: FanController

    var body: some View {
        ControlView()
    }
}
