document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navLinks = document.querySelectorAll('.admin-nav a');
    const sections = document.querySelectorAll('.content-area section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active-section'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active-section');
        });
    });
    
    // Load sample video data
    loadSampleVideos();
    loadSampleTikTokVideos();
    
    // Modal functionality
    const addVideoBtn = document.getElementById('add-video-btn');
    const addTikTokBtn = document.getElementById('add-tiktok-btn');
    const addVideoModal = document.getElementById('add-video-modal');
    const addTikTokModal = document.getElementById('add-tiktok-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    if (addVideoBtn) {
        addVideoBtn.addEventListener('click', function() {
            addVideoModal.style.display = 'block';
        });
    }
    
    if (addTikTokBtn) {
        addTikTokBtn.addEventListener('click', function() {
            addTikTokModal.style.display = 'block';
        });
    }
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addVideoModal.style.display = 'none';
            addTikTokModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === addVideoModal) {
            addVideoModal.style.display = 'none';
        }
        if (e.target === addTikTokModal) {
            addTikTokModal.style.display = 'none';
        }
    });
    
    // Form submissions
    const addVideoForm = document.getElementById('add-video-form');
    const addTikTokForm = document.getElementById('add-tiktok-form');
    
    if (addVideoForm) {
        addVideoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('video-title').value;
            const description = document.getElementById('video-description').value;
            const category = document.getElementById('video-category').value;
            const thumbnail = document.getElementById('video-thumbnail').value;
            const videoUrl = document.getElementById('video-url').value;
            const directLink = document.getElementById('direct-link').value;
            const isTrending = document.getElementById('trending-checkbox').checked;
            
            // Create new video object
            const newVideo = {
                id: Date.now(), // Use timestamp as temporary ID
                title: title,
                description: description,
                category: category,
                thumbnail: thumbnail,
                videoUrl: videoUrl,
                directLink: directLink,
                trending: isTrending,
                date: new Date().toISOString().split('T')[0],
                views: 0
            };
            
            // Add to table (in a real app, you would save to database)
            addVideoToTable(newVideo);
            
            // Reset form and close modal
            addVideoForm.reset();
            addVideoModal.style.display = 'none';
            
            // Show success message
            alert('Video added successfully!');
        });
    }
    
    if (addTikTokForm) {
        addTikTokForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('tiktok-title').value;
            const videoUrl = document.getElementById('tiktok-video-url').value;
            const directLink = document.getElementById('tiktok-direct-link').value;
            
            // Create new TikTok video object
            const newTikTokVideo = {
                id: Date.now(), // Use timestamp as temporary ID
                title: title,
                videoUrl: videoUrl,
                directLink: directLink,
                date: new Date().toISOString().split('T')[0],
                likes: 0,
                shares: 0
            };
            
            // Add to table (in a real app, you would save to database)
            addTikTokVideoToTable(newTikTokVideo);
            
            // Reset form and close modal
            addTikTokForm.reset();
            addTikTokModal.style.display = 'none';
            
            // Show success message
            alert('TikTok video added successfully!');
        });
    }
});

// Function to load sample videos
function loadSampleVideos() {
    const sampleVideos = [
        {
            id: 1,
            title: 'Sample Video 1',
            description: 'This is a sample video description',
            category: 'entertainment',
            thumbnail: 'https://via.placeholder.com/300x169',
            videoUrl: 'https://example.com/video1.mp4',
            directLink: 'https://example.com/video1',
            trending: true,
            date: '2023-10-15',
            views: 1245
        },
        {
            id: 2,
            title: 'Sample Video 2',
            description: 'Another sample video description',
            category: 'music',
            thumbnail: 'https://via.placeholder.com/300x169',
            videoUrl: 'https://example.com/video2.mp4',
            directLink: 'https://example.com/video2',
            trending: false,
            date: '2023-10-14',
            views: 876
        },
        {
            id: 3,
            title: 'Sample Video 3',
            description: 'Yet another sample video',
            category: 'sports',
            thumbnail: 'https://via.placeholder.com/300x169',
            videoUrl: 'https://example.com/video3.mp4',
            directLink: 'https://example.com/video3',
            trending: true,
            date: '2023-10-13',
            views: 2345
        }
    ];
    
    const videoTableBody = document.getElementById('video-table-body');
    if (videoTableBody) {
        sampleVideos.forEach(video => {
            addVideoToTable(video);
        });
    }
}

// Function to load sample TikTok videos
function loadSampleTikTokVideos() {
    const sampleTikTokVideos = [
        {
            id: 1,
            title: 'TikTok Sample 1',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-mother-with-her-little-daughter-decorating-a-christmas-tree-39745-large.mp4',
            directLink: 'https://example.com/tiktok1',
            date: '2023-10-15',
            likes: 1245,
            shares: 324
        },
        {
            id: 2,
            title: 'TikTok Sample 2',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
            directLink: 'https://example.com/tiktok2',
            date: '2023-10-14',
            likes: 2341,
            shares: 532
        },
        {
            id: 3,
            title: 'TikTok Sample 3',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
            directLink: 'https://example.com/tiktok3',
            date: '2023-10-13',
            likes: 5432,
            shares: 765
        }
    ];
    
    const tiktokTableBody = document.getElementById('tiktok-table-body');
    if (tiktokTableBody) {
        sampleTikTokVideos.forEach(video => {
            addTikTokVideoToTable(video);
        });
    }
}

// Function to add a video to the table
function addVideoToTable(video) {
    const videoTableBody = document.getElementById('video-table-body');
    if (!videoTableBody) return;
    
    const row = document.createElement('tr');
    row.setAttribute('data-id', video.id);
    
    row.innerHTML = `
        <td><img src="${video.thumbnail}" alt="${video.title}"></td>
        <td>${video.title}</td>
        <td>${video.category}</td>
        <td>${video.date}</td>
        <td>${video.views}</td>
        <td>
            <div class="action-icons">
                <button class="edit-btn" onclick="editVideo(${video.id})"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteVideo(${video.id})"><i class="fas fa-trash"></i></button>
            </div>
        </td>
    `;
    
    videoTableBody.appendChild(row);
}

// Function to add a TikTok video to the table
function addTikTokVideoToTable(video) {
    const tiktokTableBody = document.getElementById('tiktok-table-body');
    if (!tiktokTableBody) return;
    
    const row = document.createElement('tr');
    row.setAttribute('data-id', video.id);
    
    // Create a video preview element
    const videoPreview = document.createElement('video');
    videoPreview.src = video.videoUrl;
    videoPreview.width = 80;
    videoPreview.height = 140;
    videoPreview.style.objectFit = 'cover';
    videoPreview.style.borderRadius = '4px';
    videoPreview.muted = true;
    
    // Add mouseover and mouseout events for preview
    const previewCell = document.createElement('td');
    previewCell.appendChild(videoPreview);
    previewCell.addEventListener('mouseover', function() {
        videoPreview.play();
    });
    previewCell.addEventListener('mouseout', function() {
        videoPreview.pause();
        videoPreview.currentTime = 0;
    });
    
    row.appendChild(previewCell);
    
    // Add other cells
    const titleCell = document.createElement('td');
    titleCell.textContent = video.title;
    row.appendChild(titleCell);
    
    const dateCell = document.createElement('td');
    dateCell.textContent = video.date;
    row.appendChild(dateCell);
    
    const likesCell = document.createElement('td');
    likesCell.textContent = video.likes;
    row.appendChild(likesCell);
    
    const sharesCell = document.createElement('td');
    sharesCell.textContent = video.shares;
    row.appendChild(sharesCell);
    
    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
        <div class="action-icons">
            <button class="edit-btn" onclick="editTikTokVideo(${video.id})"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteTikTokVideo(${video.id})"><i class="fas fa-trash"></i></button>
        </div>
    `;
    row.appendChild(actionsCell);
    
    tiktokTableBody.appendChild(row);
}

// Function to edit a video
function editVideo(id) {
    // In a real application, you would fetch the video data from the server
    // For now, we'll just show an alert
    alert(`Editing video with ID: ${id}`);
    
    // Open the edit modal (in a real app)
    // Populate the form with the video data
    // Handle form submission to update the video
}

// Function to delete a video
function deleteVideo(id) {
    if (confirm('Are you sure you want to delete this video?')) {
        // In a real application, you would send a request to the server to delete the video
        // For now, we'll just remove the row from the table
        const row = document.querySelector(`#video-table-body tr[data-id="${id}"]`);
        if (row) {
            row.remove();
        }
    }
}

// Function to edit a TikTok video
function editTikTokVideo(id) {
    // In a real application, you would fetch the TikTok video data from the server
    // For now, we'll just show an alert
    alert(`Editing TikTok video with ID: ${id}`);
    
    // Open the edit modal (in a real app)
    // Populate the form with the TikTok video data
    // Handle form submission to update the TikTok video
}

// Function to delete a TikTok video
function deleteTikTokVideo(id) {
    if (confirm('Are you sure you want to delete this TikTok video?')) {
        // In a real application, you would send a request to the server to delete the TikTok video
        // For now, we'll just remove the row from the table
        const row = document.querySelector(`#tiktok-table-body tr[data-id="${id}"]`);
        if (row) {
            row.remove();
        }
    }
}