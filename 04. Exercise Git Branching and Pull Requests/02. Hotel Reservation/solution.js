let reservation = {
    startDate: null,
    endDate: null,
    guestsCount: 0,
    roomType: null,
    name: null,
    phone: null,
    email: null
};

function changeContent(className) {
    document.querySelectorAll('.custom-form').forEach(div => div.classList.add('hidden'));
    const section = document.querySelector(`.${className}`);
    if (section) {
        section.classList.remove('hidden');
    }
}

// ---------- NEW RESERVATION ----------
const newReservationBtn = document.querySelector('#new-reservation');
if (newReservationBtn) {
    newReservationBtn.addEventListener('click', e => {
        e.preventDefault();
        cleanData();
    });
}

function cleanData() {
    reservation = {
        startDate: null,
        endDate: null,
        guestsCount: 0,
        roomType: null,
        name: null,
        phone: null,
        email: null
    };
    changeContent('search-form-content');
}

// ---------- SEARCH FORM ----------
const searchFormButton = document.querySelector('#search-form-button');
if (searchFormButton) {
    searchFormButton.addEventListener('click', e => {
        e.preventDefault();
        const form = e.target.closest('form');
        const checkIn = form.querySelector('#check-in').value;
        const checkOut = form.querySelector('#check-out').value;
        const people = form.querySelector('#people').value;

        if (checkIn && checkOut && people && new Date(checkIn) <= new Date(checkOut)) {
            reservation.startDate = checkIn;
            reservation.endDate = checkOut;
            reservation.guestsCount = people;
            changeContent('search-result-form-content');
        } else {
            alert('Please fill all fields correctly!');
        }
    });
}

// ---------- ROOM SELECTION ----------
document.querySelectorAll('.room-type').forEach(room => {
    room.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.room-type').forEach(r => r.classList.remove('selected-room'));
        e.currentTarget.classList.add('selected-room');
    });
});

// ---------- NAVIGATION BETWEEN FORMS ----------
const searchBackBtn = document.querySelector('#search-back-btn');
if (searchBackBtn) {
    searchBackBtn.addEventListener('click', e => {
        e.preventDefault();
        changeContent('search-form-content');
    });
}

const searchNextBtn = document.querySelector('#search-next-btn');
if (searchNextBtn) {
    searchNextBtn.addEventListener('click', e => {
        e.preventDefault();
        const selected = document.querySelector('.room-type.selected-room');
        if (selected) {
            reservation.roomType = selected.querySelector('h4').textContent;
            changeContent('guest-details-form-content');
        } else {
            alert('Please select a room.');
        }
    });
}

const guestDetailsBackBtn = document.querySelector('#guest-details-back-btn');
if (guestDetailsBackBtn) {
    guestDetailsBackBtn.addEventListener('click', e => {
        e.preventDefault();
        changeContent('search-result-form-content');
    });
}

const guestDetailsNextBtn = document.querySelector('#guest-details-next-btn');
if (guestDetailsNextBtn) {
    guestDetailsNextBtn.addEventListener('click', e => {
        e.preventDefault();
        const form = e.target.closest('form');
        const name = form.querySelector('#name').value;
        const phone = form.querySelector('#phone-number').value;
        const email = form.querySelector('#email').value;

        if (name && phone && email) {
            reservation.name = name;
            reservation.phone = phone;
            reservation.email = email;
            fillConfirmReservationData();
            changeContent('confirm-reservation-content');
        } else {
            alert('Please fill all personal details.');
        }
    });
}

// ---------- CONFIRM PAGE ----------
const confirmBackBtn = document.querySelector('#confirm-back-btn');
if (confirmBackBtn) {
    confirmBackBtn.addEventListener('click', e => {
        e.preventDefault();
        changeContent('guest-details-form-content');
    });
}

const confirmReservationBtn = document.querySelector('#confirm-reservation');
if (confirmReservationBtn) {
    confirmReservationBtn.addEventListener('click', e => {
        e.preventDefault();
        changeContent('thank-you-content');
    });
}

// ---------- FILL CONFIRMATION DETAILS ----------
function fillConfirmReservationData() {
    document.querySelector('#guest-name').textContent = `Name: ${reservation.name}`;
    document.querySelector('#guest-phone').textContent = `Phone Number: ${reservation.phone}`;
    document.querySelector('#guest-email').textContent = `Email: ${reservation.email}`;
    document.querySelector('#guest-room-type').textContent = `Room Type: ${reservation.roomType}`;
    document.querySelector('#guest-data-in').textContent = `Date-in: ${reservation.startDate}`;
    document.querySelector('#guest-data-out').textContent = `Date-out: ${reservation.endDate}`;
}

// ---------- INITIAL STATE ----------
changeContent('search-form-content');
