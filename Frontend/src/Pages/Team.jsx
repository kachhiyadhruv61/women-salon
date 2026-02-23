import { useRef } from "react";

function Team() {
  const scrollRef = useRef(null);

  const scrollAmount = 270; // card width + gap approx

const scrollLeft = () => {
  const container = scrollRef.current;

  if (container.scrollLeft <= 0) {
    // go to end
    container.scrollTo({
      left: container.scrollWidth,
      behavior: "smooth",
    });
  } else {
    container.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  const container = scrollRef.current;

  if (
    container.scrollLeft + container.clientWidth >=
    container.scrollWidth - 5
  ) {
    // back to start
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  } else {
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="font-dancing-script text-primary">Team Members</h2>
          <h1>Our Experienced Specialists</h1>
        </div>

        {/* arrows + row */}
        <div className="d-flex align-items-center justify-content-center">

          {/* LEFT ARROW */}
          <button className="btn btn-primary me-2" onClick={scrollLeft}>
            &#8592;
          </button>

          {/* TEAM ROW */}
          <div
            ref={scrollRef}
            className="d-flex gap-4 overflow-hidden"
            style={{ scrollBehavior: "smooth",
              width: "830px"   // 250 + gap(approx 20) × 3
             }}
            
          >

            {/* CARD 1 */}
            <div className="team-item flex-shrink-0" style={{ width: "250px" }}>
              <div className="team-img">
                <img src="/img/team1.png" 
                alt="team member"
                className="img-fluid w-100" />
                <div className="team-overlay text-center">
                  <p className="text-primary mb-1">Hair Specialist</p>
                  <h4>Neha Patel</h4>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="team-item flex-shrink-0" style={{ width: "250px" }}>
              <div className="team-img">
                <img src="/img/team2.png" alt="team member" className="img-fluid w-100" />
                <div className="team-overlay text-center">
                  <p className="text-primary mb-1">Hair Specialist</p>
                  <h4>Pooja Joshi</h4>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="team-item flex-shrink-0" style={{ width: "250px" }}>
              <div className="team-img">
                <img src="/img/team3.png" alt="team member" className="img-fluid w-100" />
                <div className="team-overlay text-center">
                  <p className="text-primary mb-1">Face Specialist</p>
                  <h4>Aarti Parmar</h4>
                </div>
              </div>
            </div>

            {/* CARD 4 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team4.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Beauty Specialist</p>
      <h4>Parul Mehta</h4>
    </div>
  </div>
</div>

{/* CARD 5 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team5.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Makeup Artist</p>
      <h4>Prachi Solanki</h4>
    </div>
  </div>
</div>

{/* CARD 6 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team6.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Pedicure Specialist</p>
      <h4>Reena Arora</h4>
    </div>
  </div>
</div>

{/* CARD 7 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team7.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Pedicure Specialist</p>
      <h4>Kajal Patel</h4>
    </div>
  </div>
</div>

{/* CARD 8 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team8.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Mehndi Specialist</p>
      <h4>Ayra Vhora</h4>
    </div>
  </div>
</div>

{/* CARD 9 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team9.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Spa Specialist</p>
      <h4>Lily Smith</h4>
    </div>
  </div>
</div>

{/* CARD 10 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team10.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Threading Specialist</p>
      <h4>Riya Pitroda</h4>
    </div>
  </div>
</div>

{/* CARD 11 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team11.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Waxing Specialist</p>
      <h4>Diya Patel</h4>
    </div>
  </div>
</div>

{/* CARD 12 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team12.png" alt="team member" className="img-fluid w-100" />
    <div className="team-overlay text-center">
      <p className="text-primary mb-1">Waxing Specialist</p>
      <h4>Priya Patel</h4>
    </div>
  </div>
</div>

{/* CARD 13 */}
<div className="team-item flex-shrink-0" style={{ width: "250px" }}>
  <div className="team-img">
    <img src="/img/team13.png" alt="team member" className="img-fluid w-100" />
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
