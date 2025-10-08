fetch("https://api.artic.edu/api/v1/artworks")
  .then((response) => response.json())
  .then((data) => {
    console.log("API Response:", data)
  })
  .catch((error) => {
    console.error("Error fetching API:", error)
  })
