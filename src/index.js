import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { calculateWinner } from './calculateWinner';
import './index.css';
import { Square } from './square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        win={this.props.winnerSquares.includes(i)}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  renderRow(row) {
    const first = row * 3;
    const columns = [0, 1, 2].map((column) =>
      this.renderSquare(first + column)
    );
    return (
      <div className="board-row" key={row}>
        {columns}
      </div>
    );
  }

  render() {
    const rows = [0, 1, 2].map((row) => this.renderRow(row));
    return <div>{rows}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), move: null }],
      xIsNext: true,
      stepNumber: 0,
      reverseOrder: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const column = i % 3;
    const row = (i - column) / 3;
    this.setState({
      history: history.concat([
        {
          squares: squares,
          move: { row, column },
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      reverseOrder: this.state.reverseOrder,
    });
    console.log(squares);
  }

  toggleOrder() {
    this.setState({ reverseOrder: !this.state.reverseOrder });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);
    let moves = history.map((step, move) => {
      const desc = move
        ? 'Revenir au tour n°' +
          move +
          ' {row: ' +
          step.move.row +
          ', column: ' +
          step.move.column +
          '}'
        : 'Revenir au début de la partie';
      return (
        <li
          key={move}
          className={move === this.state.stepNumber ? 'active' : ''}
        >
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    moves = this.state.reverseOrder ? moves.reverse() : moves;
    let status = result
      ? result.winner + ' a gagné'
      : this.state.stepNumber === 9
      ? 'Match null'
      : 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerSquares={result?.squares ?? []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleOrder()}>Order</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);
