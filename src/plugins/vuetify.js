/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
        light: {
            dark: false,
            colors: {
                'primary': '#03A9F4',
                'white-reverse': '#000000',
            }
        },
        dark: {
            dark: false,
            colors: {
                'primary': '#03A9F4',
                'white-reverse': '#FFFFFF',
            }
        }
    }
  },
})
