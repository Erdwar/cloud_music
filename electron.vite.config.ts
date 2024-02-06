import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('./src/renderer/src'),
        '@comp': resolve('./src/renderer/src/components'),
        '@assets': resolve('./src/renderer/assets'),
        '@api': resolve('./src/renderer/src/api'),
        '@utils': resolve('./src/renderer/src/utils'),
        '@views': resolve('./src/renderer/src/views')
      }
    },
    plugins: [
      AutoImport({
        imports: ['vue','vue-router','pinia'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ]
      }),
      Components({
        resolvers: [
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件

          ElementPlusResolver(),
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          })
        ]
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      }),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('swiper-')
          }
        }
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          // math: 'always',
          // additionalData: `@import "./src/renderer/src/assets/css/styles.less";`,
          globalVars: {
            'primary-color': '#1DA57A'
          },
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  }
})
