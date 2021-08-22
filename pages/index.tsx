import { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import { Form, Select } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  FaBars,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaGlobeAmericas,
  FaImages,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { CarouselImage } from "../components/carouselImage";

import { LanguageInterface } from "../store/language/model";
import { changeLanguage } from "../store/language/actions";
import {
  CarouselImageInterface,
  ServicesInterface,
  ProjectsInterface,
} from "../interfaces";

export default function Home() {
  const [mailLoading, setMailLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [easterEgg, setEasterEgg] = useState({ count: 0, text: "4" });
  const [showCarouselImage, setShowCarouselImage] =
    useState<CarouselImageInterface>({
      visible: false,
      title: "",
      images: [],
    });

  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const languageOnRedux = useSelector(
    (state: { language: LanguageInterface }) => state.language
  );

  const handleNavigation = () => {
    if (window.innerWidth <= 900) {
      const navigation = document.querySelector(".navigation")!;
      navigation.classList.toggle("active");
    }
  };

  const handleShowNavigationMenu = () => {
    const toggle = document.querySelector(".toggle")!;
    const topbar = document.querySelector(".topbar")!;
    const navigation = document.querySelector(".navigation")!;
    const main = document.querySelector(".main")!;

    toggle.classList.toggle("active");
    topbar.classList.toggle("active");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };

  const handleShowCarouselImage = (title: string, images: string[]) => {
    setShowCarouselImage({
      title,
      images,
      visible: true,
    });
  };

  const handleCloseCarouselImage = () => {
    setShowCarouselImage({
      title: "",
      images: [],
      visible: false,
    });
  };

  const handleSwitchTheme = () => {
    const body = document.querySelector("body")!;

    body.classList.toggle("dark");
    setDarkTheme(!darkTheme);
  };

  const handleSendEmail = async (values: any) => {
    if (!mailLoading) {
      setMailLoading(true);

      try {
        const { name, email, message } = values;
        const subject = `Contact from portfolio - ${name}`;
        const treatedMessage = (message + "").replace(
          /(?:\r\n|\r|\n)/g,
          "<br>"
        );

        const { data } = await axios.post("./api/mail", {
          email,
          subject,
          message: treatedMessage,
        });

        if (data.ok) {
          toast.success(t("contact.success_send"), { autoClose: 7000 });

          form.resetFields();
        }
      } catch (error) {
        console.log(error);
        toast.error(t("contact.error_send"), {
          autoClose: false,
        });
      }

      setMailLoading(false);
    }
  };

  const handleEasterEgg = () => {
    const count = easterEgg.count + 1;

    switch (count) {
      case 1:
        setEasterEgg({ count, text: "Re" });
        break;

      case 2:
        setEasterEgg({ count, text: "Rela" });
        break;

      case 3:
        setEasterEgg({ count, text: "Relax" });
        break;

      default:
        Router.push("/easterEgg");
        break;
    }
  };

  const handleChangeLanguage = (language: "pt" | "en") => {
    dispatch(changeLanguage({ language }));
  };

  return (
    <div id="home-page">
      <div className="navigation">
        <ul>
          <li>
            <a href="#banner" onClick={handleNavigation}>
              {t("navigation_menu.home")}
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleNavigation}>
              {t("navigation_menu.about")}
            </a>
          </li>
          <li>
            <a href="#services" onClick={handleNavigation}>
              {t("navigation_menu.services")}
            </a>
          </li>
          <li>
            <a href="#projects" onClick={handleNavigation}>
              {t("navigation_menu.projects")}
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleNavigation}>
              {t("navigation_menu.contact")}
            </a>
          </li>
        </ul>

        <div className="language-switch">
          <Select
            defaultValue={languageOnRedux.language}
            onChange={handleChangeLanguage}
            bordered={false}
            suffixIcon={false}
          >
            <Select.Option value="pt">
              <img loading="lazy" src="/images/brazil.png" alt="Brazil logo" width={30} />
              <span>Português</span>
            </Select.Option>

            <Select.Option value="en">
              <img loading="lazy" src="/images/eua.png" alt="EUA logo" width={30} />
              <span>English</span>
            </Select.Option>
          </Select>
        </div>

        <div className="theme-switch" onClick={handleSwitchTheme}>
          {darkTheme ? (
            <>
              <FaSun /> <span>{t("theme_switch.light")}</span>
            </>
          ) : (
            <>
              <FaMoon /> <span>{t("theme_switch.dark")}</span>
            </>
          )}
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <a href="#banner" className="logo">
            Portfolio
          </a>
          <div className="toggle">
            <FaBars onClick={handleShowNavigationMenu} />
          </div>
        </div>

        <section id="banner" className="banner">
          <div className="content">
            <div className="img-bx">
              <img loading="lazy"
                src="images/user_1.jpg"
                alt="User profile-1"
              />
            </div>

            <h3>Welington Fidelis de Sousa</h3>
            <p>{t("about_me.office")}</p>
            <a href="#" className="btn" onClick={() => Router.push("/cv")}>
              {t("about_me.view_cv")}
            </a>
          </div>

          <ul className="social-media">
            <li>
              <a
                href="https://www.linkedin.com/in/welington-fidelis-de-sousa-3944a6127"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/fideliswelington/"
                target="_blank"
              >
                <FaInstagram />
              </a>
            </li>
            {/* <li>
              <a
                href="https://www.youtube.com/channel/UCNlGJFOOjLwCtlvVbxV05qQ"
                target="_blank"
              >
                <FaYoutube />
              </a>
            </li> */}
            <li>
              <a href="https://twitter.com/welingtonfsousa" target="_blank">
                <FaTwitter />
              </a>
            </li>
          </ul>
        </section>

        <section id="about" className="about adjust">
          <div className="title">
            <h2>{t("about_me.title")}</h2>
          </div>

          <div className="content">
            <div className="text-bx">
              <p
                dangerouslySetInnerHTML={{ __html: t("about_me.description") }}
              />
            </div>

            <div className="img-bx">
              <img
                src="images/user_2.jpg"
                alt="User profile-2"
              />
            </div>
          </div>
        </section>

        <section id="services" className="services adjust">
          <div className="title">
            <h2>{t("services.title")}</h2>
            <p>{t("services.description")}</p>
          </div>

          <div className="content">
            {(
              t("services.list", { returnObjects: true }) as ServicesInterface[]
            ).map((item, index) => (
              <div className="service-bx" key={index}>
                <img loading="lazy" src={item.image_url} alt={item.position + "_image"} />
                <h2>{item.position}</h2>
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="projects adjust">
          <div className="title">
            <h2>{t("projects.title")}</h2>
            <p>{t("projects.description")}</p>
          </div>

          <div className="content">
            {(
              t("projects.list", { returnObjects: true }) as ProjectsInterface[]
            ).map((item, index) => (
              <div className="work-bx" key={index}>
                <div className="img-bx">
                  <img loading="lazy" src={item.images[0]} alt={item.title + "_image"} />
                </div>

                <div className="text-bx">
                  <h3>{item.title}</h3>
                  <div className="projects-action">
                    <a
                      title="Images"
                      href="#"
                      onClick={() =>
                        handleShowCarouselImage(item.title, item.images)
                      }
                    >
                      <FaImages />
                    </a>
                    <a title="Github" href={item.github_url} target="_blank">
                      <FaGithub />
                    </a>
                    {item.publication_url && (
                      <a
                        title="Publication"
                        href={item.publication_url}
                        target="_blank"
                      >
                        <FaGlobeAmericas />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact adjust">
          <div className="title">
            <h2>{t("contact.title")}</h2>
            <p>{t("contact.description")}</p>
          </div>

          <Form form={form} onFinish={handleSendEmail} className="contact-form">
            <div className="contact-form">
              <div className="row">
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: t("contact.input_error_name") },
                  ]}
                >
                  <input
                    type="text"
                    name=""
                    placeholder={t("contact.input_name")}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: t("contact.input_error_email"),
                    },
                  ]}
                >
                  <input type="text" name="" placeholder={t("contact.email")} />
                </Form.Item>
              </div>
              <div className="row-2">
                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: t("contact.input_error_message"),
                    },
                  ]}
                >
                  <textarea
                    name=""
                    placeholder={t("contact.input_message")}
                  ></textarea>
                </Form.Item>
              </div>
              <div className="btn row-2" onClick={() => form.submit()}>
                {mailLoading ? (
                  <AiOutlineLoading className="rotate-center" />
                ) : (
                  <span>{t("contact.button_send")}</span>
                )}
              </div>
            </div>
          </Form>
        </section>

        <div className="easter-egg" onClick={handleEasterEgg}>
          {easterEgg.text}
        </div>
      </div>

      <ToastContainer />

      <CarouselImage
        isVisible={showCarouselImage.visible}
        title={showCarouselImage.title}
        images={showCarouselImage.images}
        onClose={handleCloseCarouselImage}
      />
    </div>
  );
}
