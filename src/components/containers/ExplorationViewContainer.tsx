import { StatusPanelContainer } from './StatusPanelContainer';

// Background image data extracted for maintainability
const FOREST_BACKGROUND_IMAGE = "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2t5R3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6Izg3Q0VFQjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDBCMDgzO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNza3lHcmFkaWVudCkiLz4KICA8IS0tIFRyZWVzIC0tPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjQ1MCIgcj0iNDAiIGZpbGw9IiMyMjU0M0QiLz4KICA8Y2lyY2xlIGN4PSI3MDAiIGN5PSI0MDAiIHI9IjUwIiBmaWxsPSIjMjI1NDNEIi8+CiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iNDgwIiByPSIzNSIgZmlsbD0iIzIyNTQzRCIvPgogIDxjaXJjbGUgY3g9IjUwMCIgY3k9IjQyMCIgcj0iNDUiIGZpbGw9IiMyMjU0M0QiLz4KICA8IS0tIEdyYXNzIC0tPgogIDxyZWN0IHg9IjAiIHk9IjUwMCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM0Q0FGNTAIIC8+CiAgPCEtLSBDbG91ZHMgLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjEwMCIgcng9IjgwIiByeT0iMzAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuOCIvPgogIDxlbGxpcHNlIGN4PSI2MDAiIGN5PSI4MCIgcng9IjYwIiByeT0iMjUiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuOCIvPgo8L3N2Zz4=')";

export function ExplorationViewContainer() {
  // Stub implementation for Explore Biome button
  const handleExploreBiome = () => {
    console.log('Explore Biome clicked - to be implemented in future stories');
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col"
      style={{
        backgroundImage: FOREST_BACKGROUND_IMAGE
      }}
      data-testid="exploration-view"
      role="main"
      aria-label="Forest exploration area"
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Header area with status panel */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex justify-center">
          <StatusPanelContainer />
        </div>
      </div>
      
      {/* Main content area - flexible space */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6">
        {/* Placeholder for future content */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
            Explore the Forest
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 drop-shadow-md max-w-2xl">
            Discover the wonders of nature in this pristine biome
          </p>
        </div>
      </div>
      
      {/* Bottom action area */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex justify-center">
          <button
            onClick={handleExploreBiome}
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200 text-lg"
            data-testid="explore-biome-button"
            aria-label="Explore the current biome for discoveries"
            type="button"
          >
            Explore Biome
          </button>
        </div>
      </div>
    </div>
  );
} 