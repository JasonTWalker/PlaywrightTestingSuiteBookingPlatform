// to store messages to expect 
export default {
    login: {
        invalid: 'Invalid email or password',
    },

    registration: {
        registrationSuccessful: 'Registration successful! Please sign in.',
        weakPassword: 'Password must be at least 8 characters long and',
        emptyPassword: 'Please fill in this field',
    },

    bookings: {
        rinkBookingRequestSuccessful: 'Booking requested for you successfully!',
        cancellationNotAllowed: 'Cannot cancel bookings within 24 hours of the scheduled date. Contact an admin for assistance.'
    }
}