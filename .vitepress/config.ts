import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "IPO 위키",
  description: "IPO Information powered by Vue",
  base: process.env.NODE_ENV === 'production' ? '/ipowiki/' : '/',
  outDir: './dist',
  themeConfig: {
    nav: [],
    docFooter: {
      prev: false,
      next: false
    },
    sidebar: [
      {
        text: '메뉴',
        items: [
          { text: '증권사', link: '/broker' },
          { text: '확정공고', link: '/stock' },
        ]
      }
    ],
  }
})
