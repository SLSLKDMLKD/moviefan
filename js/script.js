document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Fetch and display videos
    fetchVideos();
    
    // Setup search form
    setupSearchForm();
});

// Function to fetch videos from the server/database
function fetchVideos() {
    // This would normally be an API call to your backend
    // For now, we'll use sample data
    const sampleVideos = [
        {
            id: 1,
            title: 'Sample Video 1',
            thumbnail: 'https://via.placeholder.com/300x169',
            directLink: 'https://example.com/video1',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4',
            date: '2023-10-15',
            trending: true
        },
        {
            id: 2,
            title: 'Sample Video 2',
            thumbnail: 'https://via.placeholder.com/300x169',
            directLink: 'https://example.com/video2',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
            date: '2023-10-14',
            trending: false
        },
        {
            id: 3,
            title: 'Sample Video 3',
            thumbnail: 'https://via.placeholder.com/300x169',
            directLink: 'https://example.com/video3',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
            date: '2023-10-13',
            trending: true
        },
        {
            id: 4,
            title: 'Sample Video 4',
            thumbnail: 'https://via.placeholder.com/300x169',
            directLink: 'https://example.com/video4',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
            date: '2023-10-12',
            trending: false
        },
        {
            id: 5,
            title: 'Sample Video 5',
            thumbnail: 'https://via.placeholder.com/300x169',
            directLink: 'https://example.com/video5',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-through-forest-32807-large.mp4',
            date: '2023-10-11',
            trending: true
        },
        {
            id: 6,
            title: 'Sample Video 6',
            thumbnail: 'https://via.placeholder.com/300x169',
            directLink: 'https://example.com/video6',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-mother-with-her-little-daughter-decorating-a-christmas-tree-39745-large.mp4',
            date: '2023-10-10',
            trending: false
        }
    ];

    // Display featured videos
    const featuredVideosContainer = document.querySelector('.featured-videos .video-grid');
    if (featuredVideosContainer) {
        sampleVideos.forEach(video => {
            featuredVideosContainer.appendChild(createVideoCard(video));
        });
    }

    // Display new videos
    const newVideosContainer = document.querySelector('.new-videos .video-grid');
    if (newVideosContainer) {
        // Sort by date (newest first) and take first 4
        const newVideos = [...sampleVideos].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
        newVideos.forEach(video => {
            newVideosContainer.appendChild(createVideoCard(video));
        });
    }
}

// Function to create a video card element
function createVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    
    videoCard.innerHTML = `
        <div class="thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}">
            <button class="play-btn"><i class="fas fa-play"></i></button>
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <p>Added on ${formatDate(video.date)}</p>
        </div>
    `;
    
    // Add click event to open video in player page
    videoCard.addEventListener('click', function() {
        // Option 1: Open in player page
        window.location.href = `player.html?id=${video.id}`;
        
        // Option 2: Open direct link in new window (if user clicks the play button)
        const playBtn = videoCard.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the card click event
                window.open(video.directLink, '_blank');
            });
        }
    });
    
    return videoCard;
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Add this function to the script.js file

// Function to handle search form submission
function setupSearchForm() {
    const searchForms = document.querySelectorAll('.search-form');
    
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input[type="text"]');
            if (searchInput && searchInput.value.trim()) {
                // Redirect to search page with query parameter
                window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
            }
        });
    });
}