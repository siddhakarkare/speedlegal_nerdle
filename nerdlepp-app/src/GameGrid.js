import { React, Component, Container } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import gameConfig from './gameConfig.json';


class GameGrid extends Component {
    constructor() {
        super();
        this.state = {
            n: "5",
            curr: "0,0",
            currRow: 0,
            grid : [[]],
            nerdle : "",
            answer : "",
            disableCell: [],
            bgColorGrid: [[]]
        };
        this.setup()
        
        // console.log("GameConfig:",gameConfig[this.state.n])
    }
    setup() {
        let q = gameConfig[this.state.n]["questions"]
        let nerdle = q[Math.floor(Math.random() * q.length)]
        console.log("setting Answer:",nerdle)
        this.state.answer = nerdle

        this.createGrid()

        
    }
    gameChanged = (e) => {
        // e.preventDefault();
        this.setup()
        console.log("Game Changed", e);
        
        this.state.n = e
        
        this.render();

    };
    
    createGrid = () =>{
        let row = []
        let disableCell1 = []
        let grid1 = []
        let bgGrid = []
        let bgc = []
        for (let i = 0; i < this.state.n; i++) {
            row = []
            bgc = []
            for (let j = 0; j < this.state.n; j++) {
                row.push("")
                bgc.push(0)
            }
            grid1.push(row)
            bgGrid.push(bgc)
            disableCell1.push(false)
        }

        console.log(bgGrid)
        this.setState({
            grid : grid1
        })
        this.state.bgColorGrid = bgGrid
        this.state.disableCell = disableCell1

        this.enableRow(0,false)
    }

    createTable = () => {
        
        
        let table = []
        for (let i = 0; i < this.state.n; i++) {
            let children = []
            for (let j = 0; j < this.state.n; j++) {
                let flag = true
                if(i===0){
                    flag = false
                }
                children.push(<td key={"td"+i + "," + j}>
                    <input value={this.state.grid.length >0 && this.state.grid[0].length > 0 ? this.state.grid[i][j] : "" }
                    onFocus={this.inputSelected} onChange={this.valueChanged} disabled={this.state.disableCell[i]}
                    style={{
                        backgroundColor : this.getCellColor(i,j)
                     }} 
                    className= "inputClass" maxLength="1" size="sm" id={i + "," + j} /></td>)
            }
            table.push(<tr key={"tr"+i}>{children}</tr>)
        }
        
        return table

    }
    getCellColor(i,j) {
        //0: default
        //1: right symbol, wrong position
        //2: right symbol, right position
        //3: wrong symbol
        if(this.state.bgColorGrid == undefined || this.state.bgColorGrid.length != this.state.n  || this.state.bgColorGrid[0].length != this.state.n)
            return "#989484"
        else if(this.state.bgColorGrid[i][j] == 0)
            return "#989484"
        else if(this.state.bgColorGrid[i][j] == 1)
            return "#820458"
        else if(this.state.bgColorGrid[i][j] == 2)
            return "#398874"
        else if(this.state.bgColorGrid[i][j] == 3)
            return "#161803"
    }
    valueChanged = (e) => {
        console.log("Dummy event", e.target)
    }
    enableRow(row, setStateFlg){
        // console.log("enabling row:",row)
        let disableCell1 = []
        for (let i = 0; i < this.state.n; i++){
            if(i!=row)
                disableCell1.push(true)
            else
                disableCell1.push(false)
        }
        if(setStateFlg)
            this.setState({disableCell:disableCell1})
        else
            this.state.disableCell = disableCell1
    }
    createNumbers = () => { 
        let numbers = []

        for (let i = 0; i <= 9; i++) {
            numbers.push(<button id={"button"+i} key={"button"+i} onClick={this.buttonPressed}>{i}</button>)
        }
        return numbers

    }
    getCurrentRowCol(){
        return this.state.curr.split(",")
    }
    buttonPressed = (e) => { // Sets the selected button's text (i.e. 1 for button 1 ) into the currently selected input box in the grid
        let txt = e.target.innerHTML
        this.state.userInput = txt

        let loc = this.getCurrentRowCol()
        let i = loc[0]
        let j = loc[1]

        let grid1 = this.state.grid
        grid1[i][j] = txt
        let nxt = ""
        if( j+1 < this.state.n){
            nxt = i+","+(parseInt(j)+1)
        }
        this.setState({
            grid : grid1,
            curr : nxt
        })
        
        
    }
    
    inputSelected = (e) => { //Called when any of the grid input box is clicked. Sets the selected box as the current box
        console.log("Input Selected:",e.target.id)
        this.setCurr(e.target.id)
    }
    setCurr = (e) => {
        console.log("Setting Current", e)
    
        this.setState({curr : e})
    }
    createOperators = () => {
        let operators = []
        let op = gameConfig[this.state.n]["operators"]

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
        console.log("Enter Pressed",e)
        console.log("Total rows in background color grid:", this.state.bgColorGrid.length)
        let i = this.state.currRow
        console.log("CurrentRow:",i, this.state)
        let eqn = ""
        for(let j =0;j<this.state.n;j++){
            eqn = eqn + this.state.grid[i][j]
        }

        if(this.evaluateExpression(eqn)){ // if valid expression
            console.log("Answer:",this.state.answer)
            if(eqn === this.state.answer){
                this.turnCurrRowGreen(this.state.currRow)
                alert("Victory!")

            } else {
                //mark clues
                console.log("Valid Expression but not the Answer!")
                this.markCluesCurrRow(eqn)

                let nxt = parseInt(i) + 1

                if(nxt<this.state.n){
                    this.enableRow(nxt, true)
                    let curr1 = nxt+","+0
                    this.setState({currRow: nxt, curr: curr1})


                }
            }
            
        }
        else{
            alert("invalid Expression")
        }
    }
    turnCurrRowGreen(row){
        let gr = []
        let grid1 = []
        console.log("Turning ",row," green out of ",this.state.bgColorGrid.length," rows")
        for (let i = 0; i < this.state.n; i++){
            gr = []
            for(let j =0; j<this.state.n;j++){
                if(i!=row)
                    gr.push(this.state.bgColorGrid[i][j])
                else{
                    gr.push(2)
                    console.log("Found the row to turn green")
                }
            }
            grid1.push(gr)
        }
        console.log("Turning ",row," green out of ",grid1.length," rows")
        this.setState({bgColorGrid:grid1})
        this.disableBoard()
        console.log("Background Color:",grid1[row], this.state.bgColorGrid[row])
         
    }
    disableBoard(){
        
        let disableCell1 = []
        for (let i = 0; i < this.state.n; i++)
            disableCell1.push(true)
            
        this.setState({disableCell:disableCell1})
    
    }
    markCluesCurrRow(eqn) {
        console.log("Marking clues. exp:",eqn," Answer:",this.state.answer)
        let bgGrid = this.state.bgColorGrid
    
        let e1 = this.transform(eqn)
        let e2 = this.transform(this.state.answer)
        for(let i=0;i<e1.length;i++){
            if(e1[i] == e2[i])
                bgGrid[this.state.currRow][i] = 2
            else if(e2.search(e1[i]) > -1)
                bgGrid[this.state.currRow][i] = 1
            else
                bgGrid[this.state.currRow][i] = 3

        }
    }
    transform(exp){
        //+:a
        //-:s
        //*:m
        // /:d
        //=:e
        let res = ""
        for(let i=0;i<exp.length; i++){
            if( exp[i] == "+")
                res += "a"
            else if( exp[i] == "-")
                res += "s"
            else if( exp[i] == "*")
                res += "m"
            else if( exp[i] == "/")
                res += "d"
            else if( exp[i] == "=")
                res += "e"
            else
                res += exp[i]
        }
        return res
    }

    parse(str) {
        return Function(`'use strict'; return (${str})`)()
    }
      
    evaluateExpression(exp) {
        let terms = exp.split('=')
        console.log("Expression:",exp)
        console.log(exp,"Terms:",terms)
        if(terms.length !== 2)
            return false
        
        let lhs = terms[0]
        let rhs = terms[1]

        if(this.parse(lhs) === this.parse(rhs))
            return true
        else
            return false
    }
    // resetGrid = () => {
        
    //     this.state.curr ="0,0"
    //     this.state.currRow = 0
    // }
    render() {
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
    componentDidMount = () => {
        this.createGrid()
    }
}

export default GameGrid;