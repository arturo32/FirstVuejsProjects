import axios from 'axios';


const state = {
	todos: []
};

const getters = {
	allTodos: (state) => state.todos
};

const actions = {
	async fetchTodos({ commit }){
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
		commit('setTodos', response.data);
	},
	async addTodo({ commit }, title){
		//const response = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false });
		const response = {data: {title, id: 200 + state.todos[0].id + 1}};
		commit('newTodo', response.data);
	},
	async deleteTodo({ commit }, id){
		//await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
		commit('removeTodo', id);		
	},
	async filterTodos({ commit }, e){

		//Get selected number
		const limit = parseInt(e.target.value);
		//const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

		commit('limitTodos', limit);
	},
	async updateTodo({ commit }, updTodo){
		//const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);
		const response = {data: updTodo}
		commit('updateTodo', response.data);			
		
	}
};

const mutations = {
	setTodos: (state, todos) => (state.todos = todos),
	newTodo: (state, todo) => state.todos.unshift(todo),
	removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
	updateTodo: (state, updTodo) => {
		const index = state.todos.findIndex(todo => todo.id === updTodo.id);
		if(index !== -1) {
			state.todos.splice(index, 1, updTodo);
		}		
	},
	limitTodos: (state, limit) => {
		state.todos.splice(limit, state.todos.length-limit)
	}
};


export default {
	state,
	getters,
	actions,
	mutations
};