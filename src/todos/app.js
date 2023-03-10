import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos, renderPending } from './use-cases';

const ElementsIDs = {

    TodoFilters: '.filtro',
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput : '#new-todo-input',
    PendingCountLabel : '#pending-count'
}
/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {

    const displayTodos = () =>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        //console.log(todos);
        renderTodos(ElementsIDs.TodoList, todos)
        updateCount();
    }


    const updateCount = ( ) =>{
        renderPending(ElementsIDs.PendingCountLabel);
    }


    //cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })(); //es una funcion anonima autoinvocada 

    //referencias HTML
    const newDescripcionInput = document.querySelector(ElementsIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementsIDs.TodoList);
    const clearCompletedButton = document.querySelector(ElementsIDs.clearCompleted);
    const filterUL =  document.querySelectorAll(ElementsIDs.TodoFilters);

    //Listener
    newDescripcionInput.addEventListener('keyup', (event)=>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0 ) return;
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';

    })

    //añadir
    todoListUl.addEventListener('click',(event)=>{
        const element =  event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    //eliminar
    todoListUl.addEventListener('click',(event)=>{
        //console.log(event.target.className)
        const element =  event.target.closest('[data-id]');
        const isDestroyElement = event.target.className === 'destroy';
        
        if(!element || !isDestroyElement) return;

        if(isDestroyElement){
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
        
        displayTodos();
        //console.log(element);
        // todoStore.deleteTodo(element.getAttribute('destroy'));
        // displayTodos();
        
        // const element =  event.target.closest('[data-id]');
        // todoStore.toggleTodo(element.getAttribute('data-id'));
        // displayTodos();
    })
    //boton eliminar
    clearCompletedButton.addEventListener('click',(event)=>{
        todoStore.deleteCompleted();
        displayTodos();        
    })

    filterUL.forEach(element => {
        element.addEventListener('click',(event)=>{
            filterUL.forEach(e =>{
                e.classList.remove('selected')
            })
            event.target.classList.add('selected');
            switch(event.target.text){
                case 'Todos': todoStore.setFilter(Filters.All)
                break;
                case 'Pendientes' :  todoStore.setFilter(Filters.Pending)
                break;
                case 'Completados' : todoStore.setFilter(Filters.Complete)
                break;
            }
            displayTodos();
        })
    });

}