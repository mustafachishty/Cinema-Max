// Movie data with online images
const movies = [
    {
        id: 1,
        title: "Avengers: Endgame",
        genre: "Action, Adventure, Drama",
        rating: 4.8,
        description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        price: 12,
        showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Action, Crime, Drama",
        rating: 4.9,
        description: "Batman faces his greatest challenge yet as the Joker wreaks havoc on Gotham City, testing the Dark Knight's resolve and moral code.",
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        price: 10,
        showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"]
    },
    {
        id: 3,
        title: "Inception",
        genre: "Action, Sci-Fi, Thriller",
        rating: 4.7,
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into a CEO's mind.",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        price: 11,
        showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"]
    },
    {
        id: 4,
        title: "Interstellar",
        genre: "Adventure, Drama, Sci-Fi",
        rating: 4.6,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a dying Earth.",
        poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        price: 13,
        showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"]
    },
    {
        id: 5,
        title: "Spider-Man: No Way Home",
        genre: "Action, Adventure, Fantasy",
        rating: 4.5,
        description: "Spider-Man's identity is revealed, and he asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds appear.",
        poster: "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        price: 14,
        showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"]
    },
    {
        id: 6,
        title: "Dune",
        genre: "Adventure, Drama, Sci-Fi",
        rating: 4.4,
        description: "Paul Atreides leads nomadic tribes in a revolt against the galactic emperor and his father's evil nemesis on the desert planet Arrakis.",
        poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        price: 12,
        showtimes: ["1:00 PM", "4:30 PM", "8:00 PM", "11:30 PM"]
    }
];

// Global variables
let selectedMovie = null;
let selectedSeats = [];
let selectedShowtime = null;

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    initializeNavigation();
    loadStoredData();
});

// Load movies into the grid
function loadMovies() {
    if (!moviesGrid) return;
    
    moviesGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
    
    // Add animation delay to cards
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Create movie card element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.onclick = () => selectMovie(movie.id);
    
    const stars = '★'.repeat(Math.floor(movie.rating)) + '☆'.repeat(5 - Math.floor(movie.rating));
    
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-genre">${movie.genre}</p>
            <div class="movie-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">${movie.rating}/5</span>
            </div>
            <p class="movie-description">${movie.description}</p>
            <button class="book-button">
                <i class="fas fa-ticket-alt"></i>
                Book Now - $${movie.price}
            </button>
        </div>
    `;
    
    return card;
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Remove any existing event listeners
        hamburger.replaceWith(hamburger.cloneNode(true));
        const newHamburger = document.querySelector('.hamburger');
        
        newHamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            newHamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !newHamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                newHamburger.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });
    
    // Logo click animation
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            logo.style.animation = 'logoClick 0.6s ease';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 300);
        });
    }
}

// Smooth scroll to movies section
function scrollToMovies() {
    const moviesSection = document.getElementById('movies');
    if (moviesSection) {
        moviesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Select movie and navigate to details
function selectMovie(movieId) {
    selectedMovie = movies.find(movie => movie.id === movieId);
    localStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
    window.location.href = 'movie-details.html';
}

// Select showtime
function selectShowtime(time) {
    selectedShowtime = time;
    localStorage.setItem('selectedShowtime', time);
    
    // Update UI
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Enable proceed button
    const proceedBtn = document.querySelector('.proceed-button');
    if (proceedBtn) {
        proceedBtn.disabled = false;
    }
}

// Navigate to seat selection
function proceedToSeats() {
    if (selectedShowtime) {
        window.location.href = 'seat-selection.html';
    }
}

// Seat selection functionality
function initializeSeatSelection() {
    const seatsGrid = document.querySelector('.seats-grid');
    if (!seatsGrid) return;
    
    // Generate seats (10x8 = 80 seats)
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 10; col++) {
            const seat = document.createElement('button');
            seat.className = 'seat available';
            seat.dataset.row = row;
            seat.dataset.col = col;
            seat.dataset.seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
            
            // Randomly make some seats occupied
            if (Math.random() < 0.3) {
                seat.classList.remove('available');
                seat.classList.add('occupied');
            } else {
                seat.addEventListener('click', () => toggleSeat(seat));
            }
            
            seatsGrid.appendChild(seat);
        }
    }
    
    updateBookingSummary();
}

// Toggle seat selection
function toggleSeat(seat) {
    if (seat.classList.contains('occupied')) return;
    
    const seatId = seat.dataset.seatId;
    
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
        seat.classList.add('selected');
        selectedSeats.push(seatId);
    }
    
    updateBookingSummary();
}

// Update booking summary
function updateBookingSummary() {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));
    const showtime = localStorage.getItem('selectedShowtime');
    
    if (!movie) return;
    
    const ticketCount = selectedSeats.length;
    const subtotal = ticketCount * movie.price;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const summaryHTML = `
        <div class="summary-row">
            <span>Movie:</span>
            <span>${movie.title}</span>
        </div>
        <div class="summary-row">
            <span>Showtime:</span>
            <span>${showtime || 'Not selected'}</span>
        </div>
        <div class="summary-row">
            <span>Seats:</span>
            <span>${selectedSeats.join(', ') || 'None selected'}</span>
        </div>
        <div class="summary-row">
            <span>Tickets:</span>
            <span>${ticketCount} × $${movie.price}</span>
        </div>
        <div class="summary-row">
            <span>Tax:</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
    
    const bookingSummary = document.querySelector('.booking-summary');
    if (bookingSummary) {
        bookingSummary.innerHTML = summaryHTML;
    }
    
    // Enable/disable proceed button
    const proceedBtn = document.querySelector('.proceed-button');
    if (proceedBtn) {
        proceedBtn.disabled = selectedSeats.length === 0;
    }
}

// Proceed to order summary
function proceedToOrder() {
    if (selectedSeats.length > 0) {
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
        window.location.href = 'order-summary.html';
    }
}

// Load order summary
function loadOrderSummary() {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));
    const showtime = localStorage.getItem('selectedShowtime');
    const seats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if (!movie || !seats) {
        window.location.href = 'index.html';
        return;
    }
    
    const ticketCount = seats.length;
    const subtotal = ticketCount * movie.price;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const orderDetails = document.querySelector('.order-details');
    if (orderDetails) {
        orderDetails.innerHTML = `
            <div class="detail-row">
                <span>Movie:</span>
                <span>${movie.title}</span>
            </div>
            <div class="detail-row">
                <span>Showtime:</span>
                <span>${showtime}</span>
            </div>
            <div class="detail-row">
                <span>Seats:</span>
                <span>${seats.join(', ')}</span>
            </div>
            <div class="detail-row">
                <span>Tickets:</span>
                <span>${ticketCount} × $${movie.price} = $${subtotal.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span>Tax (10%):</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span>Total Amount:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
    }
}

// Confirm booking
function confirmBooking() {
    // Generate booking ID
    const bookingId = 'BK' + Date.now().toString().slice(-6);
    localStorage.setItem('bookingId', bookingId);
    window.location.href = 'confirmation.html';
}

// Load confirmation details
function loadConfirmation() {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));
    const showtime = localStorage.getItem('selectedShowtime');
    const seats = JSON.parse(localStorage.getItem('selectedSeats'));
    const bookingId = localStorage.getItem('bookingId');
    
    if (!movie || !seats || !bookingId) {
        window.location.href = 'index.html';
        return;
    }
    
    const ticketCount = seats.length;
    const subtotal = ticketCount * movie.price;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    const orderDetails = document.querySelector('.order-details');
    if (orderDetails) {
        orderDetails.innerHTML = `
            <div class="detail-row">
                <span>Booking ID:</span>
                <span>${bookingId}</span>
            </div>
            <div class="detail-row">
                <span>Movie:</span>
                <span>${movie.title}</span>
            </div>
            <div class="detail-row">
                <span>Showtime:</span>
                <span>${showtime}</span>
            </div>
            <div class="detail-row">
                <span>Seats:</span>
                <span>${seats.join(', ')}</span>
            </div>
            <div class="detail-row">
                <span>Total Paid:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
    }
}

// Go back to previous page
function goBack() {
    window.history.back();
}

// Start new booking
function newBooking() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// Load stored data
function loadStoredData() {
    const storedMovie = localStorage.getItem('selectedMovie');
    const storedShowtime = localStorage.getItem('selectedShowtime');
    const storedSeats = localStorage.getItem('selectedSeats');
    
    if (storedMovie) {
        selectedMovie = JSON.parse(storedMovie);
    }
    
    if (storedShowtime) {
        selectedShowtime = storedShowtime;
    }
    
    if (storedSeats) {
        selectedSeats = JSON.parse(storedSeats);
    }
}

// Load movie details
function loadMovieDetails() {
    const movie = JSON.parse(localStorage.getItem('selectedMovie'));
    if (!movie) {
        window.location.href = 'index.html';
        return;
    }
    
    document.title = `${movie.title} - CinemaMax`;
    
    const movieHero = document.querySelector('.movie-hero');
    if (movieHero) {
        const stars = '★'.repeat(Math.floor(movie.rating)) + '☆'.repeat(5 - Math.floor(movie.rating));
        
        movieHero.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster-large">
            <div class="movie-details-content">
                <h1 class="movie-title-large">${movie.title}</h1>
                <div class="movie-meta">
                    <div class="meta-item">
                        <i class="fas fa-tags"></i>
                        <span>${movie.genre}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}/5</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>$${movie.price}</span>
                    </div>
                </div>
                <p class="movie-description-large">${movie.description}</p>
                <div class="showtimes">
                    <h3><i class="fas fa-clock"></i> Showtimes</h3>
                    <div class="time-slots">
                        ${movie.showtimes.map(time => 
                            `<button class="time-slot" onclick="selectShowtime('${time}')">${time}</button>`
                        ).join('')}
                    </div>
                </div>
                <button class="proceed-button" onclick="proceedToSeats()" disabled>
                    <i class="fas fa-arrow-right"></i>
                    Select Seats
                </button>
            </div>
        `;
    }
}

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes logoClick {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(10deg); }
        50% { transform: scale(1.1) rotate(-5deg); }
        75% { transform: scale(1.15) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
`;
document.head.appendChild(style);