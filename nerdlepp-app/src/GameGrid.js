import { React, Component, Container } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import gameConfig from './gameConfig.json';


class GameGrid extends Component {
    constructor() {
        super();
        this.state = {
            n: "5",
            curr: "0,0",
            rows: []

        };

        console.log(gameConfig[this.state.n])
    }

    gameChanged = (e) => {
        // e.preventDefault();
        console.log("Game Changed", e);
        this.setState({
            n: e,
            rows: e
        })
        this.render();

    };
    setCurr = (e) => {
        console.log("FocusChanged", e)
        this.state.curr = e
    }

    createTable = () => {
        console.log("N:", this.state.n)
        let table = []

        for (let i = 0; i < this.state.n; i++) {
            let children = []
            for (let j = 0; j < this.state.n; j++) {
                children.push(<td><input size="sm" id={i + "," + j} /></td>)
            }
            table.push(<tr>{children}</tr>)
        }
        return table

    }
    createNumbers = () => {
        console.log("Creating Numbers")

        let numbers = []

        for (let i = 0; i <= 9; i++) {
            numbers.push(<button onClick={this.buttonPressed}>{i}</button>)
        }
        return numbers

    }
    buttonPressed = (e) => {
        console.log("Button Pressed", e)
    }

    createOperators = () => {
        let operators = []
        let op = gameConfig[this.state.n]["operators"]

        for (let i in op) {
            operators.push(<button onClick={this.buttonPressed}>{op[i]}</button>)
        }

        return operators
    }
    createEnterDelete = () => {
        let enterDelete = []
        enterDelete.push(<button onClick={this.enterPressed}>Enter</button>)
        enterDelete.push(<button onClick={this.deletePressed}>Delete</button>)
        return enterDelete
    }

    enterPressed = (e) => {
        // let c = this.curr
        console.log(e)
    }
    render() {

        return (
            <div>
                <div style={{ float: 'right', paddingTop: 0.5 + 'rem' }}>
                    <DropdownButton title="Change Game" onSelect={this.gameChanged}>
                        <Dropdown.Header>Game Type</Dropdown.Header>
                        <Dropdown.Item eventKey="5">5X5</Dropdown.Item>
                        <Dropdown.Item eventKey="6">6X6</Dropdown.Item>
                        <Dropdown.Item eventKey="7">7X7</Dropdown.Item>


                    </DropdownButton>
                </div>
                <div className='gameContainer'>
                    <div className='numberContainer'>
                        {this.createNumbers()}
                    </div>
                    <center className='operatorContainer'>
                        {this.createOperators()}
                    </center>
                    <center className="operatorContainer">
                        {this.createEnterDelete()}
                    </center>
                    <center>
                        <table>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </table>
                    </center>
                </div>

            </div>
        )
    }
}

export default GameGrid;