/* Start Projects */
let projectsContainer = document.getElementById("projects");
let loadingElement = document.getElementById("loading");
let errorMessage = document.getElementById("error-message");

// Function to fetch projects
async function getProjects() {
    try {
        let response = await fetch("db.json");
        let data = await response.json();
        return data.projects;
    } catch (error) {
        errorMessage.style.display = "block";
    }
}

// Function to open the modal with project details
function openModal(title, imageUrl, summary, liveDemo, sourceCode, technologies, features) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImage').src = imageUrl;
    document.getElementById('modalDescription').textContent = summary;
    document.getElementById('liveDemoLink').href = liveDemo;
    document.getElementById('sourceCodeLink').href = sourceCode;

    // Populate Technologies Used
    const technologiesList = document.getElementById('modalTechnologies');
    technologiesList.innerHTML = '';
    technologies.forEach(tech => {
        technologiesList.innerHTML += `<li class="badge bg-dark text-white me-2 mb-2">${tech}</li>`;
    });

    // Populate Key Features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    features.forEach(feature => {
        featuresList.innerHTML += `<li><i class="bi bi-check-circle-fill text-success me-2"></i>${feature}</li>`;
    });

    // Show the Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}


// Load projects on window load
window.onload = async () => {
    let projects = await getProjects();
    projects.forEach(project => {
        let projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="#" class="btn">View Details</a>
        `;

        // Add click event to open the modal
        projectCard.querySelector('.btn').addEventListener('click', (e) => {
            e.preventDefault();
            openModal(
                project.title,
                project.image,
                project.summary,
                project.liveDemo,
                project.sourceCode,
                project.technologies,
                project.features
            );
        });

        projectsContainer.appendChild(projectCard);
        loadingElement.textContent = ""
    });
};
/* End Projects  */