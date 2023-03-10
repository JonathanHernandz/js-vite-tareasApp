import {Todo} from '../todos/models/todo.model.js'

export const Filters = {
    All: 'all',
    Complete: 'complete',
    Pending: 'Pending'
}

const state = {
    todos: [ 
        // new Todo('Piedra del alma'),
        // new Todo('Piedra x'),
        // new Todo('Piedra y'),
        // new Todo('Piedra z'),
        // new Todo('Piedra ultimo')
    ], 
    filter: Filters.All
}

const iniStore = () =>{
    loadStore();
    //console.log(state);
    console.log('IniStore 🙈');
}

const loadStore = () =>{
    // console.log(localStorage.getItem('state'));
    if(!localStorage.getItem('state')) return;
    const {todos = [], filter =  Filters.All} = JSON.parse ( localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
    //throw new Error('Not implemented');

}

const saveStateToLocalStorage = () =>{
    //console.log(JSON.stringify(state));
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter = Filters.All) =>{
    
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Complete:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default: 
            throw new Error(`Option ${ filter } is no valid. `);
    }

}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description) =>{
    //throw new Error('Not implemented');
    if(!description) throw new Error('Not implemented');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

const toggleTodo = (todoId) =>{
    //throw new Error('Not implemented');
    state.todos = state.todos.map(todo => {
        if(todo.id ==  todoId)
        {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) =>{
    //throw new Error('Not implemented');
    state.todos = state.todos.filter ( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted = ( ) =>{
    //throw new Error('Not implemented');
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) =>{
    //throw new Error('Not implemented');
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () =>{
    //throw new Error('Not implemented');
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter, 
    iniStore,
    loadStore,
    setFilter,
    toggleTodo, 
    getTodos
}