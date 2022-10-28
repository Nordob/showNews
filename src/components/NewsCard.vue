<template>
  <a :href="`/news/${news.id}`" class="card-news__wrapper">
    <div class="card-news__head">
      <lazyImg
          v-if="news.image"
          :alt="news.title"
          :origin="news.image.original"
          :small="news.image.small"
          class="card-news__head"
      />
      <div
          v-if="news.category"
          :style="{
          backgroundColor: news.category.background_color,
          color: news.category.text_color
        }"
          class="card-news__tag"
      >
        {{ news.category.category_name }}
      </div>
    </div>
    <div class="card-news__body">
      <h2
          class="card-news__title"
          v-html="titleCard"
      />
      <p
          class="card-news__text"
          v-html="textCard"
      />

      <p v-if="news.published_at" class="card-news__date">
        {{ news.published_at }}
      </p>
      <p v-else class="card-news__date">
        Не опубликовано
      </p>
    </div>
  </a>
</template>

<script>
import stripTags from './mixins/stripTags.js'
import lazyImg from "@/components/lazyImg";

export default {
  components: {
    lazyImg
  },
  mixins: [stripTags],
  props: {
    /**
     * @type {OneNews}
     * */
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    titleCard() {
      return this.stripTags(this.news.title)
    },
    textCard() {
      return this.stripTags(this.news.body)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-news{

  &__box{
    display: flex;
    flex-wrap: wrap;
  }

  &__wrapper {
    display: inline-flex;
    flex-direction: column;
    box-shadow: 0 0.9rem 4rem rgba(0, 2, 16, 0.06);
    text-decoration: none;
    border-radius: 1rem;
    overflow: hidden;
    background-color: #FEFEFE;
    transition: .2s ease-out background-color;

    &:hover{
      background-color: #ECF5FF;
    }
  }

  &__head{
    position: relative;
    height: 21.5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  &__tag{
    position: absolute;
    right: 0;
    top: 2rem;
    min-width: 11rem;
    max-width: 70%;
    padding: 1rem 3rem 1rem 1rem;
    color: color('black');
    font-size: 1.4rem;
    line-height: 2rem;
    border-radius: 0.6rem 0 0 0.6rem;
    background-color: #FFE600;
    text-transform: lowercase;
  }

  &__body{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 3rem 2rem;
  }

  &__title{
    margin-bottom: 2.5rem;
    font-size: 2.2rem;
    line-height: 2.8rem;
    font-weight: 500;
    color: #000;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    height: 5.6rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__text,
  &__text p{
    margin-bottom: 2.5rem;
    flex-grow: 1;
    font-size: 1.8rem;
    line-height: 2.5rem;
    font-weight: 400;
    color: gray;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    height: 12.5rem;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    letter-spacing: 0.01em;
  }

  &__date{
    color: #DADADA;
    font-size: 1.8rem;
    line-height: 2.5rem;
  }
}
</style>

