import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const todos = [
  { id: 1, name: 'Using Context API in React applications', completed: false },
  { id: 2, name: 'Using Redux in React applications', completed: false },
  { id: 3, name: 'Comparing both, React Context API and Redux', completed: true },
];
const TodoListContext = React.createContext(todos);

const Todos = ({ todos, onToggleTodo }) => {
  debugger;
  const todosElements = todos.map(todo => {
    return <li key={todo.id}
      onClick={() => onToggleTodo(todo.id)}
      className={todo.completed ? 'completed' : ''}>
        {todo.name}
    </li>;
  });
  return <ul>{todosElements}</ul>;
}

const TodoList = () => {
  const completedTasks = (todos) => todos.filter(it => it.completed).length;

  return (
    <TodoListContext.Consumer>
      {({ todos, actions }) => (
        <div>
          <h1>TodoList</h1>
          <p> Number of <strong>completed</strong> tasks: {completedTasks(todos)} </p>
          <Todos todos={todos} onToggleTodo={actions.toggleTodo} />
        </div>
      )}
    </TodoListContext.Consumer>
  )
};

class App extends Component {
  constructor() {
    super();
    this.state = { todos };
  }

  toggleTodo(id) {
    const { todos } = this.state;
    const currentTodo = todos.find(it => it.id === id);
    const newTodo = Object.assign({}, currentTodo, { completed: !currentTodo.completed });

    let newTodos = todos.filter(it => it.id !== id);
    newTodos = [...newTodos, newTodo].sort((first, second) => first.id - second.id);

    this.setState({ todos: newTodos });
  }

  render() {
    return (
      <div className="App">
        <TodoListContext.Provider value={{
          todos: this.state.todos,
          actions: {
            toggleTodo: (id) => this.toggleTodo(id)
          }
        }}>
          <TodoList />
        </TodoListContext.Provider>
      </div>
    );
  }
}

export default App;
