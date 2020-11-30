import './App.css';
import Countdown from './components/Countdown';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Countdown</h1>
      </header>
      <div className="content">
        <Countdown
          date='2020-11-30T19:45:40'
          title="Eric's birthday"/>
      </div>
    </div>
  );
}

export default App;
