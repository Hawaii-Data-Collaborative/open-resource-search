export function onCopyToClipboard(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = `${rect.bottom + 8}px`;
  div.style.left = `${rect.left + rect.width / 2}px`;
  div.style.transform = 'translateX(-50%)';
  div.style.padding = '4px 7px';
  div.style.borderRadius = '8px';
  div.style.backgroundColor = '#6c6c6c';
  div.style.color = '#eee';
  div.style.fontSize = '10px';
  div.style.fontWeight = '600';
  div.style.zIndex = '10000';
  div.textContent = 'Copied';
  document.body.appendChild(div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, 2000);
}
