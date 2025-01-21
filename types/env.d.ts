/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_MODE: 'dev' | 'test' | 'prod'
  readonly VITE_API_DOMAIN: string
  readonly VITE_API_BASE_PATH: string
}
interface ImportMeta {
  /**
   * @property VITE_MODE 自定义mode
   */
  readonly env: ImportMetaEnv
}
