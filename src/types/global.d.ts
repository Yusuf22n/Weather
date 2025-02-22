declare module "tailwindcss" {
  import { Plugin } from "postcss";
  const tailwindcss: () => Plugin;
  export default tailwindcss;
}
