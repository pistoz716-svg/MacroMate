# MacroMate Deployment Guide

## GitHub Pages Deployment

MacroMate is a static web app and can be deployed directly with GitHub Pages.

## Steps

1. Push the project to GitHub.

```bash
git add .
git commit -m "Update MacroMate"
git push
```

2. Open the GitHub repository.

3. Go to:

```txt
Settings → Pages
```

4. Set:

```txt
Source: Deploy from a branch
Branch: main
Folder: / root
```

5. Click Save.

6. Wait for GitHub Pages to deploy.

Live URL:

```txt
https://pistoz716-svg.github.io/MacroMate/
```

## Deployment Checklist

- Confirm `index.html` is in root.
- Confirm CSS path is correct.
- Confirm JS paths are correct.
- Confirm data files load before app.js.
- Confirm GitHub Pages is enabled.
- Confirm site works on mobile.
