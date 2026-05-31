const screens = {
  splash: document.getElementById('splash'),
  role: document.getElementById('role-page'),
  dashboard: document.getElementById('dashboard'),
  detail: document.getElementById('detail')
};

let currentRole = 'mahasiswa';
let currentFloor = 6;
let rooms = [];

const RELATOR_PASSWORD = "fikti123";

document.addEventListener(
  'deviceready',
  function () {
    console.log("CORDOVA READY");
    switchScreen('splash');
    closeLoginModal();
    loadRooms();

  },
  false
);

function loadRooms() {

  const roomsRef =
    firebaseRef(firebaseDB, 'rooms');

  firebaseOnValue(

    roomsRef,

    (snapshot) => {

      const data = snapshot.val();

      if (!data) return;

      rooms = Object.values(data);

      console.log("ROOMS:", rooms);

      renderRooms();
      updateCounters();

    }
  );
}

function updateCounters() {

  let aktif = 0;
  let menunggu = 0;
  let kosong = 0;

  rooms.forEach(room => {

    if(room.status === 'masuk') {

      aktif++;

    }

    else if(room.status === 'menunggu') {

      menunggu++;

    }

    else {

      kosong++;

    }

  });

  document.getElementById('aktif-count')
    .innerText = aktif;

  document.getElementById('menunggu-count')
    .innerText = menunggu;

  document.getElementById('kosong-count')
    .innerText = kosong;
}

const swiper =
  document.querySelector('.swiper-container');

const slides =
  document.querySelectorAll('.slide');

const indicator =
  document.querySelector('.active-indicator');

let currentSlide = 0;
let startX = 0;
let isDragging = false;

function updateSlider() {

  const translate =
    -currentSlide * window.innerWidth;

  swiper.style.transform =
    `translateX(${translate}px)`;

  indicator.style.transform =
    `translateX(${currentSlide * 30}px)`;
}

swiper.addEventListener('touchstart', touchStart);
swiper.addEventListener('touchmove', touchMove);
swiper.addEventListener('touchend', touchEnd);

function touchStart(e) {

  startX = e.touches[0].clientX;

  isDragging = true;

  swiper.style.transition = 'none';
}

function touchMove(e) {

  if(!isDragging) return;

  const currentX =
    e.touches[0].clientX;

  const diff =
    currentX - startX;

  swiper.style.transform =
    `translateX(${(-currentSlide * window.innerWidth) + diff}px)`;
}

function touchEnd(e) {

  isDragging = false;

  const endX =
    e.changedTouches[0].clientX;

  const movedBy =
    endX - startX;

  if(
    movedBy < -70 &&
    currentSlide < slides.length - 1
  ) {

    currentSlide++;

  }

  if(
    movedBy > 70 &&
    currentSlide > 0
  ) {

    currentSlide--;

  }

  swiper.style.transition =
    'transform 0.35s ease';

  updateSlider();
}

window.addEventListener(
  'resize',
  updateSlider
);

updateSlider();

function finishOnboarding() {

  switchScreen('role');
}

function switchScreen(name) {

  closeLoginModal();

  Object.values(screens).forEach(screen => {
    screen.classList.remove('active');
    screen.style.display = 'none';
  });

  screens[name].classList.add('active');
  screens[name].style.display = 'block';
}

function loginAs(role) {

  /* RELATOR → PAKAI MODAL */

  if(role === 'relator') {

    openLoginModal();
    return;

  }

  currentRole = role;

  document.getElementById(
    'dashboard-title'
  ).innerText =
    'Selamat Pagi, Mahasiswa 👋';

  renderRooms();

  switchScreen('dashboard');
}

function openLoginModal() {

  document
    .getElementById('login-modal')
    .classList.remove('hidden');
}

function closeLoginModal() {

  document
    .getElementById('login-modal')
    .classList.add('hidden');
    document.getElementById('relator-password').value = '';
}

function checkRelatorPassword() {

  const password =
    document.getElementById(
      'relator-password'
    ).value;

  if(password === RELATOR_PASSWORD) {

    currentRole = 'relator';

    document.getElementById(
      'dashboard-title'
    ).innerHTML =
      'Selamat Pagi, Relator 👋';

    document.getElementById(
      'relator-password'
    ).value = '';

    closeLoginModal();
    renderRooms();
    switchScreen('dashboard');

  }

  else {

    alert('Password salah!');
  }
}

function showFloor(floor) {

  currentFloor = floor;

  const tabs =
    document.querySelectorAll('.tab');

  tabs.forEach(tab => {

    tab.classList.remove('active');

  });

  if(floor === 6) {

    tabs[0].classList.add('active');

  }

  else {

    tabs[1].classList.add('active');
  }

  renderRooms();
}

function renderRooms() {

  const grid =
    document.getElementById('room-grid');

  const filtered =
    rooms.filter(
      r => parseInt(r.floor) === currentFloor
    );

  grid.innerHTML = '';

  filtered.forEach(room => {

    let badgeClass = '';
    let badgeText = '';

    if(room.status === 'masuk') {

      badgeClass = 'green-badge';
      badgeText = 'Dosen Masuk';

    }

    else if(room.status === 'menunggu') {

      badgeClass = 'yellow-badge';
      badgeText = 'Menunggu';

    }

    else {

      badgeClass = 'gray-badge';
      badgeText = 'Kosong';

    }

    grid.innerHTML += `

      <div
        class="room-card"
        onclick="openDetail('${room.room}')">
        <h2>${room.room}</h2>
        <p>${room.dosen}</p>
        <p>${room.mk}</p>
        <div class="badge ${badgeClass}">
          ${badgeText}
        </div>

      </div>

    `;
  });
}

function openDetail(roomNumber) {

  const room =
    rooms.find(
      r => r.room === roomNumber
    );

  if(!room) return;

  document.getElementById('room-number')
    .innerText = room.room;

  document.getElementById('detail-dosen')
    .innerText = room.dosen;

  document.getElementById('detail-mk')
    .innerText = room.mk;

  document.getElementById('detail-floor')
    .innerText = room.floor;

  const badge =
    document.getElementById(
      'status-badge'
    );

  const info =
    document.getElementById(
      'status-info'
    );

  badge.className =
    'status-badge';


  if(room.status === 'masuk') {

    badge.classList.add('success');

    badge.innerText =
      'Dosen Masuk';

    info.className =
      'info-card success-box';

    info.innerText =
      'Dosen telah hadir di ruangan.';
  }

  else if(room.status === 'menunggu') {
    badge.classList.add('waiting');
    badge.innerText =
      'Menunggu';
    info.className =
      'info-card warning';
    info.innerText =
      'Menunggu konfirmasi relator kelas.';
  }

  else {
    badge.classList.add('danger');
    badge.innerText =
      'Kosong';
    info.className =
      'info-card warning';
    info.innerText =
      'Tidak ada dosen di ruangan.';
  }

  const actions =
    document.getElementById(
      'action-buttons'
    );

  if(currentRole === 'mahasiswa') {
    actions.style.display = 'none';
  }

  else {
    actions.style.display = 'block';
  }
  switchScreen('detail');
}

async function updateStatus(status) {

  const roomNumber =
    document.getElementById(
      'room-number'
    ).innerText;

  try {

    const roomRef =
      firebaseRef(
        firebaseDB,
        'rooms/' + roomNumber
      );

    await firebaseUpdate(
      roomRef,
      {
        status: status
      }
    );

    const index =
      rooms.findIndex(
        r => r.room === roomNumber
      );
    if(index !== -1) {
      rooms[index].status = status;
    }

    renderRooms();
    updateCounters();
    openDetail(roomNumber);

    const toast =
      document.getElementById(
        'toast'
      );

    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }

  catch(error) {
    console.log(error);
    alert(error.toString());
  }
}

function backDashboard() {
  switchScreen('dashboard');
}

function logout() {
  closeLoginModal();
  switchScreen('role');
}

function openTeamModal() {
  document
    .getElementById('team-modal')
    .classList.remove('hidden');
}

function closeTeamModal() {
  document
    .getElementById('team-modal')
    .classList.add('hidden');
}