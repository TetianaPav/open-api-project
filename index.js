// Select the section where data will be displayed
const dataSection = document.getElementById("data")
// Track current page for artworks to show different results each click
let artworkPage = 1

// "Load More" button
const loadMoreBtn = document.getElementById("load-more")

// --- Function: Fetch Artworks
function fetchArtworks(reset = false) {
  // Show the Load More button when viewing artworks only
  loadMoreBtn.style.display = "block"

  //If reset is true, start fresh
  if (reset) {
    artworkPage = Math.floor(Math.random() * 100) + 1 // random page between 1-100
    dataSection.innerHTML = "<h2>Artworks</h2>" //Clear previous content
  } else if (artworkPage === 1) {
    dataSection.innerHTML = "<h2>Artworks</h2>"
  }

  // --- Fetch first 5 artworks from the Art Institute of Chicago API
  fetch(`https://api.artic.edu/api/v1/artworks?limit=5&page=${artworkPage}`)
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      if (!data.data || data.data.length === 0) {
        throw new Error("No artwork data available")
      }

      // Loop through each artwork
      data.data.forEach((artwork) => {
        // Container div for each artwork
        const artDiv = document.createElement("div")
        artDiv.classList.add("art-card")

        // Artwork image
        const image = document.createElement("img")
        image.src = artwork.image_id
          ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`
          : "https://via.placeholder.com/200?text=No+Image"

        image.alt = artwork.title || "Untitled"
        artDiv.appendChild(image)

        // Artwork title
        const title = document.createElement("p")
        title.textContent = `Title: ${artwork.title || "Untitled"}`
        artDiv.appendChild(title)

        // Artist name
        const artist = document.createElement("p")
        artist.textContent = `Artist: ${artwork.artist_title || "Unknown"}`
        artDiv.appendChild(artist)

        // Date of creation
        const date = document.createElement("p")
        date.textContent = `Date: ${artwork.date_display || "Unknown"}`
        artDiv.appendChild(date)

        // Append the artwork card to the main data section
        dataSection.appendChild(artDiv)
      })
      // Increment artwork page for next click
      artworkPage++
    })

    // Catch and log any errors that happen during the fetch
    .catch((error) => {
      console.error("Error fetching API:", error)
      // Display a user-friendly message
      dataSection.innerHTML =
        "<p>Failed to load artworks. Please try again later.</p>"
    })
}

// Fetch artworks when "Artworks" link is clicked
document.getElementById("show-artworks").addEventListener("click", (e) => {
  e.preventDefault()
  fetchArtworks(true)
})

// "Load More" button
loadMoreBtn.addEventListener("click", () => {
  fetchArtworks() // Append new artworks instead of replacing
})

//--------------------------------------------------------------
// ----------------SECOND FETCH —------ Exhibitions ------------
function fetchExhibitions() {
  // Hide the Load More button when viewing exhibitions
  loadMoreBtn.style.display = "none"
  // Clear previous content and add section heading
  dataSection.innerHTML = "<h2>Exhibitions</h2>"

  // Fetch first 5 exhibitions from the Art Institute of Chicago API
  fetch("https://api.artic.edu/api/v1/exhibitions?limit=5")
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      if (!data.data || data.data.length === 0) {
        throw new Error("No exhibition data available")
      }

      // Loop through each exhibition
      data.data.forEach((exhibit) => {
        const exhibitDiv = document.createElement("div")
        exhibitDiv.classList.add("art-card")

        // Exhibition title
        const title = document.createElement("p")
        title.textContent = `Title: ${exhibit.title || "Untitled"}`

        // Start and end dates
        const detailsDiv = document.createElement("div")
        detailsDiv.style.display = "flex"
        detailsDiv.style.justifyContent = "space-between"
        detailsDiv.style.gap = "15px"

        const startP = document.createElement("p")
        startP.textContent = `Start: ${exhibit.aic_start_date || "Unknown"}`

        const endP = document.createElement("p")
        endP.textContent = `End: ${exhibit.aic_end_date || "Unknown"}`

        detailsDiv.appendChild(startP)
        detailsDiv.appendChild(endP)

        // Append all to exhibit card
        exhibitDiv.appendChild(title)
        exhibitDiv.appendChild(detailsDiv)

        dataSection.appendChild(exhibitDiv)
      })
    })

    .catch((error) => {
      console.error("Error fetching exhibitions:", error)
      // Display user-friendly message
      dataSection.innerHTML =
        "<p>Failed to load exhibitions. Please try again later.</p>"
    })
}

// --------------   Event Listeners for Navigation -------------------

// Artworks nav listener
document.getElementById("show-artworks").addEventListener("click", (e) => {
  e.preventDefault()
  artworkPage = Math.floor(Math.random() * 100) + 1 // Random page
  fetchArtworks(true)
})

// Exhibitions nav listener (was missing)
document.getElementById("show-exhibitions").addEventListener("click", (e) => {
  e.preventDefault()
  fetchExhibitions()
})

// Load More button — only one listener
loadMoreBtn.addEventListener("click", () => {
  fetchArtworks()
})
