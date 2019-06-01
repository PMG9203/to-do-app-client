import React from "react";

class Todo extends React.Component {
  render() {
    const { name, done, onTodoClick, onDeleteClick } = this.props;

    let textDeco = "none";
    if (done === true) {
      textDeco = "line-through";
    }

    return (
      <li>
        <button
          onClick={() => {
            onDeleteClick();
          }}
        >
          x
        </button>{" "}
        <span
          style={{ textDecoration: textDeco }}
          onClick={() => {
            onTodoClick();
          }}
        >
          {name}
        </span>
      </li>
    );
  }
}

export default Todo;
