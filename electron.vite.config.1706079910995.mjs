// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("./src/renderer/src"),
        "@comp": resolve("./src/renderer/src/components"),
        "@assets": resolve("./src/renderer/assets"),
        "@api": resolve("./src/renderer/src/api"),
        "@utils": resolve("./src/renderer/src/utils"),
        "@views": resolve("./src/renderer/src/views")
      }
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith("swiper-")
          }
        }
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          // math: 'always',
          // additionalData: `@import "./src/renderer/src/assets/css/styles.less";`,
          globalVars: {
            "primary-color": "#1DA57A"
          },
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  }
});
export {
  electron_vite_config_default as default
};
