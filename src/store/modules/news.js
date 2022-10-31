export default {
    state: {
        news: [],
        limit: 6
    },
    actions: {
        async fetchNews({ commit, state }) {
            const res = await fetch(
                'https://jsonplaceholder.typicode.com/photos?_limit=' + state.limit
            )
            const news = await res.json()
            commit('updateNews', news)
        },
        addNews({ commit, dispatch, state }){
            commit('addNewsNumber', state.limit)
            dispatch('fetchNews')
        }
    },
    mutations: {
        updateNews(state, news){
            state.news = news
        },
        addNewsNumber(state, limit) {
            state.limit = limit + 3
        }
    },
    getters: {
        allNews(state) {
            return state.news
        }
    }
}
