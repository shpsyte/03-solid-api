import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/__test__/e2e/**', 'prisma']],
    dir: 'src', // Essa linha
  },
})
