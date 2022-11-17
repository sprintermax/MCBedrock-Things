/**
 * liveReload.js
 * Detects changes to UI files and triggers a reload.
 * Usage: <script async defer src="liveReload.js"></script>
 * @author CyberPon3 <cyber@code.horse>
 */
(() => {
  // Gets an array of elements by tag name
  const getTags = (name) => Array.from(document.getElementsByTagName(name));

  /**
   * Gets a list of files to watch. By default this the current HTML file and any linked JS or CSS files.
   */
  function getFilesToWatch() {
    return [
      // The current HTML file
      window.location.pathname,
      // Any linked scripts
      ...getTags("script")
        .filter((s) => s.src)
        .map((s) => s.src),
      // Any linked styles
      ...getTags("script")
        .filter((l) => l.rel === "stylesheet")
        .map((s) => s.href),
    ];
  }

  // A list of files to check
  const files = getFilesToWatch();

  // The amount of milliseconds to wait between checks
  const checkInterval = 100;

  // A list of each file's contents
  const fileContent = new Map();

  // Gets the contents of a file stored in the `<resource_pack>/experimental_ui/` directory.
  function fetchFile(path) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.addEventListener("load", () => resolve(req.responseText));
      req.addEventListener("error", (e) => reject(e));
      req.open("GET", `mod://${path}`);
      req.send();
    });
  }

  // Checks the contents of a file to see if it's changed
  function checkFileContent(file, content) {
    // Get the old content
    const oldContent = fileContent.get(file);
    // If we don't have any past content
    if (!oldContent) {
      // Save the content
      fileContent.set(file, content);
      return false;
    }
    // Return if the content is different
    return oldContent !== content;
  }

  // Checks the files for changes
  async function checkFiles() {
    // For each file
    for (const file of files) {
      try {
        // Fetch the content
        const newContent = await fetchFile(file);
        // If it's changed, schedule a refresh
        if (checkFileContent(file, newContent)) {
          setTimeout(() => window.location.reload(), 1000);
          return;
        }
      } catch (e) {
        // Ignore errors
      }
    }
    // Schedule another check
    setTimeout(checkFiles, checkInterval);
  }

  // Start the checker
  setTimeout(checkFiles, checkInterval);
})();
