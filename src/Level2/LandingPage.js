import "./landing.css";
import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";

function LandingPage() {
  const [activeSection, setActiveSection] = useState("mainMenu");
  const [selectedTicket, setSelectedTicket] = useState("Free");

  const handleSelect = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  return (
    <div className="mainContainer">
      <nav>
        <div class="nav-container">
          <div class="logo">ticz</div>
          <ul class="nav-links">
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">My Tickets</a>
            </li>
            <li>
              <a href="#">About Project</a>
            </li>
          </ul>
          <div class="cta-button">MY TICKETS →</div>
        </div>
      </nav>

      <div
        className={`ticketSection ${
          activeSection === "mainMenu3" ? "active" : ""
        }`}
      >
        <div className="progresss">
          <div
            className={`progress3 ${
              activeSection === "mainMenu" ? "active" : ""
            }`}
          ></div>
          <div
            className={`progress1 ${
              activeSection === "mainMenu2" ? "active" : ""
            }`}
          ></div>
          <div
            className={`progress2 ${
              activeSection === "mainMenu3" ? "active" : ""
            }`}
          ></div>
        </div>
        {activeSection === "mainMenu" && (
          <div className="selection">
            <div className="techMaster">
              <p className="fest">Techember Fest '25</p>
              <p className="fest1">
                Join us for an unforgettable experience at [Event Name]! Secure
                your spot now.
              </p>
              <p className="fest2">
                📍 [Event Location] || March 15, 2025 | 7:00 PM
              </p>
            </div>

            <div className="line"></div>
            <div className="select">
              <p>Select Ticket Type:</p>
              <div className="selectionList">
                <div
                  className={`ticket ${
                    selectedTicket === "Free" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("Free")}
                >
                  <h4>Free</h4>
                  <p>REGULAR ACCESS</p>
                  <p>20/52</p>
                </div>
                <div
                  className={`ticket ${
                    selectedTicket === "VIP" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("VIP")}
                >
                  <h4>$ 150</h4>
                  <p>VIP ACCESS</p>
                  <p>20/52</p>
                </div>
                <div
                  className={`ticket ${
                    selectedTicket === "VVIP" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("VVIP")}
                >
                  <h4>$ 150</h4>
                  <p>VVIP ACCESS</p>
                  <p>20/52</p>
                </div>
              </div>
            </div>
            <div className="number">
              <p>Number of Tickets</p>
              <select className="numbers" name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">6</option>
                <option value="7">8</option>
                <option value="9">9</option>
              </select>
            </div>
            <div className="buttons">
              <button className="cancel">Cancel</button>
              <button
                className="next"
                onClick={() => setActiveSection("mainMenu2")}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {activeSection === "mainMenu2" && (
          <div className="selection1">
            <div className="uploadSection">
              <p>Upload Profile Photo</p>
              <div className="black">
                <div className="black1">
                  <input className="file" type="file" id="hiddenFileInput" />
                  <label htmlFor="hiddenFileInput" className="photo">
                    <span id="icon" class="material-symbols-outlined">
                      cloud_download
                    </span>
                    <p>Drag & drop OR click to upload</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="line"></div>
            <form action="">
              <p>Enter your name</p>
              <input type="text" />
              <p>Enter your email*</p>
              <div className="input">
                <span id="icon1" class="material-symbols-outlined">
                  mail
                </span>
                <input
                  style={{
                    border: "none",
                    width: "80%",
                    height: "95%",
                    // backgroundColor: "red",
                  }}
                  type="text"
                  placeholder="hello@gmail.com"
                />
              </div>
              <p>Special Request?</p>
              <textarea name="textarea" placeholder="Textarea" id=""></textarea>
              <div className="buttons1">
                <button
                  className="cancel"
                  onClick={() => setActiveSection("mainMenu")}
                >
                  Back
                </button>
                <button
                  className="next"
                  onClick={() => setActiveSection("mainMenu3")}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {activeSection === "mainMenu3" && (
          <div className="selection2">
            <div className="ready">
              <h3>Your Ticket is Booked</h3>
              <p>
                Check your email for a copy or you can <span>Download</span>
              </p>
            </div>
            <div className="theTicket">
              <div className="myTicket">
                <div className="techember">
                  <h4>Techember Fest "25</h4>
                  <p>📍 04 Rumens Road, Ikoyi, Lagos</p>
                  <p>📅 March, 15, 2025 | 7:00 PM</p>
                  <div className="picture"></div>
                  <div className="details">
                    <div className="row">
                      <div className="cell">
                        <span>Name</span>
                        <p>Avi Chukwu</p>
                      </div>
                      <div className="cell">
                        <span>Email *</span>
                        <p>User@email.com</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="cell">
                        <span>Ticket Type:</span>
                        <p>VIP</p>
                      </div>
                      <div className="cell">
                        <span>Ticket for:</span>
                        <p>1</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="cell full-width">
                        <span>Special request?</span>
                        <p>
                          Nil? Or the user's sad story they write in here gets
                          this whole space, max of three rows.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="myTicket1">
                <Barcode
                  value="987654321098"
                  format="CODE128" // Barcode format (e.g., CODE128, EAN13, etc.)
                  width={2} // Width of a single bar
                  height={50} // Height of the barcode
                  displayValue={true} // Display the barcode value as text below
                  background="#ffffff" // Background color
                  opacity={1}
                  lineColor="#000000" // Color of the bars
                />
              </div>
            </div>

            <div className="buttons2">
              <button
                className="cancel"
                onClick={() => setActiveSection("mainMenu")}
              >
                Book Another Ticket
              </button>
              <button
                className="next"
                onClick={() => setActiveSection("mainMenu2")}
              >
                Download Ticket
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
