$(function () {
  $('body').sakura({
    newOn: 300,
  });
});

// Hàm random mà không trùng
function getRandomPosition(positions) {
  const index = Math.floor(Math.random() * positions.length);
  const position = positions[index];
  positions.splice(index, 1); // Loại bỏ vị trí đã chọn
  return position;
}

// Hàm chọn QR image theo xác suất
function getRandomQR() {
  const qrProbabilities = {
    './assets/qr/500kk.jpg': 0.1  ,
    './assets/qr/100kk.jpg': 0.1,
    './assets/qr/200kk.jpg': 0.1,
    './assets/qr/50kk.jpg': 0.1,
    './assets/qr/20kk.jpg': 0.1,
    './assets/qr/10kk.jpg': 0.1,
    './assets/qr/5kk.jpg':0.1,
    './assets/qr/1kk.jpg':0.1,
    './assets/qr/2kk.jpg':0.2,
  };

  const rand = Math.random();
  let accumulatedProb = 0;

  for (const [qrImage, probability] of Object.entries(qrProbabilities)) {
    accumulatedProb += probability;
    if (rand <= accumulatedProb) {
      return qrImage;
    }
  }

  return null; // Trường hợp mặc định nếu không có mã QR
}

document.addEventListener('DOMContentLoaded', () => {
  const lixiItems = document.querySelectorAll('.lixi');
  const card = document.querySelector('.card');
  const messageElement = document.getElementById('message');
  const imageElement = document.getElementById('image');

  const chucMungMessages = [
    '🎉 Chúc mừng năm mới! Chúc cậu một năm tràn đầy niềm vui, sức khỏe dồi dào và thành công vượt bậc! 🎆',
    '🌸 Tết đến xuân về, chúc cậu vạn sự như ý, mọi khó khăn đều qua đi, chỉ còn lại niềm vui và hạnh phúc! 🌟',
    '💰 Chúc cậu năm mới an khang thịnh vượng, gia đình ấm no, và luôn gặp may mắn trên mọi nẻo đường! 🍀',
    '❤️ Năm mới, chúc cậu đón nhận thật nhiều yêu thương, hạnh phúc ngập tràn và sức khỏe mãi vững bền! 🌈',
    '🌟 Chúc cậu một năm mới thật rực rỡ, mọi dự định đều thành công, và những khoảnh khắc tuyệt vời luôn bên cậu! 🎊',
    '🎁 Chúc cậu năm mới phát tài phát lộc, mọi công việc đều thuận lợi, gia đình hạnh phúc và vui vẻ! 🏡',
  ];

  const lixiMessages = [
    '💵 của ít lòng vòng ạ,chụp lại để mình lìxì nhé',
    '💶 hên vậy ta,chụp lại để mình lìxì nhé',
    '💷 An khang thịnh vượng,chụp lại để mình lìxì nhé',
    '💸 chụp lại để mình lìxì nhé',
    '🧧 chụp lại để mình lìxì nhé',
    '🐍 chụp lại để mình lìxì nhé',
    '🧨 chụp lại để mình lìxì nhé',
    '🎁 chụp lại để mình lìxì nhé',

  ];

  const lixiImages = [
    'lixi-1.png',
    'lixi-2.png',
    'lixi-3.png',
    'lixi-4.png',
    'lixi-5.png',
    'lixi-6.png',
  ];

  const positions = [
    { left: 72.61, top: 17.0 },
    { left: 47.17, top: 29.9 },
    { left: 29.5, top: 37.9 },
    { left: 49.06, top: 72.2 },
    { left: 77.28, top: 65.0 },
    { left: 8.17, top: 61.4 },
  ];

  function closeCurrentCard() {
    card.style.display = 'none';
    messageElement.style.display = 'none';
    imageElement.style.display = 'none';
  }

  function showCard(message, lixiMessage, hasQR) {
    closeCurrentCard();

    card.style.display = 'flex';
    messageElement.style.display = 'block';
    messageElement.textContent = message;

    if (hasQR) {
      messageElement.textContent = lixiMessage;
      imageElement.style.display = 'block';
      const randomQR = getRandomQR(); // Chọn QR ngẫu nhiên
      imageElement.src = randomQR;
    } else {
      imageElement.style.display = 'none';
    }
  }

  let availablePositions = [...positions]; // Tạo bản sao của mảng để giữ nguyên mảng gốc
  let availableImages = [...lixiImages];

  lixiItems.forEach((lixi) => {
    const img = lixi.querySelector('img');

    const randomPosition = getRandomPosition(availablePositions);
    const randomX = randomPosition.left;
    const randomY = randomPosition.top;
    lixi.style.left = `${randomX}%`;
    lixi.style.top = `${randomY}%`;

    const randomPositionImage = getRandomPosition(availableImages);
    img.src = './assets/img/' + randomPositionImage;

    lixi.addEventListener('click', function () {
      const message = getRandomPosition(chucMungMessages);
      const lixiMessage = getRandomPosition(lixiMessages);
      const hasQR = Math.random() < 0.6; // 30% khả năng có QR

      showCard(message, lixiMessage, hasQR);

      this.style.opacity = '0.5';
      this.style.pointerEvents = 'none';
    });
  });

  document.addEventListener('click', function (event) {
    if (!card.contains(event.target) && !event.target.closest('.lixi')) {
      closeCurrentCard();
    }
  });
});

// Hàm điều khiển nhạc
function handleMusic() {
  const musicBtn = document.querySelector('.music-toggle');
  const audio = document.getElementById('bgMusic');

  // Kiểm tra nếu nhạc chưa được phát thì sẽ phát khi nhấn vào nút
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      musicBtn.textContent = '🔊'; // Biểu tượng âm thanh bật
    } else {
      audio.pause();
      musicBtn.textContent = '🔈'; // Biểu tượng âm thanh tắt
    }
  });
}

handleMusic(); // Đảm bảo gọi hàm này
