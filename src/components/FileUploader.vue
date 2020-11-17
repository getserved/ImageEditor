<template>
  <label class="fileUploader">
    <div class="selectBtn">
      <div v-if="value" class="names">
        <div class="name">
          <span>NAME</span>
        </div>
        <div class="fileName">
          <span>{{value.name}}</span>
        </div>
      </div>
      <div v-else class="select">
        <div>
          <span>SELECT FILE</span>
        </div>
      </div>
    </div>
    <input class="input" type="file" @change="onFileChange" @click="removeErrors"/>
    <bubble ref="errors" bubbleClass='bubbleBottomLeft' :text="getErrors" class='errors'></bubble>
  </label>
</template>

<script>
import Bubble from './Bubble.vue'

export default {
  name: 'FileUploader',
  props: {
    value: File
  },
  components: {
    bubble: Bubble
  },
  computed: {
    getErrors () {
      return this.$store.getters.getErrors;
    }
  },
  methods: {
    removeErrors: function (event) {
      const errors = this.$refs.errors;
      errors.$el.classList.remove('bubbleUp');
    },
    onFileChange: function (event) {
      const files = event.target.files;
      const errors = this.$refs.errors;
      if (files && files[0]) {
        if (files[0]['type'] === 'image/jpeg' || files[0]['type'] === 'image/jpg' || files[0]['type'] === 'image/png') {
          this.$emit('input', event.target.files[0]);
          this.$store.commit('setFile', event.target.files[0]);
        } else {
          this.$store.commit('setErrors', 'Only JPG and PNG images are accecpted!');
          errors.$el.classList.add('bubbleUp');
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fileUploader{
  position: relative;
  display: inline-block;
  display: flex;
  flex-wrap: nowrap;
  max-width: pxToRem(207);
  height: pxTorem(28);
  line-height: pxToRem(28);
}
.selectBtn{
  border: 1px solid $colorLighterGrey;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  width: 100%;
  flex-direction: row;
  flex: 1 1 0%;

  .names{
    display: flex;
    max-width: 100%;
    width: 100%;
    justify-content: flex-start;
  }

  div{
    display: inline-block;
    font-weight: 500;
    font-size: pxToRem(11);

    span{
      display: inline-block;
      vertical-align: middle;
      line-height: pxToRem(25);
    }

    &.select{
      width: 100%;
      border-radius: 5px;
      text-align: center;
      margin: auto;
    }
    &.name{
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-right: 1px solid $colorLighterGrey;
      background-color: $colorGrey;
      color: $colorDarkGrey;
      cursor: pointer;
      flex: 1 1 0%;
      width: 30%;
      max-width: pxToRem(59);
      letter-spacing: pxToRem(1.1);
    }

    &.fileName{
      color: $colorGreen;
      width: 70%;
      max-width: pxToRem(147);
      min-width: 50%;
      flex: 1 0 0%;
      letter-spacing: pxToRem(1.1);

      span{
        max-width: 90%;
        display: inline-block;
        overflow : hidden;
        text-overflow : ellipsis;
        white-space : nowrap;
      }

    }

    &.select{
      color: $colorGreen;
      cursor: pointer;
      transition: all .5s linear;

      &:hover{
        color: #fff;
        background-color: $colorGreen;
      }
    }
  }
}
.input{
  display: none;
}
.errors{
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: -2rem;
  transform: translate(0, -100%);
  opacity: 0;
  visibility: hidden;
  display: none;

  /deep/ .bubble{
    background: $colorBlue;
    color: #fff;
    width: 75vw;
    max-width: pxToRem(400);
    padding: pxToRem(10);
    font-size: pxToRem(12);

    &:before{
      border-left: 24px solid $colorBlue;
      border-right: 12px solid transparent;
      border-top: 12px solid $colorBlue;
      border-bottom: 20px solid transparent;
    }
  }
}
.bubbleUp{
  display: block;
  animation: bubbleUp 5s ease-in-out;
}

@keyframes bubbleUp{
  0%{
    visibility: visible;

    opacity: 0;
  }
  20%{
    opacity: 1;
  }
  80%{
    opacity: 1;
  }
  99.99%{
    opacity: 0;
  }
  100%{
    visibility: hidden;
    display: none;
    opacity: 0;
  }
}
</style>
