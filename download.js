const downloadButton = document.querySelector('[data-download]');
const downloadStatus = document.querySelector('[data-download-status]');
const repository = 'chalkyracedude/Turtleland-OSRS-DB-Releases';

async function findInstaller() {
  const response = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Release lookup failed');

  const release = await response.json();
  const installer = release.assets?.find(asset =>
    /^Turtleland_OSRS_DB_.*_Setup\.exe$/i.test(asset.name)
  );
  if (!installer) throw new Error('Installer not available');

  const url = new URL(installer.browser_download_url);
  if (url.origin !== 'https://github.com' ||
      !url.pathname.startsWith(`/${repository}/releases/download/`)) {
    throw new Error('Unexpected download location');
  }
  return url.href;
}

// Resolve on click so each download checks the latest published release.
downloadButton.addEventListener('click', async event => {
  event.preventDefault();
  if (downloadButton.getAttribute('aria-busy') === 'true') return;

  downloadButton.setAttribute('aria-busy', 'true');
  downloadStatus.textContent = 'Finding the latest Windows installer…';
  try {
    const url = await findInstaller();
    downloadStatus.textContent = 'Your download is starting. Thanks for trying Turtleland!';
    window.location.assign(url);
  } catch {
    downloadStatus.textContent = 'The download could not start. Please try again, or use Release notes above.';
  } finally {
    downloadButton.removeAttribute('aria-busy');
  }
});
