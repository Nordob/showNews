import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            headerHeightNumber: 'headerHeightNumber'
        })
    },
    methods: {
        scrollToTopElement(el) {
            try {
                const element = el || document.documentElement

                window.scrollTo({
                    top: element.getBoundingClientRect().top + pageYOffset - this.headerHeightNumber * 1.1,
                    behavior: 'smooth'
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
}
