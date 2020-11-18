<template>
  <div class="slider">
    <h2 class="title" :style="{color: color}">
      {{name}}
    </h2>
    <div class="slide">
      <input
        class="input"
        :disabled="disabled"
        ref='slider'
        type="range"
        @input="barChange"
        :min="min"
        :max="max"
        :step="step"
        :defaultValue="defaultValue"
        v-model="barValue"
        :style="{ '--color': color, background: 'linear-gradient(to right, ' + colored + ', ' + colored + ' ' + percent + '%, ' + colored + '55 ' + (percent+0.01) + '%, ' + colored + '55)'}"
      />
    </div>
    <div class="description">
      {{description}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    name: String,
    color: String,
    action: String,
    description: String,
    max: Number,
    min: Number,
    step: Number,
    defaultValue: Number,
    disabled: Boolean
  },
  data () {
    return {
      barValue: this.defaultValue
    }
  },
  computed: {
    percent: function () {
      if (this.barValue) {
        return ((this.barValue - this.min) / (this.max - this.min)) * 100;
      } else {
        return ((this.defaultValue - this.min) / (this.max - this.min)) * 100;
      }
    },
    colored: function () {
      if (this.disabled) {
        return '#cccccc';
      } else {
        return this.color;
      }
    }
  },
  methods: {
    barChange: function (e) {
      let val = e.target.value;
      this.$store.dispatch(this.action, val);
    },
    reset: function () {
      this.$refs.slider.value = this.defaultValue;
      const defaultValue = this.defaultValue;
      this.smoothTransit(500, defaultValue);
      this.$store.commit('setControllerDisabled', true);
    },
    smoothTransit: function (time, value) {
      const distance = value - this.barValue;
      if (distance !== 0) {
        const timer = Math.abs(time / distance);
        const step = (distance > 0) ? 1 : -1;

        var intID = setInterval(() => {
          if (this.barValue !== value) {
            this.barValue = Number(this.barValue) + step;
          } else {
            clearInterval(intID);
          }
        }, timer);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.slider{
  padding-top: pxToRem(6);
}
.title{
  font-size: pxToRem(18);
  font-weight: 500;
  margin: 0;
  line-height: pxToRem(25);
}
.description{
  font-size: pxToRem(13);
  font-weight: 400;
  line-height: pxToRem(25);
  color: $colorDarkBlue;
}
.slide{
  padding: pxToRem(7) 0;
}
.input{
  width: 100%;
}
input[type=range] {
  -webkit-appearance: none;
  width: 95%;
  max-width: pxToRem(295);
  border-radius: 10px;
  outline: none;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
input[type=range]::-webkit-slider-runnable-track {
  height: pxToRem(5);
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: pxToRem(21);
  width: pxToRem(21);
  margin-top: pxToRem(-8);
  background: var(--color);
  border-radius: 50%;
  border: solid 3px #fff;
  cursor: pointer;
}
input[type=range][disabled]::-webkit-slider-thumb  {
  background: #ccc;
}
</style>
