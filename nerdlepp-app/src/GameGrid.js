import { React, Component, Container } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import gameConfig from './gameConfig.json';


class GameGrid extends Component {
    n = 0
    curr = "0,0"
    currRow = 0
    grid = [[]]
    constructor() {
        super();
        this.n = "5"
        this.curr = "0,0"
        this.currRow = 0
        this.state = {
            n: "5",
            curr: "0,0",
            grid : [[]]
        };
        this.grid = [[]]

        // console.log("GameConfig:",gameConfig[this.state.n])
    }

    gameChanged = (e) => {
        // e.preventDefault();
        console.log("Game Changed", e);
        
        this.state.n = e
        this.n = e
        
        this.render();

    };
    setCurr = (e) => {
        console.log("Setting Current", e)
        this.state.curr = e
        this.curr = e
    }
    inputSelected = (e) => {
        console.log("Input Selected:",e.target.id)
        this.setCurr(e.target.id)
    }
    createGrid = () =>{
        let row = []
        let grid = []
        for (let i = 0; i < this.n; i++) {
            row = []
            for (let j = 0; j < this.n; j++) {
                row.push("")
            }
            grid.push(row)
        }
        this.state.grid = grid
        this.grid = grid

    }
    createTable = () => {
        this.createGrid()

        let table = []
        
        this.currRow = 0
        for (let i = 0; i < this.n; i++) {
            let children = []
            for (let j = 0; j < this.n; j++) {
                let flag = true
                if(i===0){
                    flag = false
                    console.log("First row")
                }
                children.push(<td key={"td"+i + "," + j}><input value={this.state.grid[i][j]} onFocus={this.inputSelected} 
                onChange={this.valueChanged} className= "inputClass" maxLength="1" size="sm" id={i + "," + j} /></td>)
            }
            table.push(<tr key={"tr"+i}>{children}</tr>)
        }
        return table

    }
    valueChanged = (e) => {
        console.log("Dummy event", e.target)
    }
    createNumbers = () => {
        console.log("Creating Numbers")

        let numbers = []

        for (let i = 0; i <= 9; i++) {
            numbers.push(<button id={"button"+i} key={"button"+i} onClick={this.buttonPressed}>{i}</button>)
        }
        return numbers

    }
    buttonPressed = (e) => {
        let txt = e.target.innerHTML
        this.state.userInput = txt

        let loc = this.curr.split(",")
        let i = loc[0]
        let j = loc[1]

        

        this.state.grid[i][j] = txt
        console.log("Button Pressed", e, txt)
        console.log("Setting grid at (",i,",",j,") with value=", this.state.grid[i][j])
    }

    createOperators = () => {
        let operators = []
        let op = gameConfig[this.n]["operators"]

        for (let i in op) {
            operators.push(<button className="operatorButton" id={"button"+op[i]} key={"button"+op[i]} onClick={this.buttonPressed}>{op[i]}</button>)
        }

        return operators
    }
    createEnterDelete = () => {
        let enterDelete = []
        enterDelete.push(<button className="enterDeleteButton" id="buttonEnter" key="buttonEnter" onClick={this.enterPressed}>Enter</button>)
        enterDelete.push(<button className="enterDeleteButton" id="buttonDelete" key="buttonDelete" onClick={this.deletePressed}>Delete</button>)
        return enterDelete
    }

    enterPressed = (e) => {
        // let c = this.curr
        console.log("Enter Pressed",e)
    }
    resetGrid = () => {
        this.curr ="0,0"
        this.currRow = 0
    }
    render() {
        this.resetGrid()
        return (
            <div>
                <div className='changeGameDropDown'>
                    <DropdownButton key="gameChangeButton" title="Change Game" onSelect={this.gameChanged} variant="outline-dark" size="sm">
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
                    <div className="container">
                        <center className='operatorContainer col '>
                            {this.createEnterDelete()}
                            {this.createOperators()}
                            
                        </center>
                    </div>
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