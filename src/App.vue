<template>
  <div class="app" id="app">
    <headBlock/>
    <div class="news-list">
      <div
          v-if="allNews"
          class="news-list__wrapper"
      >
        <NewsCard
            v-for="(news, index) in allNews"
            :key="index"
            :news="news"
            class="card-news"
        />
      </div>
      <h2
          v-else-if="!allNews"
          class="news-list__title"
      >
        Новости отсутствуют
      </h2>
      <button
          class="btn"
          @click="addNews"
      >Добавить посты</button>
    </div>
  </div>
</template>

<script>
import NewsCard from "./components/NewsCard";
import headBlock from "./components/headBlock";
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    NewsCard,
    headBlock
  },
  computed: mapGetters(['allNews']),
  methods: {
    ...mapActions({
      fetchData: 'fetchNews',
      addGallery: 'addNews'
    })
  },
  async mounted(){
    await this.fetchData();
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
  background: rgba(255,186,24, .5);
}

.btn{
  background: #fff;
  width: 39.3rem;
  color: #000000;
  height: 6rem;
  font-size: 3rem;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: .5rem;
  transition: .3s background ease-in-out,
              .3s color ease-in-out;

  &:hover{
    background: rgba(255,186,24, 0.9);
    color: #fff;
  }
}

.news-list{
  width: 1240px;
  padding: 0 20px 60px;
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
