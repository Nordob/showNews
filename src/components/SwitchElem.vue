<template>
  <div>
    <div class="SwitchElem">
      <button
          v-for="(btn, index) in data"
          :key="index"
          :ref="`button${btn[trackBy]}`"
          :class="{
          _checked: active === btn[trackBy],
          _first: index === 0,
          _last: index === (data.length - 1),
          _medium: index < (data.length - 1) && index > 0,
          '_overflow-hidden': overflowHidden,
          '_text-only': withIndicator
        }"
          :disabled="disabled || (!doubleClickToRemove && active === btn[trackBy])"
          :title="btn[label]"
          class="link"
          @click.prevent="setFilter(btn)"
      >
        <span v-if="overflowHidden">{{ btn[label] }}</span>
        <template v-else>
          {{ btn[label] }}
        </template>
      </button>
    </div>
    <div v-if="withIndicator" class="indicators">
      <div
          :style="{
          width: indicatorWidth,
          left: indicatorPositionLeft
        }"
          class="indicator"
      />
    </div>
  </div>
</template>

<script>
export default {
  model: {
    event: 'change'
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    doubleClickToRemove: {
      type: Boolean,
      default: true
    },
    active: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      default: 'name'
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    overflowHidden: {
      type: Boolean,
      default: false
    },
    withIndicator: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      indicatorPositionLeft: '0rem',
      indicatorWidth: '0rem'
    }
  },
  mounted() {
    if (this.withIndicator) {
      this.$nextTick(() => {
        this.setIndicatorStyles()
      })
    }
  },
  methods: {
    setFilter(btn) {
      if (this.disabled) return

      if (this.doubleClickToRemove && btn?.[this.trackBy] === this.active) {
        this.$emit('setFilter', null)
      } else {
        this.$emit('setFilter', btn)
      }

      if (this.withIndicator) {
        this.$nextTick(() => {
          this.setIndicatorStyles()
        })
      }
    },
    setIndicatorStyles() {
      const activeButton = this.$refs[`button${this.active}`] ? this.$refs[`button${this.active}`][0] : null

      if (activeButton) {
        const fontSize = window.getComputedStyle(document.querySelector('html'))['font-size'].split('px')[0]
        this.indicatorWidth = `${window.getComputedStyle(activeButton).width.split('px')[0] / fontSize}rem`
        this.indicatorPositionLeft = `${(activeButton.getBoundingClientRect().left -
            activeButton.parentNode.getBoundingClientRect().left) / fontSize}rem`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.SwitchElem {
  display: flex;
  width: fit-content;
}

.link {
  background: color('white');
  box-sizing: border-box;
  border-radius: .4rem;
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 156%;
  transition: all ease-in-out .2s;
  cursor: pointer;
  color: color('text-second-black');
  height: 4.2rem;
  padding: 0 2.4rem;
  position: relative;
  border: .1rem solid #EAEAEA;
  user-select: none;
  outline: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    height: 1.6rem;
    width: .1rem;
    background-color: #EAEAEA;
    margin: auto 0;
    transition: all ease-in-out .2s;
  }

  &._checked {
    &,
    &:hover {
      background: color('main-yellow');
      border-color: color('main-yellow');

      &::after {
        background: color('main-yellow');
      }
    }
  }

  &._first {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &._last {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &::after {
      display: none;
    }
  }

  &._medium {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }

  &._first._last {
    border: .1rem solid #EAEAEA;
    border-radius: .4rem;
  }

  &._overflow-hidden {
    justify-content: flex-start;
    min-width: 0;
    max-width: 20rem;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  &:hover {
    background: #FFE600;
    border-color: #FFE600;

    &::after {
      background: #FFE600;
    }
  }

  &._text-only {
    font-style: normal;
    font-weight: normal;
    font-size: 1.6rem;
    line-height: 170%;
    letter-spacing: 0.01em;
    color: color('second-gray');
    background: none;
    border: none;
    padding: 0;
    min-width: unset;
    transition: color ease-in-out .2s;
    height: auto;

    &:after {
      display: none;
    }

    &+& {
      margin-left: 4rem;
    }

    &._checked {
      color: color('black');
      pointer-events: none;
    }

    &:hover {
      color: color('black');
    }
  }

  &:disabled {
    cursor: default;
  }
}

.indicators {
  display: flex;
  width: 100%;
  height: .1rem;
  background: color('seventh-gray');
  position: relative;
  margin-top: 1.5rem;
}

.indicator {
  height: .3rem;
  background: color('main-yellow');
  transition: all ease-in-out .2s;
  transform: translateY(-50%);
  position: absolute;
  top: 0;
}
</style>
