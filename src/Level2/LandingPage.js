import "./landing.css";
import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import axios from "axios";

function LandingPage() {
  const [activeSection, setActiveSection] = useState("mainMenu");
  const [selectedTicket, setSelectedTicket] = useState("Free");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("ticketData"));
    if (savedData) {
      setFullName(savedData.fullName);
      setEmail(savedData.email);
      setAvatar(savedData.avatar);
    }
  }, []);

  const handleDownloadTicket = () => {
    const ticketSection = document.querySelector(".theTicket");
    const printWindow = window.open("", "_blank");

    // Write the HTML content to the new window
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Ticket</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 10px; /* Reduced margin */
            padding: 0; /* No padding */
          }
          .theTicket {
            max-width: 100%; /* Use full width */
            margin: 0 auto; /* Center the ticket */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .myTicket {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(rgb(18, 89, 100) 0%, rgb(8, 46, 51) 100%);
            border: solid 1.5px rgb(26, 120, 137);
            padding: 5px; /* Reduced padding */
            box-sizing: border-box; /* Include padding in width */
          }
          .myTicket1 {
            width: 100%;
            background-image: radial-gradient(rgb(18, 89, 100), rgb(8, 46, 51));
            border: solid 1.5px rgb(26, 120, 137);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px; /* Reduced padding */
            box-sizing: border-box; /* Include padding in width */
          }
          .techember {
            width: 90%; /* Slightly reduced width */
            border: solid 1.5px rgb(14, 74, 83);
            border-radius: 10px; /* Reduced border radius */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 5px; /* Reduced padding */
            font-size: 12px; /* Reduced font size */
            font-weight: 400;
            line-height: 1.2; /* Adjusted line height */
            gap: 5px; /* Reduced gap */
          }
          .picture {
            width: 70%;
            background-color: rgb(16, 36, 39);
            border: solid 2px rgb(85, 222, 243); /* Reduced border size */
            border-radius: 10px; /* Reduced border radius */
            margin-bottom: 5px; /* Added margin for spacing */
          }
          .details {
            width: 95%;
            background-color: rgb(8, 52, 60);
            border-radius: 5px; /* Reduced border radius */
            border: solid 1px rgb(15, 57, 63);
            color: white;
            padding: 5px;
            font-size: 10px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgb(14, 62, 70);
            padding: 0.3rem 0; /* Reduced padding */
          }
          .row:last-child {
            border-bottom: none;
          }
          .cell {
            flex: 1;
            padding: 0 0.3rem; /* Reduced padding */
          }
          .cell span {
            display: block;
            font-weight: bold;
            color: #cfcfcf;
            margin-bottom: 0.1rem; /* Reduced margin */
          }
          .cell p {
            margin: 0;
            color: #ffffff;
            font-size: 10px; /* Reduced font size */
          }
        </style>
      </head>
      <body>
        ${ticketSection.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.print();
  };
  const handleSelect = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default"); // Replace with your upload preset

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dm27cd4jp/image/upload`, // Replace with your Cloudinary cloud name
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              const percent = Math.floor((loaded * 100) / total);
              setUploadProgress(percent); // Update upload progress
              console.log(`Upload Progress: ${percent}%`); // Log progress
            },
          }
        );
        setAvatar(response.data.secure_url); // Set the avatar URL from Cloudinary
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Error uploading image. Please try again.");
      }
    }
  };

  const validateForm = () => {
    if (!fullName || !email || !avatar) {
      alert("All fields are required.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!avatar.startsWith("http")) {
      alert("Please upload a valid image URL.");
      return false;
    }
    if (ticketCount < 1) {
      alert("Please select at least one ticket.");
      return false;
    }
    return true; // Ensure to return true if all validations pass
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const ticketInfo = {
        fullName,
        email,
        avatar,
        selectedTicket,
        ticketCount,
        ticketNumber: Math.floor(Math.random() * 1000000000).toString(),
        price: selectedTicket === "Free" ? 0 : 150,
      };
      setTicketData(ticketInfo);
      localStorage.setItem("ticketData", JSON.stringify(ticketInfo));
      setActiveSection("mainMenu3");
    }
  };

  return (
    <div className="mainContainer">
      <nav>
        <div className="nav-container">
          <div className="logo">ticz</div>
          <ul className="nav-links">
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  const savedData = JSON.parse(
                    localStorage.getItem("ticketData")
                  );
                  if (savedData) {
                    setTicketData(savedData);
                    setActiveSection("mainMenu3");
                  } else {
                    alert("No tickets found.");
                  }
                }}
              >
                My Tickets
              </a>
            </li>
            <li>
              <a href="#">About Project</a>
            </li>
          </ul>
          <div className="cta-button">MY TICKETS →</div>
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
              <select
                className="numbers"
                value={ticketCount}
                onChange={(e) => setTicketCount(Number(e.target.value))}
              >
                {[...Array(9)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
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
                  <input
                    className="file"
                    type="file"
                    id="hiddenFileInput"
                    onChange={handleAvatarUpload}
                  />
                  <label htmlFor="hiddenFileInput" className="photo">
                    <span id="icon" className="material-symbols-outlined">
                      cloud_download
                    </span>
                    <p>Drag & drop OR click to upload</p>
                  </label>
                </div>
                {uploadProgress > 0 && (
                  <p>Upload Progress: {uploadProgress}%</p>
                )}{" "}
                {/* Display upload progress */}
              </div>
            </div>
            <div className="line"></div>
            <form action="">
              <p>Enter your name</p>
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
              <p>Enter your email*</p>
              <div className="input">
                <span id="icon1" className="material-symbols-outlined">
                  mail
                </span>
                <input
                  style={{ border: "none", width: "80%", height: "95%" }}
                  type="text"
                  placeholder="hello@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
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
                <button className="next" onClick={handleSubmit}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {activeSection === "mainMenu3" && ticketData && (
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
                  <div className="picture">
                    <img
                      width={"100%"}
                      height={"100%"}
                      borderRadius={"20px"}
                      src={ticketData.avatar}
                      alt="Avatar"
                    />
                  </div>
                  <div className="details">
                    <div className="row">
                      <div className="cell">
                        <span>Name</span>
                        <p>{ticketData.fullName}</p>
                      </div>
                      <div className="cell">
                        <span>Email *</span>
                        <p>{ticketData.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="cell">
                        <span>Ticket Type:</span>
                        <p>{ticketData.selectedTicket}</p>
                      </div>
                      <div className="cell">
                        <span>Price:</span>
                        <p>${ticketData.price}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="cell">
                        <span>Number of Tickets:</span>
                        <p>{ticketData.ticketCount}</p>
                      </div>
                      <div className="cell">
                        <span>Ticket Number:</span>
                        <p>{ticketData.ticketNumber}</p>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="cell full-width">
                        <span>Special request?</span>
                        <p>
                          Nil? Or the user's sad story they write in here gets
                          this whole space, max of three rows.
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="myTicket1">
                <Barcode
                  value={ticketData.ticketNumber}
                  format="CODE128"
                  width={2}
                  height={45}
                  displayValue={true}
                  background="#ffffff"
                  opacity={1}
                  lineColor="#000000"
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
              <button className="next" onClick={handleDownloadTicket}>
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
