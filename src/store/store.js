import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    editor: {
      title: `Brightness & Contrast Developer Test`,
      subtitle: `01 Jun, 2018 ‒ 31 Dec, 2019`,
      bgImg: `bg.jpg`,
      profile: `me.png`,
      file: ``,
      canvas: ``,
      ctx: '',
      brightness: 0,
      contrast: 0,
      originalImageData: ``,
      img: ``,
      image: {
        url: ``,
        width: 0,
        height: 0
      },
      isImageLoaded: false,
      controllers: [
        {
          name: `Brightness`,
          action: `setBrightness`,
          isDefaultDisabled: true,
          description: `Slide to adjust image brightness!☀️`,
          min: -100,
          max: 100,
          step: 1,
          defaultValue: 0,
          barValue: 0,
          disabled: true,
          color: `#25A95B`
        },
        {
          name: `Contrast`,
          action: `setContrast`,
          description: `Slide to adjust image contrast!🌓`,
          min: -100,
          max: 100,
          step: 1,
          defaultValue: 0,
          barValue: 0,
          disabled: true,
          color: `#4A90E2`
        }
      ]
    }
  },
  getters: {
    getFile (state) {
      return state.editor.file
    },
    getTitle (state) {
      return state.editor.title
    },
    getSubtitle (state) {
      return state.editor.subtitle
    },
    getBgImg (state) {
      return state.editor.bgImg
    },
    getProfile (state) {
      return state.editor.profile
    },
    getControllers (state) {
      return state.editor.controllers
    },
    getOriginalImageData (state) {
      return state.editor.originalImageData
    },
    getBrightness (state) {
      return state.editor.brightness
    },
    getContrast (state) {
      return state.editor.contrast
    }
  },
  mutations: {
    setFile: function (state, value) {
      state.editor.file = value;
    },
    setContext: function (state, value) {
      state.editor.ctx = value;
    },
    setCanvas: function (state, value) {
      state.editor.canvas = value;
    },
    setImage: function (state, value) {
      state.editor.img = value;
    },
    setOriginalImageData: function (state, value) {
      state.editor.originalImageData = value;
    },
    setBrightness: function (state, value) {
      state.editor.brightness = value;
    },
    setContrast: function (state, value) {
      state.editor.contrast = value;
    },
    setControllerDisabled: function (state, value) {
      state.editor.controllers.forEach((controller) => {
        controller.disabled = value;
      })
    }
  },
  actions: {
    setBrightness: function (context, value) {
      context.commit('setBrightness', value);
    },
    setContrast: function (context, value) {
      context.commit('setContrast', value);
    },
    activateControllers: function (context) {
      context.commit('setControllerDisabled', false);
    }
  }
})
