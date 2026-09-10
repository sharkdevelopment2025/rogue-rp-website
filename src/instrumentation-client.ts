function stripCursorRefs(root: ParentNode = document) {
  if (root instanceof Element) {
    root.removeAttribute("data-cursor-ref");
  }

  for (const node of root.querySelectorAll("[data-cursor-ref]")) {
    node.removeAttribute("data-cursor-ref");
  }
}

try {
  stripCursorRefs();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.target instanceof Element) {
        mutation.target.removeAttribute("data-cursor-ref");
      }

      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          stripCursorRefs(node);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["data-cursor-ref"],
  });

  window.addEventListener(
    "load",
    () => {
      window.setTimeout(() => observer.disconnect(), 2000);
    },
    { once: true },
  );
} catch {
  // Preview attributes must not block the site from hydrating.
}
