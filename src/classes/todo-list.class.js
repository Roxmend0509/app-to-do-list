import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        //this.todos=[];
        this.cargarLocalStorage();
    }

    newTodo(todo ){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    deleteTodo(id){
        this.todos=this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    completedTodo(id){
        for(const todo of this.todos){

            if(todo.id == id){
                todo.completed = !todo.completed;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    deleteAllComplete(){    
        this.todos=this.todos.filter(todo => !todo.completed);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        this.todos = this.todos.map(Todo.fromJson)
    }
}