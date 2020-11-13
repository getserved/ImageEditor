<template>
  <div class="imageEditor">
    <div class="container">
      <div class="header">
        <h2>{{getTitle}}</h2>
        <div class='subtitle'>{{getSubtitle}}</div>
      </div>
      <div class="info">
        <div class="background" :style="{ 'background-image': 'url(' + require('../assets/images/'+getBgImg) + ')'}"></div>

        <div class="profile-container">
          <div class="profile">
            <img :src="require('../assets/images/'+getProfile)"/>
          </div>
        </div>
      </div>
      <div class="main-panel">
        <div class="controlPanel">
          <div class="slider-container" :key='k' v-for='(slider, k) in getControllers'>
            <slider :name='slider.name' :description="slider.description" :action="slider.action" :min="slider.min" :max="slider.max" :step="slider.step" :disabled="slider.disabled" :color="slider.color" ></slider>
          </div>
        </div>
        <div class="image-container">
          <div ref="canvasContainer" class="canvas-container">
            <canvas ref="canvas" class="canvas"></canvas>
          </div>
          <div class="uploader-container">
            <fileUploader v-model="file"></fileUploader>
            <button ref='uploadBtn' disabled class="uploadBtn" @click="onFileChange">
              <i class="icon"></i>
              <span>UPLOAD</span>
            </button>
            <!--<input class="image-input" ref="fileInput" type="file" @change="onFileChange"/>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Slider from './Slider.vue'
import FileUploader from './FileUploader.vue'

export default {
  name: 'ImageEditor',
  components: {
    slider: Slider,
    fileUploader: FileUploader
  },
  data () {
    return {
      file: null
    }
  },
  computed: {
    ...mapGetters([
      'getTitle',
      'getSubtitle',
      'getControllers',
      'getOriginalImageData',
      'getBrightness',
      'getContrast',
      'getBgImg',
      'getProfile',
      'getFile'
    ])
  },
  mounted: function () {
    this.canvas = this.$refs.canvas;
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext(`2d`);
    this.img = document.createElement(`img`);

    this.$store.commit(`setContext`, this.ctx);
    this.$store.commit(`setCanvas`, this.canvas);
    this.$store.commit(`setImage`, this.img);
  },
  watch: {
    '$store.state.editor.brightness': function (newVal) {
      if (newVal) {
        this.applyChange(newVal, this.$store.getters.getContrast);
      }
    },
    '$store.state.editor.contrast': function (newVal) {
      if (newVal) {
        this.applyChange(this.$store.getters.getBrightness, newVal);
      }
    },
    '$store.state.editor.file': function (newVal) {
      if (newVal) {
        this.$refs.uploadBtn.removeAttribute('disabled');
      }
    }
  },
  methods: {
    applyChange: function (brightness, contrast) {
      this.draw();
      let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

      let data = imageData.data;
      data = this.setBrightness(data, Number(brightness));
      this.setContrast(data, Number(contrast));
      this.ctx.putImageData(imageData, 0, 0);
    },
    setBrightness: function (data, value) {
      for (var i = 0; i < data.length; i += 4) {
        data[i] += 255 * (value / 100);
        data[i + 1] += 255 * (value / 100);
        data[i + 2] += 255 * (value / 100);
      }
      return data;
    },
    setContrast: function (data, value) {
      var factor = (259.0 * (value + 255.0)) / (255.0 * (259.0 - value));

      for (var i = 0; i < data.length; i += 4) {
        data[i] = this.truncateColor(factor * (data[i] - 128.0) + 128.0);
        data[i + 1] = this.truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
        data[i + 2] = this.truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
      }
      return data;
    },
    truncateColor: function (value) {
      if (value < 0) {
        value = 0;
      } else if (value > 255) {
        value = 255;
      }
      return value;
    },
    draw: function () {
      let scale = this.canvas.width / this.image.width;

      this.scaledWidth = this.canvas.width;
      this.scaledHeight = this.image.height * scale;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.img, 0, 0, this.scaledWidth, this.scaledHeight);
    },
    onFileChange: function (event) {
      const vm = this;
      const file = this.$store.getters.getFile;

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          vm.img.src = e.target.result;
        }

        reader.readAsDataURL(file);

        vm.img.onload = () => {
          vm.ctx.drawImage(vm.img, 0, 0);

          vm.image = {width: vm.img.width, height: vm.img.height}
          vm.draw();
          vm.isImageLoaded = true;
          vm.$store.dispatch(`activateControllers`);
          vm.$store.commit(`setOriginalImageData`, vm.ctx.getImageData(0, 0, vm.canvas.width, vm.canvas.height));
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.imageEditor{
  height: 100%;
}
.container{
  max-width: pxToRem(600);
  margin: auto auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.canvas-container{
  max-width: pxToRem(600);
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 0 1 80%;
}
.canvas{
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 100%;
  height: 100%;

  background: $colorGrey;
}
.header{
  background-color: $colorPurple;
  color: #fff;
  padding: 1rem;

  h2{
    font-size: pxToRem(15);
    font-weight: 500;
    margin: .5rem;
  }

  .subtitle{
    font-size: pxToRem(13);
    font-weight: 300;
  }
}
.info{
  width: 100%;
  max-height: 30%;
  position: relative;

  &:before {
    content: '';
    display: block;
    padding: 56.25% 0 0;
  }

  .background {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-size: cover;
     background-position: center;
     z-index: -1;
  }

  .profile-container {
    width: pxToRem(64);
    height: pxToRem(64);
    position: absolute;
    left: 50%;
    bottom: -1rem;
    transform: translateX(-50%);
    border: pxToRem(5) solid #fff;
    border-radius: 50%;
    overflow: hidden;

    .profile{
      animation: heartBeat 1.3s ease-in;
    }

    img{
      width: 100%;
      height: 100%;
      transform: scale(1.2);
      position: relative;
    }
  }
}
.main-panel{
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.controlPanel{
  flex: 1 1 30%;
  display: flex;
  flex-direction: column;

  .slider-container{
    box-shadow: 0 0 10px #ccc;
    margin: .5rem 0;
    border-radius: 5px;
  }
}
.image-container{
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  margin-top: 1rem;
  border-radius: 5px;
}

.uploader-container{
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: .5rem;
  margin-top: 1rem;
  flex-spacing: 1rem;

  .fileUploader{
    flex: 0 1 60%;
    max-width: 60%;
    cursor: pointer;
  }

  .uploadBtn{
    flex: 0 1 20%;
    flex-wrap: nowrap;
    white-space : nowrap;
    display: inline-block;
    outline: none;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 5px;
    color: $colorBlue;
    background-color: $colorGrey;
    font-size: pxToRem(11);
    font-weight: bold;
    line-height: pxToRem(11);
    padding: .3rem 1rem;
    cursor: pointer;

    &[disabled]{
      opacity: 0.5;
      cursor: none;
      pointer-events: none;
    }

    .icon{
      display: inline-block;
      width: pxToRem(11);
      height: pxToRem(11);
      background-image: url(../assets/images/Triangle.png);
      background-size: contain;
      background-repeat: no-repeat;
    }

    span{
      height: pxToRem(11);
      vertical-align: baseline;
    }
  }
}

@-webkit-keyframes backInUp {
  0% {
    -webkit-transform: translateY(1200px) scale(0.7);
    transform: translateY(1200px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    -webkit-transform: translateY(0px) scale(0.7);
    transform: translateY(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes heartBeat {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  14% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  28% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  42% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  70% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes heartBeat {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  14% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  28% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  42% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  70% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
