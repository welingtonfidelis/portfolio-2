import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowCircleLeft, FaPlayCircle, FaStopCircle } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";

export default function EasterEgg() {
  const [playVideo, setPlayVideo] = useState(true);
  const [wallpaper, setWallpaper] = useState("/gifs/mt-fugi/day.gif");

  const { t } = useTranslation();

  useEffect(() => {
    handleVerifyHours();

    setInterval(() => { handleVerifyHours }, 60000);
  }, []);

  const handleVerifyHours = () => {
    const hoursNow = new Date().getHours();

    switch (true) {
      case hoursNow >= 6 && hoursNow < 18:
        setWallpaper("/gifs/mt-fugi/day.gif");
        break;

      case hoursNow >= 18 && hoursNow < 19:
        setWallpaper("/gifs/mt-fugi/sunset.gif");
        break;

      case hoursNow >= 19:
        setWallpaper("/gifs/mt-fugi/night.gif");
        break;

      default:
        break;
    }
  };

  return (
    <div id="easter-egg-page">
      <div className="top-bar">
        <div className="back-page" onClick={() => Router.push("/")}>
          <FaArrowCircleLeft />
          <span>{t("easter_egg_back_page")}</span>
        </div>
      </div>

      <div className="container">
        <img src={wallpaper} alt="" />

        <span dangerouslySetInnerHTML={{__html: t("easter_egg_text") }}/>

        <div className="music-control" onClick={() => setPlayVideo(!playVideo)}>
          {playVideo ? <FaStopCircle /> : <FaPlayCircle />}
        </div>

        <ReactPlayer
          loop={true}
          controls={false}
          width={0}
          height={0}
          playing={playVideo}
          volume={70}
          url="https://www.youtube.com/watch?v=V1bFr2SWP1I&list=PLORnc8NCIEmFQY3XcciYZgglhYcKHPj_Q"
        />
      </div>
    </div>
  );
}
