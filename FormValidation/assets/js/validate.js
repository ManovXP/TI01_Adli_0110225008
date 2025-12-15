document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingForm');
    const result = document.getElementById('result');

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        time: document.getElementById('time'),
        destination: document.getElementById('destination'),
        tickets: document.getElementById('tickets')
    };

    function showError(field, message) {
        const err = document.getElementById(field.id + 'Error');
        err.textContent = message;
        field.classList.add('invalid');
        field.setAttribute('aria-invalid', 'true');
    }

    function clearError(field) {
        const err = document.getElementById(field.id + 'Error');
        err.textContent = '';
        field.classList.remove('invalid');
        field.removeAttribute('aria-invalid');
    }

    function validate() {
        let valid = true;
        const name = fields.name.value.trim();
        clearError(fields.name);
        if (!name) { showError(fields.name, 'Nama harus diisi'); valid = false; }
        else if (name.length > 30) { showError(fields.name, 'Maksimum 30 karakter'); valid = false; }

        const email = fields.email.value.trim();
        clearError(fields.email);
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) { showError(fields.email, 'Email harus diisi'); valid = false; }
        else if (!emailRe.test(email)) { showError(fields.email, 'Format email tidak valid'); valid = false; }

        const time = fields.time.value.trim();
        clearError(fields.time);
        const timeRe = /^([01]\d|2[0-3])\.[0-5]\d$/;
        if (!time) { showError(fields.time, 'Jam keberangkatan harus diisi'); valid = false; }
        else if (!timeRe.test(time)) { showError(fields.time, 'Format jam harus HH.MM (00.00-23.59)'); valid = false; }

        const dest = fields.destination.value.trim();
        clearError(fields.destination);
        if (!dest) { showError(fields.destination, 'Tujuan harus diisi'); valid = false; }

        const ticketsRaw = fields.tickets.value.trim();
        clearError(fields.tickets);
        const tickets = parseInt(ticketsRaw);
        if (!ticketsRaw) { showError(fields.tickets, 'Jumlah tiket harus diisi'); valid = false; }
        else if (isNaN(tickets) || tickets != Number(ticketsRaw)) { showError(fields.tickets, 'Jumlah tiket harus bilangan bulat'); valid = false; }
        else if (tickets < 1 || tickets > 10) { showError(fields.tickets, 'Jumlah tiket antara 1 - 10'); valid = false; }

        return valid;
    }

    Object.values(fields).forEach(f => {
        f.addEventListener('input', () => clearError(f));
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        result.innerHTML = '';
        if (validate()) {
            const html = `
        <h2>Data Pemesanan</h2>
        <div class="row"><strong>Nama:</strong> ${fields.name.value.trim()}</div>
        <div class="row"><strong>Email:</strong> ${fields.email.value.trim()}</div>
        <div class="row"><strong>Jam Keberangkatan:</strong> ${fields.time.value.trim()}</div>
        <div class="row"><strong>Tujuan:</strong> ${fields.destination.value.trim()}</div>
        <div class="row"><strong>Jumlah tiket:</strong> ${fields.tickets.value.trim()}</div>
    `;
            result.innerHTML = html;
            form.reset();
        } else {
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        Object.values(fields).forEach(clearError);
        result.innerHTML = '';
    });
});
