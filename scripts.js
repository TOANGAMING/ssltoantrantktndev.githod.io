const tet2025 = new Date("2025-01-29T00:00:00").getTime();

function updateDateInfo() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('dateInfo').innerHTML = `Hôm nay là ${now.toLocaleDateString('vi-VN', options)} (Dương Lịch)`;
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = tet2025 - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").style.display = 'none';
        document.getElementById("newYearMessage").style.display = 'block';
        triggerFireworks();
    }
}

function triggerFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    for (let i = 0; i < 20; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        fireworksContainer.appendChild(firework);
    }
    setTimeout(() => {
        fireworksContainer.innerHTML = '';
    }, 1500);
}

function triggerLikeEffect(event) {
    const checkbox = document.getElementById('likeButton');
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        const celebrateEffect = document.querySelector('.celebrate');
        celebrateEffect.style.display = 'block';
        setTimeout(() => {
            celebrateEffect.style.display = 'none';
        }, 1000);
    }
}

function triggerShareEffect(event) {
    const shareEffect = document.createElement('div');
    shareEffect.className = 'share-effect';
    shareEffect.innerHTML = '❤️';
    shareEffect.style.left = `${event.clientX}px`;
    shareEffect.style.top = `${event.clientY}px`;
    document.body.appendChild(shareEffect);
    setTimeout(() => {
        document.body.removeChild(shareEffect);
    }, 1000);
}

function openMessageModal() {
    document.getElementById('messageModal').style.display = 'block';
}

function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

function sendMessage() {
    const messageText = document.getElementById('messageText').value;
    if (messageText.trim() !== '') {
        alert('Tin nhắn của bạn đã được gửi: ' + messageText);
        document.getElementById('messageText').value = '';
        closeMessageModal();
    } else {
        alert('Vui lòng nhập tin nhắn.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundAudio');

    // Tự động phát âm thanh nền
    audio.play().catch(error => {
        console.log('Playback failed:', error);
    });

    // Điều khiển âm thanh qua nút bật tắt
    const checkboxInput = document.getElementById('checkboxInput');
    checkboxInput.addEventListener('change', function() {
        if (checkboxInput.checked) {
            audio.pause();
        } else {
            audio.play().catch(error => {
                console.log('Playback failed:', error);
            });
        }
    });
});

const x = setInterval(function() {
    updateCountdown();
    updateDateInfo();
}, 1000);

updateDateInfo();
