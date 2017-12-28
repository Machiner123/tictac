import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Lowest level of 3 components, is just the btn used by Board
// Props passed down from high to low level. Contains the onClick
// prop and displays updated value
function Square(props){
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

// Middle level, creates prop for renderSquare
class Board extends React.Component {
  constructor(props){
    super(props)
    this.state={
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  // Makes a copy of state.squares, assigns 'X' to index passed to it
  // by renderSquare, updates state by replacing old squares array with
  // updated copy. If there is a winner, or if the square being clicked
  // is non falsy, return early and ignore the click event
  handleClick(i){
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  // Contains the
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }
  // Every time the board is rendered, which is every time there is a change,
  // Go through the 'lines' in calculateWinner and if it returns none falsy,
  // display a winner
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
// Highets level, calls board, which calls Square
class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
