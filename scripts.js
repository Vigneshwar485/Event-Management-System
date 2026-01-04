let user = null;
const additionalEvents = [
    {
        title: "CodeFest Bangalore 2025",
        date: "May 5-6, 2025",
        prize: "₹1,00,000",
        type: "hackathon",
        theme: "Robotics",
        location: "bangalore",
        link: "https://example.com/codefest"
    },
    {
        title: "IdeaSpark Chennai",
        date: "May 10, 2025",
        prize: "₹50,000",
        type: "ideathon",
        theme: "Sustainability",
        location: "chennai",
        link: "https://example.com/ideaspark"
    },
    {
        title: "TechSprint Hyderabad",
        date: "May 15-16, 2025",
        prize: "₹2,00,000",
        type: "hackathon",
        theme: "AI Solutions",
        location: "hyderabad",
        link: "https://example.com/techsprint"
    }
];
let loadedEventIndex = 0;

const resourceTemplates = {
    hackathon: { title: "Hackathon Guide", desc: "Win any hackathon.", file: "hackathon-guide.pdf" },
    ideathon: { title: "Ideathon Tips", desc: "Master brainstorming.", file: "ideathon-tips.pdf" },
    coding: { title: "Coding Blueprint", desc: "Ace coding challenges.", file: "coding-blueprint.pdf" },
    ai: { title: "AI Workshop Guide", desc: "Master AI concepts.", file: "ai-guide.pdf" },
    webdev: { title: "Web Dev Bootcamp Notes", desc: "Learn React & Node.js.", file: "webdev-notes.pdf" },
    blockchain: { title: "Blockchain Basics", desc: "Understand smart contracts.", file: "blockchain-basics.pdf" }
};

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('#dark-mode');
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    });
});
document.getElementById('home').style.display = 'block';

// Student and Volunteer Button Navigation
document.getElementById('student-btn').addEventListener('click', () => {
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('events').style.display = 'block';
});

document.getElementById('volunteer-btn').addEventListener('click', () => {
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('volunteers').style.display = 'block';
});

// Event Filtering
const searchBar = document.querySelector('#search-bar');
const locationFilter = document.querySelector('#location-filter');
const typeFilter = document.querySelector('#type-filter');
let eventCards = document.querySelectorAll('.event-card');

function filterEvents(cards = eventCards) {
    const search = searchBar.value.toLowerCase();
    const location = locationFilter.value;
    const type = typeFilter.value;

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const cardLocation = card.getAttribute('data-location');
        const cardType = card.getAttribute('data-type');

        const searchMatch = title.includes(search) || search.includes(cardLocation);
        const locationMatch = location === 'all' || location === cardLocation;
        const typeMatch = type === 'all' || type === cardType;

        card.style.display = searchMatch && locationMatch && typeMatch ? 'block' : 'none';
    });
}

searchBar.addEventListener('input', () => filterEvents());
locationFilter.addEventListener('change', () => filterEvents());
typeFilter.addEventListener('change', () => filterEvents());

// Load More Events
const loadMore = document.querySelector('.load-more');
loadMore.addEventListener('click', () => {
    if (loadedEventIndex < additionalEvents.length) {
        const event = additionalEvents[loadedEventIndex];
        const newEvent = document.createElement('div');
        newEvent.className = 'event-card';
        newEvent.setAttribute('data-location', event.location);
        newEvent.setAttribute('data-type', event.type);
        newEvent.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date} | Prize: ${event.prize}</p>
            <p>Type: ${event.type.charAt(0).toUpperCase() + event.type.slice(1)} | Theme: ${event.theme}</p>
            <a href="${event.link}" target="_blank" class="cta-primary">Register</a>
        `;
        document.querySelector('.event-grid').appendChild(newEvent);
        eventCards = document.querySelectorAll('.event-card');
        filterEvents();
        loadedEventIndex++;
        if (loadedEventIndex === additionalEvents.length) {
            loadMore.textContent = "No More Events";
            loadMore.disabled = true;
        }
    }
});

// Scroll Animation
function handleScroll() {
    const elements = document.querySelectorAll('.scroll-anim');
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

function switchModal(modalId) {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    });
    setTimeout(() => openModal(modalId), 350);
}

// Signup
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    user = {
        name: document.getElementById('signup-name').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value,
        skills: document.getElementById('signup-skills').value,
        interests: document.getElementById('signup-interests').value,
        bio: document.getElementById('signup-bio').value,
        location: document.getElementById('signup-location').value,
        achievements: ["Signed up for HackSphere"],
        projects: []
    };
    localStorage.setItem('user', JSON.stringify(user));
    updateProfile();
    updateAuthUI();
    closeModal('signup-modal');
});

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        user = storedUser;
        updateProfile();
        updateAuthUI();
        closeModal('login-modal');
    } else {
        alert('Invalid email or password');
    }
});

// Update Profile
function updateProfile() {
    if (user) {
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;
        document.getElementById('profile-skills').textContent = user.skills || 'Not specified';
        document.getElementById('profile-interests').textContent = user.interests || 'Not specified';
        document.getElementById('profile-bio').textContent = user.bio || 'Not specified';
        document.getElementById('profile-location').textContent = user.location || 'Not specified';

        const achievementsList = document.getElementById('profile-achievements');
        achievementsList.innerHTML = '';
        user.achievements.forEach(ach => {
            const li = document.createElement('li');
            li.textContent = ach;
            achievementsList.appendChild(li);
        });

        const projectsList = document.getElementById('profile-projects');
        projectsList.innerHTML = '';
        user.projects.forEach(proj => {
            const li = document.createElement('li');
            li.textContent = proj;
            projectsList.appendChild(li);
        });
    }
}

// Logout
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    user = null;
    localStorage.removeItem('user');
    updateAuthUI();
    sections.forEach(section => section.style.display = 'none');
    document.getElementById('home').style.display = 'block';
});

// Profile Link
document.getElementById('profile-link').addEventListener('click', (e) => {
    e.preventDefault();
    if (user) {
        sections.forEach(section => section.style.display = 'none');
        document.getElementById('profile').style.display = 'block';
        updateProfile();
    } else {
        openModal('login-modal');
    }
});

// Update Auth UI
function updateAuthUI() {
    const authRequired = document.querySelectorAll('.auth-required');
    if (user) {
        authRequired.forEach(link => link.style.display = 'block');
        document.getElementById('logout-link').style.display = 'block';
    } else {
        authRequired.forEach(link => link.style.display = 'none');
        document.getElementById('logout-link').style.display = 'none';
    }
}

// Fetch Events
async function fetchEvents() {
    try {
        // Replace with actual API endpoint
        const response = await fetch('https://api.example.com/events');
        const events = await response.json();
        updateEventsSection(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        updateEventsSection(additionalEvents); // Fallback to static data
    }
}

function updateEventsSection(events) {
    const eventGrid = document.querySelector('.event-grid');
    eventGrid.innerHTML = '';
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.setAttribute('data-location', event.location);
        eventCard.setAttribute('data-type', event.type);
        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${event.date} | Prize: ${event.prize}</p>
            <p>Type: ${event.type.charAt(0).toUpperCase() + event.type.slice(1)} | Theme: ${event.theme}</p>
            <a href="${event.link}" target="_blank" class="cta-primary">Register</a>
        `;
        eventGrid.appendChild(eventCard);
    });
    eventCards = document.querySelectorAll('.event-card');
    filterEvents();
}

// Fetch Resources
async function fetchResources() {
    try {
        // Simulate AI API call
        const response = await Promise.resolve(Object.values(resourceTemplates));
        updateResourcesSection(response);
    } catch (error) {
        console.error('Error fetching resources:', error);
        updateResourcesSection(Object.values(resourceTemplates));
    }
}

function updateResourcesSection(resources) {
    const resourceGrid = document.getElementById('resource-grid');
    resourceGrid.innerHTML = '';
    resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <h3>${resource.title}</h3>
            <p>${resource.desc}</p>
            <a href="/resources/${resource.file}" class="cta-secondary" download>Download</a>
        `;
        resourceGrid.appendChild(resourceCard);
    });
}

// Login Link
document.querySelectorAll('.login-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('login-modal');
    });
});

// Signup Link
document.querySelectorAll('.signup-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('signup-modal');
    });
});

// Initialize
window.addEventListener('load', () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        user = storedUser;
        updateAuthUI();
    }
    fetchEvents();
    fetchResources();
});