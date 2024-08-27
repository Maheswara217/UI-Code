import './App.css';
import { Container } from 'react-bootstrap';
import RewardPoints from './components/Rewardpoints1';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <Container>
        <h1 className="text-center my-4">Reward Points Calculation</h1>
        <RewardPoints />
      </Container>
    </div>
  );
}

export default App;
