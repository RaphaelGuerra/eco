import { GameProvider } from './context/GameContext';
import { ExplorationViewContainer } from './components/containers/ExplorationViewContainer';

function App() {
  return (
    <GameProvider>
      <div className="App" data-testid="app-container">
        <ExplorationViewContainer />
      </div>
    </GameProvider>
  );
}

export default App; 