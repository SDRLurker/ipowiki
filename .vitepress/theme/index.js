import DefaultTheme from 'vitepress/theme'
import Broker from '../components/Broker.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Broker', Broker)
  }
}
