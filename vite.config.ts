import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'

const isPreview = process.env.IS_PREVIEW ? true : false

export default defineConfig(({ command }) => {
  const base = command === 'build' ? './' : '/'

  return {
    define: {
      __BASE_PATH__: JSON.stringify(base),
      __IS_PREVIEW__: JSON.stringify(isPreview),
    },
    plugins: [
      react(),
      AutoImport({
        imports: [
          {
            react: [
              ['default', 'React'],
              'useState',
              'useEffect',
              'useContext',
              'useReducer',
              'useCallback',
              'useMemo',
              'useRef',
              'useImperativeHandle',
              'useLayoutEffect',
              'useDebugValue',
              'useDeferredValue',
              'useId',
              'useInsertionEffect',
              'useSyncExternalStore',
              'useTransition',
              'startTransition',
              'lazy',
              'memo',
              'forwardRef',
              'createContext',
              'createElement',
              'cloneElement',
              'isValidElement',
            ],
          },
          {
            'react-router-dom': [
              'useNavigate',
              'useLocation',
              'useParams',
              'useSearchParams',
              'Link',
              'NavLink',
              'Navigate',
              'Outlet',
            ],
          },
          {
            'react-i18next': ['useTranslation', 'Trans'],
          },
        ],
        dts: true,
      }),
    ],
    base,
    build: {
      sourcemap: true,
      outDir: 'out',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  }
})
