import { Todo } from "../classes";

import { todoList } from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnAllDelete = document.querySelector('.clear-completed');
const ulFilter = document.querySelector('.filters');
const anchorFilter = document.querySelectorAll('.selected')


export const crearTodoHtml = (todo) =>{
    const htmlTodo=`
    <li class="${ (todo.completed) ? 'completed': ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked': ''}>
				<label>${todo.tarea}</label>
			    <button class="destroy"></button>
		</div>
			    <input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    const div=document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); //Traer el primer elemento

    return div.firstElementChild;
}

//Eventos

txtInput.addEventListener('keyup',(event)=>{
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const newTodo = new Todo(txtInput.value);

        todoList.newTodo(newTodo);

        console.log(todoList);

        crearTodoHtml(newTodo);

        txtInput.value = '';
    }
})

divTodoList.addEventListener('click',(event)=>{
    const nombreElemento = event.target.localName; //input, label, button
    const todoElement = event.target.parentElement.parentElement;

    const todoID= todoElement.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.completedTodo(todoID);
        todoElement.classList.toggle('completed')
    }else if(nombreElemento.includes('button')){
        todoList.deleteTodo(todoID);
        divTodoList.removeChild( todoElement );
    }

})

btnAllDelete.addEventListener('click',()=>{
    todoList.deleteAllComplete();

    for(let i=divTodoList.children.length-1; i >= 0;i--){
        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilter.addEventListener('click',(event)=>{
    const filtro=event.target.text
    if(!filtro) {return;}

    anchorFilter.forEach(elem => elem.classList.remove('selected'));

    event.target.classList.add('selected')

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
})