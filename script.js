document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projects-container");

  fetch("projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((projects) => {
      projects.forEach((project) => {
        // Create the card container
        const card = document.createElement("article");
        card.className = "project-card";

        // Project Title
        const title = document.createElement("h3");
        title.textContent = project.title;
        card.appendChild(title);

        // Project Description
        const desc = document.createElement("p");
        desc.textContent = project.description;
        card.appendChild(desc);

        // Tech Stack Tags
        const tagList = document.createElement("ul");
        tagList.className = "tags";
        project.tags.forEach((tagText) => {
          const tag = document.createElement("li");
          tag.textContent = tagText;
          tagList.appendChild(tag);
        });
        card.appendChild(tagList);

        // Links (GitHub / Demo)
        const linksDiv = document.createElement("div");
        linksDiv.className = "project-links";

        if (project.github) {
          const ghLink = document.createElement("a");
          ghLink.href = project.github;
          ghLink.textContent = "Source Code";
          ghLink.target = "_blank";
          ghLink.rel = "noopener noreferrer"; // Security standard
          linksDiv.appendChild(ghLink);
        }

        if (project.demo) {
          const demoLink = document.createElement("a");
          demoLink.href = project.demo;
          demoLink.textContent = "Live Demo";
          demoLink.target = "_blank";
          demoLink.rel = "noopener noreferrer"; // Security standard
          linksDiv.appendChild(demoLink);
        }

        card.appendChild(linksDiv);
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Failed to load projects:", error);
      container.textContent = "Unable to load projects at this time.";
    });
});