export function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  const normalizedChildren = Array.isArray(children) ? children : [children];

  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === 'className') {
      node.className = value;
      return;
    }

    if (key === 'text') {
      node.textContent = value;
      return;
    }

    if (key === 'style' && typeof value === 'object') {
      Object.assign(node.style, value);
      return;
    }

    if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
      return;
    }

    node.setAttribute(key, value);
  });

  normalizedChildren.filter(Boolean).forEach((child) => {
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  });

  return node;
}

export function button(label, className, onClick, attributes = {}) {
  return el(
    'button',
    {
      type: 'button',
      className,
      onClick,
      ...attributes,
    },
    label,
  );
}
