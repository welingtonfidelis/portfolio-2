import Router from "next/router";
import { useState } from "react";
import { FaArrowCircleLeft, FaPlayCircle, FaStopCircle } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";

export default function EasterEgg() {
  const [playVideo, setPlayVideo] = useState(true);

  return (
    <div id="easter-egg-page">
      <div className="top-bar">
        <div className="back-page" onClick={() => Router.push("/")}>
          <FaArrowCircleLeft />
          <span>Back to Portfolio</span>
        </div>
      </div>

      <div className="container">
        <img src="/gifs/mt-fugi/day.gif" alt="" />

        <span>
          Thank you for visiting my website, your presence here is{" "}
          <strong>very </strong> important to me 😄. <br /> For now, relax.
          Leave the heavier stuff out of here and feel the music...
        </span>

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
