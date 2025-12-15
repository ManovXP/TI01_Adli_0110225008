document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('imageSelect');
    const preview = document.getElementById('previewImg');

    const images = [
        'assets/image/1.jpg',
        'assets/image/2.jpg',
        'assets/image/3.jpg',
        'assets/image/4.jpg',
        'assets/image/Carousel2.jpeg',
        'assets/image/Carousel3.jpeg'
    ];

    images.forEach((path) => {
        const opt = document.createElement('option');
        opt.value = path;
        opt.textContent = path.split('/').pop();
        select.appendChild(opt);
    });

    select.addEventListener('change', function () {
        const value = this.value;
        if (!value) {
            preview.src = '';
            return;
        }
        preview.src = value;
        alert('Nama file: ' + value.split('/').pop());
    });
});
