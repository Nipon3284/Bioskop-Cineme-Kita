// Navbar Interaction
const navbar = document.querySelector(".navbar");
const menu = document.querySelector("#menu");

menu.onclick = () => {
  navbar.classList.toggle("active");
};

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !navbar.contains(e.target)) {
    navbar.classList.remove("active");
  }
});


// Store Ticket Info
function storeTicketInfo(movieName, seatCode, showTime, studio) {
  const ticketInfo = {
    movieName: movieName,
    seatCode: seatCode.join(", "),
    showTime: showTime,
    studio: studio,
  };
  localStorage.setItem("ticketInfo", JSON.stringify(ticketInfo));
}

// Checkout Button Event
const checkoutButton = document.getElementById("checkout-btn");
checkoutButton.addEventListener("click", function () {
  const selectedSeats = [...document.querySelectorAll(".seat.selected")].map(
    (seat) => seat.dataset.id
  );
  const movieName = document.getElementById("movie-title").innerText;
  const showTime = document.getElementById("show-time-input").value;
  const studio = document.getElementById("studio-info").innerText;

  if (selectedSeats.length === 0) {
    alert("Pilih kursi terlebih dahulu.");
    return;
  }

  storeTicketInfo(movieName, selectedSeats, showTime, studio);
  window.location.href = "cetak.html";
});

// Load Ticket Info on Print Page
document.addEventListener("DOMContentLoaded", function () {
  const ticketInfo = JSON.parse(localStorage.getItem("ticketInfo"));

  if (ticketInfo) {
    document.getElementById("movie-name").innerText =
      "Nama Film: " + ticketInfo.movieName;
    document.getElementById("seat-code").innerText =
      "Kursi yang Dipilih: " + ticketInfo.seatCode;
    document.getElementById("show-time").innerText =
      "Waktu Tayang: " + ticketInfo.showTime;
    document.getElementById("studio").innerText =
      "Studio: " + ticketInfo.studio;
  } else {
    alert("Data tiket tidak ditemukan. Harap lakukan pemesanan ulang.");
    window.location.href = "index.html";
  }
});
