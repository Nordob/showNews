<template>
  <div class="app" id="app">
    <div class="news-list">
      <SwitchElem
          :data="switchFilters"
          :double-click-to-remove="false"
          :active="selectFilterNum"
          :disabled="loading"
          label="category_name_plural"
          track-by="id"
          class="news-list__switch"
          overflow-hidden
      />
      <div
          v-if="newsLists && !loading"
          class="news-list__wrapper"
      >
        <NewsCard
            v-for="(news, index) in newsLists"
            :key="index"
            :news="news"
            class="card-news"
        />
      </div>
      <h2
          v-else-if="!loading && !newsLists"
          class="news-list__title"
      >
        Новости отсутствуют
      </h2>
      <!--    <global-pagination-->
      <!--        v-if="!loading && newsAllPages > 1 && allNews.length"-->
      <!--        :current-page="newsCurrentPage"-->
      <!--        :pages="newsAllPages"-->
      <!--        class="news-list__pagination"-->
      <!--    />-->
      <!--    <div v-if="loading" class="preloader">-->
      <!--      <global-preloader class="global-preloader"/>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import scrollToTopElement from './components/mixins/scrollToTopElement'
import SwitchElem from './components/SwitchElem'
import NewsCard from "./components/NewsCard";

export default {
  components: {
    SwitchElem,
    NewsCard
  },
  mixins: [scrollToTopElement],
  data() {
    return {
      allNews:[],
      newsCurrentPage: null,
      newsAllPages: null,
      loading: false,
      perPage: 9,
      selectFilterNum: null,
      firstLoad: true,
      switchFilters: [{
        category_name_plural: 'Все',
        id: 0
      }]
    }
  },
  watch: {
    //'$route': '$fetch'
  },
  created() {
    //const query = { ...this.$route.query }

    // if (query.hasOwnProperty('filter')) {
    //   const filter = Number(query.filter)
    //
    //   this.selectFilter(filter)
    // } else this.selectFilter(0)
  },
  // computed: {
  //   ...mapState({
  //     newsLists: 'news'
  //   })
  // },
  computed: {
    newsLists(){
      console.log('asdad', this)
      console.log('asda1231d', this.$store)
      return this.$store.state.news
    }
  },
  methods: {
    ...mapActions({
      getNewsAll: 'news/getNewsAll',
      getNewsCategoryList: 'news/getNewsCategoryList'
    }),
    setFilter(item) {
      const obj = { ...this.$route.query }
      const filter = Number(item?.id)

      this.selectFilter(filter)
      this.$router.push({ query: Object.assign({}, obj, { filter: filter, page: 1 }) })
    },
    selectFilter(number) {
      this.selectFilterNum = number
    },
    scrollToTop() {
      if (process.browser && this.$el && !this.firstLoad) {
        this.scrollToTopElement(this.$el)
      }
    }
  },
  async fetch() {
    this.loading = true
    const page = this.$route.query?.page || 1

    this.scrollToTop()

    try {
      if (this.firstLoad) {
        const data = await this.getNewsCategoryList({
          params: {
            'conditions[per_page]': 'all',
            'conditions[direction]': 'asc'
          }
        })

        if (Array.isArray(data)) {
          this.switchFilters.push(...data)
        }

        if (!this.switchFilters.some(el => el.id === this.selectFilterNum)) {
          if (process.server) {
            this.$nuxt.context.redirect({ query: Object.assign({}, this.$route.query, { filter: 0 }) })
          }
          this.selectFilter(0)
        }
      }

      const params = {
        page: page,
        'conditions[per_page]': this.perPage,
        'conditions[sort]': 'published_at',
        'conditions[direction]': 'desc'
      }

      if (this.selectFilterNum) {
        params['filters[category_id][]'] = this.selectFilterNum
      }

      const { data: newData, meta } = await this.getNewsAll({ params })

      this.allNews = Array.isArray(newData)
          ? newData
          : []
      this.newsCurrentPage = meta?.['current_page'] || 1
      this.newsAllPages = meta?.['last_page'] || 1
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.error(e)
    } finally {
      this.loading = false

      this.$nextTick(() => {
        this.scrollToTop()

        this.firstLoad = false
      })

      if (process.server) {
        if (page > 1 && !this.allNews.length) {
          this.$nuxt.context.redirect({ query: Object.assign({}, this.$route.query, { page: 1 }) })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.news-list{
  width: 1240px;
  padding: 0 20px;
  margin: 5rem auto 0;

  &__title{
    padding: 5rem 0 10rem;
    font-size: 4rem;
    text-align: center;
  }

  &__switch{
    margin: 0 0 5.5rem 0;
    flex-wrap: wrap;

    /deep/ {
      button {
        font-weight: normal;

        span:first-letter {
          text-transform: uppercase;
        }
      }
    }
  }

  &__pagination{
    margin-bottom: 5rem;
  }

  &__wrapper{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1.5rem;
  }
}

.card-news{
  display: flex;
  width: calc(100% / 3 - 3rem);
  margin: 0 1.5rem 5rem;
}

.preloader {
  position: relative;
  height: 30rem;
  width: 100%;
  margin: auto;

  .global-preloader {
    width: 20rem;
    height: 20rem;
  }
}

</style>
