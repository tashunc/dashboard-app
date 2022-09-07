import logo from './logo.svg';
import './App.css';
import {data, options} from "./mock/data";
import {PriceChart} from "./pages/price-chart"
function App() {
  return (
      <PriceChart data={data} options={options}/>
  );
}

export default App;
