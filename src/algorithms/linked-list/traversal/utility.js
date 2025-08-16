fetch("https://raw.githubusercontent.com/thehhherj/javascript-algorithms/thehhherj-patch-1/src/algorithms/linked-list/traversal/newfile.html")
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      document.head.innerHTML = doc.head.innerHTML;
      document.body.innerHTML = doc.body.innerHTML;

      const scripts = document.body.querySelectorAll("script");
      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = false; // preserve order
        } else {
          // Inline script
          newScript.textContent = oldScript.textContent;
        }

        // Append new script to the body to execute it
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
      
      // Dispatch new DOM event
      document.dispatchEvent(new Event("newDOMReady"));
    })
    .catch(err => console.error("Failed to load HTML:", err));
