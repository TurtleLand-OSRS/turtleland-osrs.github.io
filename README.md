# Turtleland website

Source repository: https://github.com/chalkyracedude/Turtleland-Website

Official website: https://turtleland-osrs.github.io/

This is a buildless static website. Edit `index.html`, `styles.css`, `download.js`,
and `assets/`, then commit the changes to `main`.

## Publishing from this checkout

Double-click `Publish-Website.bat` after committing. It pushes `main` first to
`origin` (the personal source repository), then to `publishing` (the organization
repository). GitHub Pages publishes the organization repository's `main` branch
from its root. Keeping that publishing repository preserves the official URL.
The script refuses to publish uncommitted changes or a different branch and
reports either push failing. It never force-pushes.

Remotes:

- `origin`: https://github.com/chalkyracedude/Turtleland-Website.git
- `publishing`: https://github.com/TurtleLand-OSRS/turtleland-osrs.github.io.git

A normal push to `origin` saves source only; run the publishing batch to update
both repositories and the live site. If cloning again, restore the publishing
remote with `git remote add publishing https://github.com/TurtleLand-OSRS/turtleland-osrs.github.io.git`.

Preview locally with `py -3 -m http.server 8000`, then visit http://localhost:8000.
