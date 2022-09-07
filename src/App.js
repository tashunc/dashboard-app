import logo from './logo.svg';
import './App.css';
import {data, options} from "./mock/data";
import {PriceChart} from "./pages/price-chart"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Chart as ChartJS, CategoryScale,LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
function App() {
  ChartJS.register(CategoryScale,LineController, LineElement, PointElement, LinearScale, Title);
  return (
      <Container>
        <Row NumberAttr={3}>

          <Col ><PriceChart /></Col>
        </Row>

      </Container>

  );
}

export default App;
