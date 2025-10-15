// Fetch artworks from the Art Institute of Chicago API
fetch("https://api.artic.edu/api/v1/artworks?limit=5")
  // Convert the response into JSON format
  .then((response) => response.json())
  .then((data) => {
    console.log("API Response:", data)

    // Find the HTML element where we will display results
    const dataSection = document.getElementById("data")

    // Loop first 5 artworks
    data.data.forEach((artwork) => {
      // Container for each artwork
      const artDiv = document.createElement("div")
      artDiv.classList.add("art-card")

      // Create and display the artwork image
      const image = document.createElement("img")
      image.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`
      image.alt = artwork.title
      artDiv.appendChild(image)

      // Create an element for the artwork title
      const title = document.createElement("h3")
      title.textContent = artwork.title

      // Create an element for the artist name
      const artist = document.createElement("p")
      artist.textContent = artwork.artist_title || "Unknown artist"

      // Add both title and artist name into the card
      artDiv.appendChild(title)
      artDiv.appendChild(artist)

      // Add the card to the section
      dataSection.appendChild(artDiv)
    })
  })

  // Catch and log any errors that happen during the fetch
  .catch((error) => {
    console.error("Error fetching API:", error)
  })

// SECOND FETCH — Example for exhibitions (second data point)
fetch("https://api.artic.edu/api/v1/exhibitions?limit=5")
  .then((response) => response.json())
  .then((data) => {
    // Create a new section to hold exhibition info
    const exhibitionSection = document.createElement("section")
    exhibitionSection.innerHTML = "<h2>Exhibitions</h2>"
    document.body.appendChild(exhibitionSection)

    // Loop through first 5 exhibitions
    data.data.forEach((exhibit) => {
      const exhibitDiv = document.createElement("div")
      exhibitDiv.classList.add("art-card")

      // Exhibition title
      const title = document.createElement("h3")
      title.textContent = exhibit.title

      // Exhibition start date (with fallback if missing)
      const date = document.createElement("p")
      date.textContent = exhibit.aic_start_date
        ? `Start date: ${exhibit.aic_start_date}`
        : "Date not available"

      // Add content to the card
      exhibitDiv.appendChild(title)
      exhibitDiv.appendChild(date)

      // Add the card to the new section
      exhibitionSection.appendChild(exhibitDiv)
    })
  })
  // Catch and log errors for the second fetch
  .catch((error) => console.error("Error fetching exhibitions:", error))
