import './App.css';
import Calendar from './components/Calendar';

function App() {
  const now = new Date(2021, 11, 31);
  return <Calendar date={now} />;
}

export default App;
