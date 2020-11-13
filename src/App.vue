<template>
  <div id="app">
    <imageEditor></imageEditor>
  </div>
</template>

<script>
import ImageEditor from './components/ImageEditor.vue'

export default {
  name: 'App',
  components: {
    imageEditor: ImageEditor
  }
}
</script>

<style>
@font-face {
  font-family: "Graphik";
  src: url(./assets/fonts/Graphik-Medium.ttf) format("truetype"),
    url(./assets/fonts/Graphik-Medium.woff) format("woff"),
    url(./assets/fonts/Graphik-Medium.woff2) format("woff2"),
    url(./assets/fonts/Graphik-Medium.eot) format("eot")
  ;
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Graphik";
  src: url(./assets/fonts/Graphik-Regular.ttf) format("truetype"),
    url(./assets/fonts/Graphik-Regular.woff) format("woff"),
    url(./assets/fonts/Graphik-Regular.woff2) format("woff2"),
    url(./assets/fonts/Graphik-Regular.eot) format("eot")
  ;
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Graphik";
  src: url(./assets/fonts/Graphik-Light.ttf) format("truetype"),
    url(./assets/fonts/Graphik-Light.woff) format("woff"),
    url(./assets/fonts/Graphik-Light.woff2) format("woff2"),
    url(./assets/fonts/Graphik-Light.eot) format("eot")
  ;
  font-weight: 300;
  font-style: normal;
}

html, #app{
  overflow:hidden;
  font-size: 16px;
  width: 100%;
  height: 100%;
  font-family: 'Graphik';
}
body {
  height: 100%;
}

@media only screen and (max-width: 374px) {
  html, #app{
    font-size: 12px;
  }
}
@media only screen and (max-width: 324px) {
  html, #app{
    font-size: 10px;
  }
}
</style>
