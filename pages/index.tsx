import { useState } from "react";
import Router from "next/router";
import { Form } from "antd";
import { AiOutlineLoading } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
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
  FaYoutube,
} from "react-icons/fa";

import { CarouselImage } from "../components/carouselImage";

interface CarouseInterface {
  visible: boolean;
  title: string;
  images: string[];
}

import informations from "../docs/informations.json";

export default function Home() {
  const [mailLoading, setMailLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [easterEgg, setEasterEgg] = useState({ count: 0, text: "-" });
  const [showCarouselImage, setShowCarouselImage] = useState<CarouseInterface>({
    visible: false,
    title: "",
    images: [],
  });

  const [form] = Form.useForm();

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
          toast.success("Email successfully sent!", { autoClose: 7000 });

          form.resetFields();
        }
      } catch (error) {
        console.log(error);
        toast.error("Error sending email. Please, try again.", {
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

  return (
    <div id="home-page">
      <div className="navigation">
        <ul>
          <li>
            <a href="#banner" onClick={handleNavigation}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={handleNavigation}>
              About
            </a>
          </li>
          <li>
            <a href="#services" onClick={handleNavigation}>
              Services
            </a>
          </li>
          <li>
            <a href="#projects" onClick={handleNavigation}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" onClick={handleNavigation}>
              Contact
            </a>
          </li>
        </ul>

        <div className="theme-switch" onClick={handleSwitchTheme}>
          {darkTheme ? (
            <>
              <FaSun /> <span>Switch to Light Mode</span>
            </>
          ) : (
            <>
              <FaMoon /> <span>Switch to Dark Mode</span>
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
              <img
                src="https://welingtonfidelisportfolio.s3.sa-east-1.amazonaws.com/images/user/user.jpg"
                alt="User profile-1"
              />
            </div>

            <h3>Welington Fidelis de Sousa</h3>
            <p>I'm a Full Stack Web Developer.</p>
            <a href="#" className="btn" onClick={() => Router.push("/cv")}>
              View My CV
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
            <li>
              <a
                href="https://www.youtube.com/channel/UCNlGJFOOjLwCtlvVbxV05qQ"
                target="_blank"
              >
                <FaYoutube />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/welingtonfsousa" target="_blank">
                <FaTwitter />
              </a>
            </li>
          </ul>
        </section>

        <section id="about" className="about adjust">
          <div className="title">
            <h2>About Me</h2>
          </div>

          <div className="content">
            <div className="text-bx">
              <p dangerouslySetInnerHTML={{__html: informations.abount_me}}/>
            </div>

            <div className="img-bx">
              <img
                src="https://welingtonfidelisportfolio.s3.sa-east-1.amazonaws.com/images/user/user-2.jpg"
                alt="User profile-2"
              />
            </div>
          </div>
        </section>

        <section id="services" className="services adjust">
          <div className="title">
            <h2>My Services</h2>
            <p>
              These are some experience I won working with technology until now.
            </p>
          </div>

          <div className="content">
            {informations.services.map((item, index) => (
              <div className="service-bx" key={index}>
                <img src={item.image_url} alt={item.position + "_image"} />
                <h2>{item.position}</h2>
                <p dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="projects adjust">
          <div className="title">
            <h2>Recent Work</h2>
            <p>
              Here are some projects that I worked on in my spare time, to have fun and study.
            </p>
          </div>

          <div className="content">
            {informations.projects.map((item, index) => (
              <div className="work-bx" key={index}>
                <div className="img-bx">
                  <img src={item.images[0]} alt={item.title + "_image"} />
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
            <h2>Let's Say Hi</h2>
            <p>
              Well, how about we talk?
            </p>
          </div>

          <Form form={form} onFinish={handleSendEmail} className="contact-form">
            <div className="contact-form">
              <div className="row">
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "What's your name?" }]}
                >
                  <input type="text" name="" placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "What's your email?",
                    },
                  ]}
                >
                  <input type="text" name="" placeholder="Email Address" />
                </Form.Item>
              </div>
              <div className="row-2">
                <Form.Item
                  name="message"
                  rules={[{ required: true, message: "What's your message?" }]}
                >
                  <textarea name="" placeholder="Message"></textarea>
                </Form.Item>
              </div>
              <div className="btn row-2" onClick={() => form.submit()}>
                {mailLoading ? (
                  <AiOutlineLoading className="rotate-center" />
                ) : (
                  <span>Send</span>
                )}
              </div>
            </div>
          </Form>
        </section>

        <div className="easter-egg" onClick={handleEasterEgg}>{easterEgg.text}</div>
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
