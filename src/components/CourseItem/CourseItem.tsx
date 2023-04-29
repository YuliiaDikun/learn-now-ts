import React, { useRef } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import { useLocation } from "react-router-dom";
import { CourseItemProps } from "../../interfaces/Courses";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import VideoJS from "../VideoJS/VideoJS";
import Skill from "../Skill/Skill";
import {
  StyledItem,
  CourseWrapper,
  ImgWrapper,
  DescWrapper,
  CourseText,
  RatingWrapper,  
} from "./CourseItem.styled";

const CourseItem:React.FC<CourseItemProps> = ({ course }) => {  
  const playerRef = useRef<null | VideoJsPlayer>(null);
  const location = useLocation();
  const { id, previewImageLink, title, lessonsCount, meta, rating } = course;

  const handlePlayerReady = (player:videojs.Player) => {
    playerRef.current = player;
    player.muted(true);
    function handlePlay() {
      player.play();
    }
    function handlePause() {
      player.pause();
    }
    
    player.on("mouseover", handlePlay);

    player.on("mouseout", handlePause);
  };

  const videoJsOptions = {    
    controls: false,
    responsive: true,
    fluid: true,
    poster: `${previewImageLink}/cover.webp`,
    sources: [
      {
        src: meta.courseVideoPreview?.link,
        type: "application/x-mpegURL",
      },
    ],
  };
  return (
    <StyledItem to={`${id}`} state={{ from: location }}>
      <CourseWrapper>
        <ImgWrapper>
          {meta.courseVideoPreview?.link ? (
            <VideoJS
              options={videoJsOptions}
              onReady={handlePlayerReady}
              preview={true}
            />
          ) : (
            <img src={`${previewImageLink}/cover.webp`} alt={title} />
          )}
        </ImgWrapper>
        <DescWrapper>
          <CourseText>{title}</CourseText>
          <RatingWrapper>
            <p>
              Available Lessons:
              <span>{lessonsCount}</span>
              <MdOutlinePlayLesson size={20} />
            </p>
            <p>
              Rating: <span>{rating.toFixed(1)} </span> <FcRating size={20} />
            </p>
          </RatingWrapper>
          <Skill skills={ meta.skills} />          
        </DescWrapper>
      </CourseWrapper>
    </StyledItem>
  );
};

export default CourseItem;