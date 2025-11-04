// ============================================
// SUBSYSTEMS (Complex Components)
// ============================================

enum InputSource {
  HDMI1 = "HDMI1",
  HDMI2 = "HDMI2",
  HDMI3 = "HDMI3",
}

enum SoundMode {
  STEREO = "Stereo",
  SURROUND = "Surround 5.1",
  MOVIE = "Movie Mode",
  GAME = "Game Mode",
}

interface App {
  name: string;
}

// TV System
class TVSystem {
  private power: boolean = false;
  private inputSource: InputSource = InputSource.HDMI1;

  turnOn(): void {
    this.power = true;
    console.log("📺 TV: Powered ON");
  }

  turnOff(): void {
    this.power = false;
    console.log("📺 TV: Powered OFF");
  }

  setInputSource(source: InputSource): void {
    this.inputSource = source;
    console.log(`📺 TV: Input changed to ${source}`);
  }

  getStatus(): string {
    return `TV is ${this.power ? "ON" : "OFF"}, Input: ${this.inputSource}`;
  }
}

// Sound System
class SoundSystem {
  private power: boolean = false;
  private volume: number = 30;
  private mode: SoundMode = SoundMode.STEREO;

  turnOn(): void {
    this.power = true;
    console.log("🔊 Sound System: Powered ON");
  }

  turnOff(): void {
    this.power = false;
    console.log("🔊 Sound System: Powered OFF");
  }

  setVolume(level: number): void {
    this.volume = Math.max(0, Math.min(100, level));
    console.log(`🔊 Sound System: Volume set to ${this.volume}`);
  }

  setMode(mode: SoundMode): void {
    this.mode = mode;
    console.log(`🔊 Sound System: Mode set to ${mode}`);
  }
}

// Streaming Device (Apple TV)
class StreamingDevice {
  private power: boolean = false;
  private currentApp: string | null = null;

  turnOn(): void {
    this.power = true;
    console.log("📱 Streaming Device: Powered ON");
  }

  turnOff(): void {
    this.power = false;
    this.currentApp = null;
    console.log("📱 Streaming Device: Powered OFF");
  }

  launchApp(appName: string): void {
    this.currentApp = appName;
    console.log(`📱 Streaming Device: Launching ${appName}...`);
  }
}

// Lights System
class LightsSystem {
  private power: boolean = true;
  private brightness: number = 100;

  turnOn(): void {
    this.power = true;
    this.brightness = 100;
    console.log("💡 Lights: Turned ON (100%)");
  }

  turnOff(): void {
    this.power = false;
    this.brightness = 0;
    console.log("💡 Lights: Turned OFF");
  }

  setBrightness(level: number): void {
    this.brightness = Math.max(0, Math.min(100, level));
    this.power = this.brightness > 0;
    console.log(`💡 Lights: Brightness set to ${this.brightness}%`);
  }
}

// Screen/Projector
class ProjectorScreen {
  private isDown: boolean = false;

  lower(): void {
    this.isDown = true;
    console.log("🎬 Screen: Lowered");
  }

  raise(): void {
    this.isDown = false;
    console.log("🎬 Screen: Raised");
  }
}

// Gaming Console
class GamingConsole {
  private power: boolean = false;

  turnOn(): void {
    this.power = true;
    console.log("🎮 Gaming Console: Powered ON");
  }

  turnOff(): void {
    this.power = false;
    console.log("🎮 Gaming Console: Powered OFF");
  }

  launchGame(gameName: string): void {
    console.log(`🎮 Gaming Console: Launching ${gameName}...`);
  }
}

// ============================================
// FACADE (Simple Interface)
// ============================================

class HomeTheaterFacade {
  private tv: TVSystem;
  private sound: SoundSystem;
  private streaming: StreamingDevice;
  private lights: LightsSystem;
  private screen: ProjectorScreen;
  private console: GamingConsole;

  constructor() {
    this.tv = new TVSystem();
    this.sound = new SoundSystem();
    this.streaming = new StreamingDevice();
    this.lights = new LightsSystem();
    this.screen = new ProjectorScreen();
    this.console = new GamingConsole();
  }

  // HIGH-LEVEL METHOD: Watch a Movie
  watchMovie(service: string = "Netflix"): void {
    console.log("\n🎬 ========== STARTING MOVIE MODE ==========\n");

    this.tv.turnOn();
    this.tv.setInputSource(InputSource.HDMI1);

    this.sound.turnOn();
    this.sound.setVolume(35);
    this.sound.setMode(SoundMode.MOVIE);

    this.streaming.turnOn();
    this.streaming.launchApp(service);

    this.lights.setBrightness(10); // Dim lights
    this.screen.lower();

    console.log("\n✅ Everything is ready! Enjoy your movie! 🍿\n");
  }

  // HIGH-LEVEL METHOD: Play Games
  playGame(gameName: string = "FIFA"): void {
    console.log("\n🎮 ========== STARTING GAMING MODE ==========\n");

    this.tv.turnOn();
    this.tv.setInputSource(InputSource.HDMI2);

    this.sound.turnOn();
    this.sound.setVolume(40);
    this.sound.setMode(SoundMode.GAME);

    this.console.turnOn();
    this.console.launchGame(gameName);

    this.lights.setBrightness(30); // Slightly brighter for gaming

    console.log("\n✅ Gaming setup complete! Let's play! 🕹️\n");
  }

  // HIGH-LEVEL METHOD: Watch Sports
  watchSports(channel: string = "ESPN"): void {
    console.log("\n⚽ ========== STARTING SPORTS MODE ==========\n");

    this.tv.turnOn();
    this.tv.setInputSource(InputSource.HDMI1);

    this.sound.turnOn();
    this.sound.setVolume(45); // Louder for excitement!
    this.sound.setMode(SoundMode.SURROUND);

    this.streaming.turnOn();
    this.streaming.launchApp(channel);

    this.lights.setBrightness(40); // Brighter - might want to see snacks!

    console.log("\n✅ Sports mode ready! Game on! 🏆\n");
  }

  // HIGH-LEVEL METHOD: Pause
  pause(): void {
    console.log("\n⏸️  Pausing...");
    this.lights.setBrightness(50);
    this.sound.setVolume(20);
    console.log("✅ Paused - lights brightened\n");
  }

  // HIGH-LEVEL METHOD: Resume
  resume(): void {
    console.log("\n▶️  Resuming...");
    this.lights.setBrightness(10);
    this.sound.setVolume(35);
    console.log("✅ Resumed - back to movie mode\n");
  }

  // HIGH-LEVEL METHOD: End Everything
  endEntertainment(): void {
    console.log("\n🛑 ========== SHUTTING DOWN ==========\n");

    this.tv.turnOff();
    this.sound.turnOff();
    this.streaming.turnOff();
    this.console.turnOff();
    this.screen.raise();
    this.lights.turnOn();

    console.log("\n✅ All systems shut down. Goodnight! 😴\n");
  }
}

// ============================================
// USAGE DEMONSTRATION
// ============================================

function main() {
  const theater = new HomeTheaterFacade();

  // Scenario 1: Watch a movie
  theater.watchMovie("Netflix");

  // Take a bathroom break
  theater.pause();
  theater.resume();

  // Done with movie
  theater.endEntertainment();

  // Scenario 2: Gaming time!
  theater.playGame("God of War");
  theater.endEntertainment();

  // Scenario 3: Watch sports
  theater.watchSports("ESPN+");
  theater.endEntertainment();
}

main();
