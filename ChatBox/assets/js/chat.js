document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatbox');
    const toggle = document.getElementById('chatToggle');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('msgInput');
    const messages = document.getElementById('messages');

    function addMessage(text, who = 'me') {
        const el = document.createElement('div');
        el.className = 'msg ' + (who === 'me' ? 'me' : 'other');
        const meta = document.createElement('span');
        meta.className = 'meta';
        meta.textContent = who === 'me' ? 'Anda' : 'Teman';
        el.appendChild(meta);
        const body = document.createElement('div');
        body.textContent = text;
        el.appendChild(body);
        messages.appendChild(el);
        messages.parentElement.scrollTop = messages.parentElement.scrollHeight;
    }

    toggle.addEventListener('click', () => {
        chatBox.classList.toggle('minimized');
        const minimized = chatBox.classList.contains('minimized');
        toggle.textContent = minimized ? '+' : '—';
        toggle.setAttribute('aria-label', minimized ? 'Buka chat' : 'Tutup chat');
        if (!minimized) input.focus();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'me');
        input.value = '';
        setTimeout(() => addMessage('Terima kasih pesan Anda diterima', 'other'), 700);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.requestSubmit();
        }
    });
});
