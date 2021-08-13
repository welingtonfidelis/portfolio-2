import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaGlobeAmericas,
  FaLinkedin,
  FaMapMarker,
  FaHome,
  FaBook,
  FaLeaf,
  FaGamepad,
  FaArrowCircleLeft,
} from "react-icons/fa";

import informations from "../../docs/informations.json";

export default function Cv() {
  const [cvHtml, setCvHtml] = useState("");

  useEffect(() => {
    getCvHtml();
  }, []);

  const getCvHtml = async () => {
    try {
      const { data } = await axios.get("../api/cv");

      if (data.ok) {
        setCvHtml(data.html);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadCv = async () => {
    try {
      const { data } = await axios.get("../api/cv", {
        params: { download: true },
        responseType: "blob",
      });

      const tmpUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = tmpUrl;
      link.setAttribute("download", "test.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="cv-page">
      <div className="top-bar">
        <div className="back-page" onClick={() => Router.push("/")}>
          <FaArrowCircleLeft />
          <span>Back to Portfolio</span>
        </div>
      </div>

      <div className="container">
        <div className="left-side">
          <div className="profile-text">
            <div className="img-bx">
              <img
                src="https://welingtonfidelisportfolio.s3.sa-east-1.amazonaws.com/images/user/user.jpg"
                alt="profile image"
              />
            </div>

            <h2>
              Welington Fidelis de Sousa
              <br />
              <span>Full Stack Web Developer</span>
            </h2>
          </div>

          <div className="contact-info">
            <h3 className="title">Contact Info</h3>
            <ul>
              {/* <li>
                <span className="icon">
                  <FaPhone />
                </span>
                <span className="text">+55 35 9 9999-9999</span>
              </li> */}
              <li>
                <span className="icon">
                  <FaEnvelope />
                </span>
                <span className="text">welingtonfidelis@gmail.com</span>
              </li>
              <li>
                <span className="icon">
                  <FaGlobeAmericas />
                </span>
                <span className="text">www.welingtonfidelis.dev.br</span>
              </li>
              <li>
                <span className="icon">
                  <FaLinkedin />
                </span>
                <span className="text">
                  linkedin.com/in/welington-fidelis-de-sousa-3944a6127
                </span>
              </li>
              <li>
                <span className="icon">
                  <FaMapMarker />
                </span>
                <span className="text">Minas Gerais, Brazil</span>
              </li>
            </ul>
          </div>

          <div className="contact-info education">
            <h3 className="title">Education</h3>
            <ul>
              <li>
                <h5>2015 - 2018</h5>
                <h4>Computer Science Degree</h4>
                <h4>IFSULDEMINAS Campus Passos, Minas Gerais</h4>
              </li>
            </ul>
          </div>

          <div className="contact-info language">
            <h3 className="title">Languages</h3>
            <ul>
              <li>
                <span className="text">Portuguese</span>
                <span className="percent">
                  <div style={{ width: "100%" }}></div>
                </span>
              </li>
              <li>
                <span className="text">English</span>
                <span className="percent">
                  <div style={{ width: "50%" }}></div>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="right-side">
          <div className="about">
            <h2 className="title-2">Profile</h2>
            <p dangerouslySetInnerHTML={{__html: informations.abount_me}}/>
          </div>

          <div className="about">
            <h2 className="title-2">Experience</h2>
            {informations.services.map((item, index) => (
              <div className="box" key={index}>
                <div className="year-company">
                  <h5>{`${item.start} - ${item.end}`}</h5>
                  <h5>{item.company_name}</h5>
                </div>
                <div className="text">
                  <h4>{item.position}</h4>
                  <p dangerouslySetInnerHTML={{__html: item.description }}/>
                </div>
              </div>
            ))}

            <div className="about skills">
              <h2 className="title-2">Professional Skills</h2>
              {
                informations.skills.map((item, index) => (
                  <div className="box">
                    <h4>{item.title}</h4>
                    <div className="percent">
                      <div style={{ width: `${item.level}%` }}></div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="about interest">
              <h2 className="title-2">Interests</h2>
              <ul>
                <li>
                  <FaHome /> Family
                </li>
                <li>
                  <FaLeaf /> Nature
                </li>
                <li>
                  <FaBook /> Studies
                </li>
                <li>
                  <FaGamepad /> Games
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
