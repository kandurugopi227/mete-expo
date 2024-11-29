// Sample hostel data
const hostels = [
  {
    name: "Ayyappa Boys Hostel",
    location: "Gandi Maisamma",
    price: 5500,
    rating: 4.2,
    facilities: "Wi-Fi,AC",
    gender: "Boys",
  },
  {
    name: "Venkateshwara Girls Hostel",
    location: "Gandi Maisamma",
    price: 5000,
    rating: 4.0,
    facilities: "Wi-Fi,Parking",
    gender: "Girls",
  },
  {
    name: "Unisex Stay Hostel",
    location: "Hitech City",
    price: 6000,
    rating: 4.5,
    facilities: "Wi-Fi,AC,Meals",
    gender: "Unisex",
  },
];

// Recommendation function
function getRecommendations(gender, location, facilities, rating, price) {
  const facilityArray = facilities.split(",").map((f) => f.trim().toLowerCase());

  return hostels.filter((hostel) => {
    const hostelFacilities = hostel.facilities.toLowerCase();
    const matchesFacilities = facilityArray.every((f) => hostelFacilities.includes(f));

    return (
      hostel.gender.toLowerCase() === gender.toLowerCase() &&
      hostel.location.toLowerCase().includes(location.toLowerCase()) &&
      matchesFacilities &&
      hostel.rating >= rating &&
      hostel.price <= price
    );
  });
}

// Handle form submission
document.getElementById("submitBtn").addEventListener("click", () => {
  // Get user input
  const gender = document.getElementById("gender").value;
  const location = document.getElementById("location").value;
  const facilities = document.getElementById("facilities").value;
  const rating = parseFloat(document.getElementById("rating").value);
  const price = parseInt(document.getElementById("price").value, 10);

  // Get recommendations
  const recommendations = getRecommendations(gender, location, facilities, rating, price);

  // Display recommendations
  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = ""; // Clear previous results

  if (recommendations.length > 0) {
    recommendations.forEach((hostel) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>${hostel.name}</strong>
        <span>Location: ${hostel.location}</span>
        <span>Price: ₹${hostel.price}/month</span>
        <span>Rating: ${hostel.rating}</span>
        <span>Facilities: ${hostel.facilities}</span>
        <span>Gender: ${hostel.gender}</span>
      `;
      resultsList.appendChild(listItem);
    });
  } else {
    resultsList.innerHTML = "<li>No hostels found matching your preferences.</li>";
  }
});
document.getElementById("submitBtn").addEventListener("click", async () => {
    // Get user input
    const gender = document.getElementById("gender").value;
    const location = document.getElementById("location").value;
    const facilities = document.getElementById("facilities").value;
    const rating = parseFloat(document.getElementById("rating").value);
    const price = parseInt(document.getElementById("price").value, 10);
  
    // Prepare the request payload
    const payload = {
      gender,
      location,
      facilities,
      rating,
      price,
    };
  
    try {
      // Make a POST request to the backend API
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const recommendations = await response.json();
  
      // Display recommendations
      const resultsList = document.getElementById("resultsList");
      resultsList.innerHTML = ""; // Clear previous results
  
      if (recommendations.length > 0) {
        recommendations.forEach((hostel) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>${hostel.name}</strong>
            <span>Location: ${hostel.location}</span>
            <span>Price: ₹${hostel.price}/month</span>
            <span>Rating: ${hostel.rating}</span>
            <span>Facilities: ${hostel.facilities}</span>
            <span>Gender: ${hostel.gender}</span>
          `;
          resultsList.appendChild(listItem);
        });
      } else {
        resultsList.innerHTML = "<li>No hostels found matching your preferences.</li>";
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Unable to fetch recommendations. Please try again later.");
    }
  });
  