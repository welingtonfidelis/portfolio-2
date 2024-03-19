import Router from "next/router";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import {
  FaEnvelope,
  FaGlobeAmericas,
  FaLinkedin,
  FaMapMarker,
  FaArrowCircleLeft,
  FaGithub,
} from "react-icons/fa";
import { RiDownloadCloudLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { EducationInterface, ServicesInterface } from "../../interfaces";

export default function Cv() {
  const { t } = useTranslation();

  const handleDownloadCv = async () => {
    toJpeg(document.getElementById("pdfContainer")! as HTMLElement, {
      quality: 1,
    }).then(function (dataUrl) {
      fetch(dataUrl).then((res) => {
        // Download IMAGE
        // const link = document.createElement("a");
        // link.download = "welington_fidelis_cv.jpeg";
        // link.href = dataUrl;
        // link.click();

        // Download PDF
        res.blob().then((blob) => {
          const doc = new jsPDF("p", "mm", "a4");
          const reader = new FileReader();
          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();

          reader.readAsDataURL(blob);
          reader.onload = () => {
            doc.addImage(reader.result as string, "JPEG", 0, 0, width, height);
            doc.save("welington_fidelis_cv.pdf");
          };
        });
      });
    });
  };

  return (
    <div id="cv-page">
      <div className="top-bar">
        <div className="back-page" onClick={() => Router.push("/")}>
          <FaArrowCircleLeft />
          <span>{t("cv_back_page")}</span>
        </div>

        <div className="back-page" onClick={handleDownloadCv}>
          <RiDownloadCloudLine />
          <span>{t("cv_download")}</span>
        </div>
      </div>

      <div className="container" id="pdfContainer">
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

          <div className="lateral-list contact">
            <h3 className="title">{t("contact.subtitle")}</h3>
            <ul>
              <li>
                <FaEnvelope />
                <span className="text">welingtonfidelis@gmail.com</span>
              </li>
              <li>
                <FaGlobeAmericas />
                <span className="text">www.welingtonfidelis.com.br</span>
              </li>
              <li>
                <FaLinkedin />
                <span className="text">
                  linkedin.com/in/welington-fidelis-de-sousa-3944a6127
                </span>
              </li>
              <li>
                <FaGithub />
                <span className="text">github.com/welingtonfidelis</span>
              </li>
              <li>
                <FaMapMarker />
                <span className="text">Minas Gerais, Brazil</span>
              </li>
            </ul>
          </div>

          <div className="lateral-list education">
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

          <div className="lateral-list language">
            <h3 className="title">{t("language.title")}</h3>
            <ul>
              <li>
                <span className="text">{t("language.portuguese_lvl")}</span>
              </li>
              <li>
                <span className="text">{t("language.english_lvl")}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
