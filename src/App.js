import React from "react";
import Todo from "./Todo";
import "./App.css";
import axios from "axios";

// let nextTodoId = 4;

class App extends React.Component {
  state = {
    newTodo: "Todo 4",
    search: "",
    todos: [
      {
        name: "Paul",
        done: false,
        id: 1
      },
      {
        name: "Pierre",
        done: true,
        id: 2
      },
      {
        name: "Etienne",
        done: false,
        id: 3
      }
    ]
  };

  render() {
    const sortedTodos = [...this.state.todos];

    // const doneTodos = this.state.todos.filter(todo => todo.done === true);
    // const todoTodos = this.state.todos.filter(todo => todo.done === false);

    sortedTodos.sort((left, right) => {
      if (left.done === right.done) {
        return 0;
      }
      if (left.done === true) {
        return 1;
      }
      return -1;
    });
    const filteredTodos = sortedTodos.filter(todo => {
      return todo.name.toLowerCase().includes(this.state.search.toLowerCase());
    });

    return (
      <div className="container">
        <h1>Todo List</h1>
        <input
          value={this.state.search}
          onChange={event => {
            this.setState({ search: event.target.value });
          }}
        />
        <ul>
          {filteredTodos.map(todo => {
            // on récupere l'index du todo grace a indexOf()
            // car l'index dans filteredTodos n'est pas le meme que this.state.todos
            const index = this.state.todos.indexOf(todo);
            return (
              <Todo
                key={todo.id}
                name={todo.name}
                done={todo.done}
                onTodoClick={() => {
                  // copier le tableau todos pour pouvoir le modifier
                  const nextTodos = [...this.state.todos];
                  // copier l'object todo dans nextTodos[index] pour pouvoir le modifier
                  nextTodos[index] = { ...nextTodos[index] };
                  // on peut maintenant modifier l'object car on l'a créer nous meme
                  nextTodos[index].done = !nextTodos[index].done;
                  this.setState({ todos: nextTodos });
                }}
                onDeleteClick={() => {
                  const nextTodos = [...this.state.todos];
                  nextTodos.splice(index, 1);
                  this.setState({
                    todos: nextTodos
                  });
                }}
              />
            );
          })}
        </ul>
        <input
          value={this.state.newTodo}
          onChange={event => {
            this.setState({ newTodo: event.target.value });
          }}
        />
        <button
          onClick={() => {
            axios
              .post("https://serveur-to-do-app.herokuapp.com/create", {
                name: this.state.newTodo
              })
              .then(res => {
                console.log(res.data);
              })
              .catch(error => {
                console.log(error);
              });

            // Sans Base de donnée
            // const nextTodos = [...this.state.todos];
            // nextTodos.push({
            //   name: this.state.newTodo,
            //   done: false,
            //   id: nextTodoId
            // });
            // nextTodoId = nextTodoId + 1;
            // this.setState({ todos: nextTodos, newTodo: "" });
          }}
        >
          Add
        </button>
      </div>
    );
  }
}

export default App;
