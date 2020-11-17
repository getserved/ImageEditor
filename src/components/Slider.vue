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
        :style="{ '--color': color, background: 'linear-gradient(to right, ' + color + ', ' + color + ' ' + percent + '%, ' + color + '55 ' + (percent+0.01) + '%, ' + color + '55)'}"
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
        return 50;
      }
    }
  },
  methods: {
    barChange: function (e) {
      let val = e.target.value;
      let max = e.target.max;
      this.setTrack(val, max);
      this.$store.dispatch(this.action, val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slider{
  padding: .5rem;
}
.title{
  font-size: pxToRem(18);
  font-weight: 500;
  margin: 0;
}
.description{
  font-size: pxToRem(13);
  color: $colorDarkGrey;
}
.slide{
  padding: .5rem;
}
.input{
  width: 100%;
}
input[type=range] {
  -webkit-appearance: none;
  width: 90%;
  border-radius: 10px;
  outline: none;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
input[type=range]::-webkit-slider-runnable-track {
  height: pxToRem(5);
  border-radius: 10px;
}
input[type=range][disabled]::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #ccc, #ccc 50%, #eee 50.01%, #eee);
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: pxToRem(25);
  width: pxToRem(25);
  margin-top: pxToRem(-10);
  background: var(--color);
  border-radius: 50%;
  border: solid 3px #fff;
  cursor: pointer;
}
input[type=range][disabled]::-webkit-slider-thumb  {
  background: #ccc;
}
</style>
