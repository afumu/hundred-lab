# Hundred Lab Site

这是百创计划的展示站点，基于 Astro 构建，用来统一展示本仓库里的正式内容和外部 GitHub 仓库。

## 本地预览

```bash
cd /Users/apple/workplace-py/hundred-lab/site
npm install
npm run dev
```

默认访问地址：

- `http://127.0.0.1:4321/`

## 本地构建

```bash
cd /Users/apple/workplace-py/hundred-lab/site
npm run build:local
npm run preview
```

## GitHub Pages

- 正式发布使用仓库根目录下的 GitHub Actions 工作流：
  - `.github/workflows/deploy-site.yml`
- 默认发布目录为 `site/dist`
