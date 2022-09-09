import logo from './logo.svg';
import './App.css';
import {data, options} from "./mock/data";
import {PriceChart} from "./pages/price-chart"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title} from 'chart.js';
import {Alert, Button, ButtonGroup, InputGroup} from "react-bootstrap";
import {useState} from "react";
import {checkIfAddressValid} from "./utils/general-utils";
import {VIEWS} from "./models/constants";
import {TransferChart} from "./pages/transfer-chart";
import {GasPriceChart} from "./pages/gas-price-chart";
import {BasePriceChart} from "./pages/base-price-chart";

function App() {
    ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);
    const [contractAddress, setContractAddress] = useState('');
    const [view, setView] = useState(VIEWS.TRANSFERS);
    const [submitted, setSubmitted] = useState(false);

    function handleViewChange(view) {
        setContractAddress('');
        setView(view);
    }

    function handleChange(eventData) {
        setContractAddress(eventData.target.value)
    }

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center" NumberAttr={3}>


                    <ButtonGroup size="lg" className="mb-2">
                        <Button variant={view === VIEWS.TRANSFERS ? "success" : "primary"}
                                onClick={() => handleViewChange(VIEWS.TRANSFERS)}>Transfers</Button>
                        <Button variant={view === VIEWS.BLOCK_BASE_PRICE ? "success" : "primary"}
                                onClick={() => handleViewChange(VIEWS.BLOCK_BASE_PRICE)}>Block Base Price</Button>
                        <Button variant={view === VIEWS.BLOCK_GAS ? "success" : "primary"}
                                onClick={() => handleViewChange(VIEWS.BLOCK_GAS)}>Block Gas</Button>
                    </ButtonGroup>


                    {view === VIEWS.BLOCK_GAS && <Col ><GasPriceChart /></Col>}
                    {view === VIEWS.BLOCK_BASE_PRICE && <Col ><BasePriceChart /></Col>}
                    {view === VIEWS.TRANSFERS &&
                        <Col>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter ERC 20 Contract Address"
                                    aria-label="Enter ERC 20 Contract Address"
                                    aria-describedby="ERC 20 Contract Address"
                                    onChange={handleChange}
                                />
                                <Button variant="outline-secondary" id="button-addon2"
                                        disabled={!checkIfAddressValid(contractAddress)}>
                                    Submit
                                </Button>
                            </InputGroup>
                            {
                                contractAddress && !checkIfAddressValid(contractAddress) &&
                                <Alert key="danger" variant="danger">
                                    Invalid Contract Address, Please Enter a Valid Ethereum Mainnet Contract Address!!
                                </Alert>
                            }
                            {
                                contractAddress && checkIfAddressValid(contractAddress) &&
                                <TransferChart contractAddress={contractAddress}/>
                            }
                        </Col>
                    }
                </Row>

            </Container>
        </div>

        // <Carousel>
        //     <Carousel.Item>
        //         {/*<PriceChart />*/}
        //         <Carousel.Caption>
        //             <h3>First slide label</h3>
        //             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         {/*<PriceChart />*/}
        //
        //         <Carousel.Caption>
        //             <h3>Second slide label</h3>
        //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         {/*<PriceChart />*/}
        //
        //         <Carousel.Caption>
        //             <h3>Third slide label</h3>
        //             <p>
        //                 Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        //             </p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        // </Carousel>

    );
}

export default App;
