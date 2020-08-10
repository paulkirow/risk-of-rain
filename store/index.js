import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      search: ''
    },
    mutations: {
      setSearch: (state, searchText) => {
        state.search = searchText
      }
    }
  })
}

export default createStore
