const inp_valas = document.getElementById('valas');
const inp_nilai = document.getElementById('nilai');
const inp_rupiah = document.getElementById('rupiah');

const kurs = {
    usd: 9915,
    sgd: 13472,
    rm: 874,
    jpy: 120,
    eur: 15888,
    sar: 3592
};

function hitung_kurs() {
    if (!inp_valas || !inp_nilai || !inp_rupiah) return;
    const valas = inp_valas.value;
    const nilaiRaw = inp_nilai.value;
    const nilai = parseFloat(nilaiRaw);

    if (isNaN(nilai) || nilaiRaw === '') {
        inp_rupiah.value = '';
        return;
    }

    if (!(valas in kurs)) {
        inp_rupiah.value = 'N/A';
        return;
    }

    const rupiah = nilai * kurs[valas];
    inp_rupiah.value = rupiah.toLocaleString('id-ID', {minimumFractionDigits: 0, maximumFractionDigits: 2});
}

if (inp_valas) {
    inp_valas.addEventListener('change', hitung_kurs);
    inp_valas.addEventListener('input', hitung_kurs);
}
if (inp_nilai) {
    inp_nilai.addEventListener('input', hitung_kurs);
}

document.addEventListener('DOMContentLoaded', hitung_kurs);