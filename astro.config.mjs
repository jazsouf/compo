// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Compo - Astro components",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/jazsouf/compo" }],
      sidebar: [
        {
          label: "Getting Starter",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Introduction", slug: "guides/introduction" },
          ],
        },
        {
          label: "Components",
          autogenerate: { directory: "components" },
        },
      ],
    }),
  ],
});
