
import { Todo,TodoList } from './classes';
import { crearTodoHtml } from './js/components';
import './styles.css';


export const todoList = new TodoList();

// const newTodo = new Todo('Aprender JS')

// todoList.newTodo(newTodo)

todoList.todos.forEach(crearTodoHtml);

console.log(todoList)