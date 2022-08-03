import React from 'react';
import { Square } from './Square';

export class Board extends React.Component {
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
