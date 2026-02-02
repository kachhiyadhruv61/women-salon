import { useRef } from "react";

function Team() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="font-dancing-script text-primary">Team Members</h1>
          <h1>Our Experienced Specialists</h1>
        </div>

        {/* arrows + row */}
        <div className="d-flex align-items-center">

          {/* LEFT ARROW */}
          <button className="btn btn-primary me-2" onClick={scrollLeft}>
            &#8592;
          </button>

          {/* TEAM ROW */}
          <div
            ref={scrollRef}
            className="d-flex gap-4 overflow-hidden"
            style={{ scrollBehavior: "smooth" }}
          >

            {/* CARD 1 */}
            <div className="team-item flex-shrink-0" style={{ width: "250px" }}>
              <div className="team-img">
                <img src="/img/neha1.jpg" className="img-fluid w-100" />
                <div className="team-overlay text-center">
                  <p className="text-primary mb-1">Hair Specialist</p>
                  <h4>Neha Patel</h4>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="team-item flex-shrink-0" style={{ width: "250px" }}>
              <div className="team-img">
                <img src="/img/pooja.jpeg" className="img-fluid w-100" />
                <div className="team-overlay text-center">
                  <p className="text-primary mb-1">Hair Specialist</p>
                  <h4>Pooja Joshi</h4>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="team-item flex-shrink-0" style={{ width: "250px" }}>
              <div className="team-img">
                <img src="/img/aarti.jpg" className="img-fluid w-100" />
                <div className="team-overlay text-center">
                  <p className="text-primary mb-1">Face Specialist</p>
                  <h4>Aarti Parmar</h4>
                </div>
              </div>
            </div>

            {/* CARD 4 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team-3.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Beauty Specialist</p>
      <h4>Parul Mehta</h4>
    </div>
  </div>
</div>

{/* CARD 5 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/prachi.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Makeup Artist</p>
      <h4>Prachi Solanki</h4>
    </div>
  </div>
</div>

{/* CARD 6 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/reena.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Pedicure Specialist</p>
      <h4>Reena Arora</h4>
    </div>
  </div>
</div>

{/* CARD 7 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/kajal.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Pedicure Specialist</p>
      <h4>Kajal Patel</h4>
    </div>
  </div>
</div>

{/* CARD 8 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/Ayra.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Mehndi Specialist</p>
      <h4>Ayra Vhora</h4>
    </div>
  </div>
</div>

{/* CARD 9 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/lily1.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Spa Specialist</p>
      <h4>Lily Smith</h4>
    </div>
  </div>
</div>

{/* CARD 10 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/riya.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Threading Specialist</p>
      <h4>Riya Pitroda</h4>
    </div>
  </div>
</div>

{/* CARD 11 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/Diya.jpeg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Waxing Specialist</p>
      <h4>Diya Patel</h4>
    </div>
  </div>
</div>

{/* CARD 12 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/priya.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Waxing Specialist</p>
      <h4>Priya Patel</h4>
    </div>
  </div>
</div>

{/* CARD 13 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/khushi.jpg" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">All-Rounder Specialist</p>
      <h4>Khushi Mehta</h4>
    </div>
  </div>
</div>


          </div>

          {/* RIGHT ARROW */}
          <button className="btn btn-primary ms-2" onClick={scrollRight}>
            &#8594;
          </button>

        </div>
      </div>
    </div>
  );
}

export default Team;
