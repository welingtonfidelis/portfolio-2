import Router from "next/router";
import { toJpeg } from "html-to-image";
import {
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
import { GoCloudDownload } from "react-icons/go";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  EducationInterface,
  InterestInterface,
  ServicesInterface,
  SkillInterface,
} from "../../interfaces";

export default function Cv() {
  const [screenWidth, setScreenWidth] = useState(0);

  const { t } = useTranslation();
  const interestIcons = [<FaHome />, <FaBook />, <FaLeaf />, <FaGamepad />];

  useEffect(() => {
    const body = document.querySelector("body")!;
    setScreenWidth(body.clientWidth);
  }, []);

  const handleDownloadCv = async () => {
    toJpeg(document.querySelector(".container")! as HTMLElement, { quality: 1 }).then(
      function (dataUrl) {
        var link = document.createElement("a");
        link.download = "welington_fidelis_cv.jpeg";
        link.href = dataUrl;
        link.click();
      }
    );
  };

  return (
    <div id="cv-page">
      <div className="top-bar">
        <div className="back-page" onClick={() => Router.push("/")}>
          <FaArrowCircleLeft />
          <span>{t("cv_back_page")}</span>
        </div>

        {screenWidth > 900 ? (
          <div className="back-page" onClick={handleDownloadCv}>
            <GoCloudDownload />
            <span>{t("cv_download")}</span>
          </div>
        ) : (
          <span className="size-alert-txt">
            {t("cv_invalid_size_donwload")}
          </span>
        )}
      </div>

      <div className="container">
        <div className="left-side">
          <div className="profile-text">
            <div className="img-bx">
              <img src="/images/user_1.jpg" alt="profile image" />
            </div>

            <h2>
              Welington Fidelis de Sousa
              <br />
              <span>{t("about_me.office")}</span>
            </h2>
          </div>

          <div className="contact-info">
            <h3 className="title">{t("contact.subtitle")}</h3>
            <ul>
              {/* <li>
                <span className="icon">
                  <FaPhone />
                </span>
                <span className="text">+55 35 9 9999-9999</span>
              </li> */}
              <li>
                <FaEnvelope />
                <span className="text">welingtonfidelis@gmail.com</span>
              </li>
              <li>
                <FaGlobeAmericas />
                <span className="text">www.welingtonfidelis.dev.br</span>
              </li>
              <li>
                <FaLinkedin />
                <span className="text">
                  linkedin.com/in/welington-fidelis-de-sousa-3944a6127
                </span>
              </li>
              <li>
                <FaMapMarker />
                <span className="text">Minas Gerais, Brazil</span>
              </li>
            </ul>
          </div>

          <div className="contact-info education">
            <h3 className="title">{t("education.title")}</h3>
            <ul>
              {(
                t("education.list", {
                  returnObjects: true,
                }) as EducationInterface[]
              ).map((item, index) => (
                <li key={index}>
                  <h5>
                    {item.start} - {item.end}
                  </h5>
                  <h4>{item.title}</h4>
                  <h4>{item.institution}</h4>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-info language">
            <h3 className="title">{t("language.title")}</h3>
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
            <h2 className="title-2">{t("about_me.title")}</h2>
            <p
              dangerouslySetInnerHTML={{ __html: t("about_me.description") }}
            />
          </div>

          <div className="about">
            <h2 className="title-2">{t("services.title")}</h2>
            {(
              t("services.list", { returnObjects: true }) as ServicesInterface[]
            ).map((item, index) => (
              <div className="box" key={index}>
                <div className="year-company">
                  <h5>{`${item.start} - ${item.end}`}</h5>
                  <h5>{item.company_name}</h5>
                </div>
                <div className="text">
                  <h4>{item.position}</h4>
                  <p dangerouslySetInnerHTML={{ __html: item.description }} />
                </div>
              </div>
            ))}

            <div className="about skills">
              <h2 className="title-2">{t("skills.title")}</h2>
              {(
                t("skills.list", { returnObjects: true }) as SkillInterface[]
              ).map((item, index) => (
                <div className="box" key={index}>
                  <h4>{item.title}</h4>
                  <div className="percent">
                    <div style={{ width: `${item.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about interest">
              <h2 className="title-2">{t("interests.title")}</h2>
              <ul>
                {(
                  t("interests.list", {
                    returnObjects: true,
                  }) as InterestInterface[]
                ).map((item, index) => (
                  <li key={index}>
                    {interestIcons[index]} {item.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
