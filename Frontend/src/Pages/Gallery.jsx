import { useState } from "react";

function Gallery() {
  const salonImages = [
    "/img/salon1.jpg",
    "/img/salon17.png",
    "/img/salon2.jpg",
    "/img/salon3.jpg",
    "/img/salon4.jpg",
    "/img/salon5.jpg",
    "/img/salon7.jpg",
    "/img/salon8.jpg",
    "/img/salon9.jpg",
    "/img/salon10.jpg",
    "/img/salon11.jpg",
    "/img/salon12.jpg"
  ];

  const naturalPlaceImages = [
    "/img/farm1.jpg",
    "/img/tulsi.jpg",
    "/img/farm2.jpg",
    "/img/farm3.jpg",
    "/img/ashwa.jpg",
    "/img/arithatree.jpeg",
    "/img/aloevera.jpg",
    "/img/neem.jpg",
    "/img/shikakaitree.jpg",
    "/img/potato.jpg",
    "/img/tomato.jpg",
    "/img/watermelon.jpg",
    "/img/farm4.jpg",
    "/img/farm5.jpg",
    "/img/sitting1.jpg",
    "/img/bed1.jpg",
    "/img/bed2.jpg",
    "/img/amla.jpg",
    "/img/apple.jpg",
    "/img/strawberry.jpg",
    "/img/farm6.jpg",
    "/img/farm7.avif",
    "/img/guvava.jpg",
    "/img/lichi.jpg",
    "/img/mango.jpg",
    "/img/farm8.jpg",
    "/img/banana.jpg",
    "/img/amla tree.jpg",
    "/img/chiku.jpg",
    "/img/coconut.jpg",
    "/img/cucumber.jpg",
    "/img/farm14.webp",
    "/img/custrudapple.jpg",
    "/img/grapes.jpg",
    "/img/farm12.avif",
    "/img/orange.jpg",
    "/img/papaya.jpg",
    "/img/pineapple.jpg",
    "/img/pomo.jpg",
    "/img/farm9.avif",
    "/img/sitting.jpg",
    

  ];

  const [activeTab, setActiveTab] = useState("salon");
  const [selectedImg, setSelectedImg] = useState(null);

  const images =
    activeTab === "salon" ? salonImages : naturalPlaceImages;

  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="font-dancing-script text-primary">Our Space & Experience</h2>
        <h1>Gallery</h1>
        <p className="text-muted">
          A glimpse of our salon elegance and peaceful natural surroundings
        </p>
      </div>

      {/* Tabs */}
      <ul className="nav nav-pills justify-content-center mb-4 gallery-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "salon" ? "active" : ""}`}
            onClick={() => setActiveTab("salon")}
          >
            Salon
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "natural" ? "active" : ""
            }`}
            onClick={() => setActiveTab("natural")}
          >
            Natural Place
          </button>
        </li>
      </ul>

      {/* Gallery Grid */}
      <div className="row g-4">
        {images.map((img, index) => (
          <div className="col-lg-4 col-md-6" key={index}>
            <div
              className="gallery-card"
              onClick={() => setSelectedImg(img)}
            >
              <img src={img} alt="gallery" className="img-fluid" />
              <div className="overlay">
                <span>View</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          onClick={() => setSelectedImg(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="btn-close ms-auto p-3"
                onClick={() => setSelectedImg(null)}
              ></button>
              <img
  src={selectedImg}
  alt="preview"
  className="img-fluid rounded"
  style={{
    maxHeight: "80vh",
    width: "auto",
    margin: "0 auto",
    display: "block",
    objectFit: "contain"
  }}
/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
