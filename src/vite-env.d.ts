/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_PTU_URL: string;
  readonly VITE_API_LOCAL_URL: string;
  readonly VITE_CLOUDINARY_URL: string;
  readonly VITE_LOGIN: string;
  readonly VITE_PASSWORD: string;
  readonly VITE_PTU_LOGIN: string;
  readonly VITE_PTU_PASSWORD: string;
  readonly VITE_GEAR_LIVE_URL: string;
  readonly VITE_GEAR_PTU_URL: string;
  readonly VITE_GEAR_PTU_PASS: string;
  readonly VITE_GEAR_LIVE_PASS: string;
  readonly VITE_SHOP_LIVE_URL: string;
  readonly VITE_SHOP_PTU_URL: string;
  readonly VITE_SHOP_PTU_PASS: string;
  readonly VITE_SHOP_LIVE_PASS: string;
  readonly VITE_PTU_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
