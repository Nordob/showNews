import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        news: [
            {
                id: 1,
                title: 'Тест',
                body: 'Тест тест',
                image: {
                    original: 'assets/testImg.jpg',
                    small: 'assets/testImg.jpg'
                },
                category: {
                    background_color: '#FFE600',
                    text_color: '#000',
                    category_name: 'тест'
                },
                published_at: '24.10.22',
            },
            {
                id: 2,
                title: 'Тест',
                body: 'Тест тест',
                image: {
                    original: 'assets/testImg.jpg',
                    small: 'assets/testImg.jpg'
                },
                category: {
                    background_color: '#FFE600',
                    text_color: '#000',
                    category_name: 'тест'
                },
                published_at: '24.10.22',
            },
            {
                id: 3,
                title: 'Тест',
                body: 'Тест тест',
                image: {
                    original: 'assets/testImg.jpg',
                    small: 'assets/testImg.jpg'
                },
                category: {
                    background_color: '#FFE600',
                    text_color: '#000',
                    category_name: 'тест'
                },
                published_at: '24.10.22',
            },
            {
                id: 4,
                title: 'Тест',
                body: 'Тест тест',
                image: {
                    original: 'assets/testImg.jpg',
                    small: 'assets/testImg.jpg'
                },
                category: {
                    background_color: '#FFE600',
                    text_color: '#000',
                    category_name: 'тест'
                },
                published_at: '24.10.22',
            }
        ]
    },
    getters: {},
    actions: {},
    mutations: {}
})

