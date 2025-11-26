// HOTELS SEARCH ENGINE

      const hotels = [
      { name: "Eko Hotels & Suites", address: "Victoria Island, Lagos" },
      { name: "Transcorp Hilton", address: "Maitama, Abuja" },
      { name: "Oriental Hotel", address: "Lekki, Lagos" },
      { name: "Ibom Hotel & Golf Resort", address: "Uyo, Akwa Ibom" },
      { name: "Federal Palace Hotel", address: "Victoria Island, Lagos" },
      { name: "Bon Hotel Sunshine", address: "GRA, Enugu" },
      { name: "New Planet Hotel & Suites", address: "Abakaliki, Ebonyi State" },
      { name: "Protea Hotel", address: "Ikeja, Lagos" },
      { name: "Sheraton Hotel", address: "Wuse Zone 4, Abuja" },
      { name: "Genesis Hotel", address: "GRA Phase 2, Port Harcourt" }
    ];

    const searchInput = document.getElementById("searchInput");
    const hotelList = document.getElementById("hotelList");

    function displayHotels(filteredHotels) {
      hotelList.innerHTML = "";
      if (filteredHotels.length === 0) {
        hotelList.innerHTML = "<p>No hotels found.</p>";
        return;
      }
      filteredHotels.forEach(hotel => {
        const div = document.createElement("div");
        div.className = "hotel";
        div.innerHTML = `<h4>${hotel.name}</h4><p>${hotel.address}</p>`;
        hotelList.appendChild(div);
      });
    }

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(query) ||
        hotel.address.toLowerCase().includes(query)
      );
      displayHotels(filtered);
    });

    // Display all hotels by default
    displayHotels(hotels);