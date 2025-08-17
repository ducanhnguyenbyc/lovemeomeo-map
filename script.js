document.addEventListener('DOMContentLoaded', function() {

    // --- Chức năng 1: ĐẾM NGƯỢC THỜI GIAN ---
    // HÃY THAY ĐỔI NGÀY CƯỚI CỦA BẠN TẠI ĐÂY
    const weddingDate = new Date("Aug 17, 2025 23:00:00").getTime();

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Tính toán ngày, giờ, phút, giây
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Hiển thị kết quả
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        // Nếu hết thời gian
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown-timer").innerHTML = "<h2>Ngày kỷ niệm đã tới!</h2>";
        }
    }, 1000);


    // --- Chức năng 2: HIỆU ỨNG KHI CUỘN CHUỘT ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Phần tử sẽ hiện ra khi 10% của nó xuất hiện trong màn hình
    });

    fadeInElements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    
    // --- Chức năng 3: ĐIỀU KHIỂN NHẠC NỀN ---
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    let isPlaying = false;

    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            playPauseBtn.innerHTML = '▶️';
        } else {
            music.play();
            playPauseBtn.innerHTML = '⏸️';
        }
        isPlaying = !isPlaying;
    });

    // Tự động phát nhạc khi người dùng tương tác lần đầu
    document.body.addEventListener('click', function() {
        if (!isPlaying) {
            music.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '⏸️';
        }
    }, { once: true }); // Chỉ chạy 1 lần


});
// Loading trái tim lấp đầy và chuyển trang
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading-screen");
  const fill = document.getElementById("heart-fill");
  const percentText = document.getElementById("loading-percentage");

  let percent = 0;
  const interval = setInterval(() => {
    percent++;
    percentText.textContent = percent + "%";
    fill.style.height = percent + "%";

    if (percent >= 100) {
      clearInterval(interval);
      loader.style.opacity = 0;
      loader.style.pointerEvents = "none";
      setTimeout(() => {
        loader.remove();
        enableCursorHearts(); // gọi hiệu ứng tim theo con trỏ
      }, 800);
    }
  }, 60); // 3s
});

// Hiệu ứng trái tim bay theo con trỏ
function enableCursorHearts() {
  document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("div");
    heart.className = "cursor-heart";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });
}

// Hiển thị icon mèo bám theo chuột
document.addEventListener("mousemove", (e) => {
  const cursor = document.getElementById("custom-cursor");
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Sau khi loading xong
function enableCursorHearts() {
  // Tim bay theo chuột (đã có)
  document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("div");
    heart.className = "cursor-heart";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });

  // Tim bay khắp màn hình
  setInterval(() => {
    createFloatingHeart();
  }, 800); // 1 tim mỗi 800ms
}

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";

  // Vị trí ngẫu nhiên
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "0";
  heart.style.animationDuration = (4 + Math.random() * 2) + "s";
  heart.style.opacity = Math.random() * 0.6 + 0.4;
  heart.style.transform = `scale(${Math.random() * 0.5 + 0.8}) rotate(-45deg)`;

  document.getElementById("floating-hearts").appendChild(heart);

  // Xóa sau khi kết thúc animation
  setTimeout(() => {
    heart.remove();
  }, 6000);
}



