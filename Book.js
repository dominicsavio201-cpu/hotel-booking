 // JavaScript for form validation and submission
        document.getElementById('bookingForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const form = event.target;
            const messageEl = document.getElementById('formMessage');
            messageEl.style.display = 'none';
            messageEl.textContent = '';
            messageEl.className = 'message';

            // Validate date logic: checkOut > checkIn
            const checkInDate = new Date(form.checkIn.value);
            const checkOutDate = new Date(form.checkOut.value);
            if (checkOutDate <= checkInDate) {
                messageEl.textContent = 'Check-Out date must be after Check-In date.';
                messageEl.classList.add('error');
                messageEl.style.display = 'block';
                return;
            }

            // Prepare data
            const bookingData = {
                fullName: form.fullName.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                checkIn: form.checkIn.value,
                checkOut: form.checkOut.value,
                roomType: form.roomType.value,
                specialRequests: form.specialRequests.value.trim()
            };

            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(bookingData)
                });

                const result = await response.json();

                if (response.ok) {
                    messageEl.textContent = 'Booking successful! Thank you.';
                    messageEl.classList.add('success');
                    form.reset();
                } else {
                    messageEl.textContent = result.error || 'Booking failed. Please try again.';
                    messageEl.classList.add('error');
                }
            } catch (error) {
                messageEl.textContent = 'Network error. Please try again later.';
                messageEl.classList.add('error');
            }

            messageEl.style.display = 'block';
        });
  




        // BACKEND NODE.JS
        
        

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, '/')));

// In-memory storage for bookings
const bookings = [];

// Helper function for basic validation
function validateBooking(data) {
    const { fullName, email, phone, checkIn, checkOut, roomType } = data;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
        return 'Full Name is required and must be at least 2 characters.';
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
        return 'Valid Email Address is required.';
    }

    if (!phone || typeof phone !== 'string' || !/^\+?[0-9\s\-]{7,15}$/.test(phone)) {
        return 'Valid Phone Number is required.';
    }

    if (!checkIn || !checkOut) {
        return 'Check-In and Check-Out dates are required.';
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
        return 'Invalid date format.';
    }

    if (checkOutDate <= checkInDate) {
        return 'Check-Out date must be after Check-In date.';
    }

    const validRoomTypes = ['Single', 'Double', 'Suite'];
    if (!roomType || !validRoomTypes.includes(roomType)) {
        return 'Invalid Room Type selected.';
    }

    return null;
}

// API endpoint to handle booking
app.post('/api/bookings', (req, res) => {
    const booking = req.body;
    const validationError = validateBooking(booking);

    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    // Add booking timestamp
    booking.createdAt = new Date().toISOString();

    // Store booking
    bookings.push(booking);

    // In real app, save to a database here

    return res.status(201).json({ message: 'Booking successful', bookingId: bookings.length });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


