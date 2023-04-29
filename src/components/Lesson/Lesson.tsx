import React, { useEffect, useRef, useState } from 'react';
import { VideoJsPlayer } from 'video.js';
import throttle from 'lodash.throttle';
import { ImBlocked } from 'react-icons/im';
import VideoJS from '../VideoJS/VideoJS';
import { LessonProps, IProgressBarStyles } from '../../interfaces/Courses';
import {
  VideoItem,
  LessonTitle,
  LessonTextWrapper,
  StyledOpenSpan,
  VideoWrapper,
  ProgressBarContainer,
  ProgressBar,
} from './Lesson.styled';

const Lesson: React.FC<LessonProps> = ({
  lesson,
  i,
  openLesson,
  toggleLessonVideo,
}) => {
  const { id, title, status, link, previewImageLink, order, duration } = lesson;

  const playerRef = useRef<null | VideoJsPlayer>(null);

  const [progressBarStyles, setProgressBarStyles] = useState<IProgressBarStyles>({
    width: '0%',
    backgroundColor: 'transparent',
    boxShadow: '0px 1px 8px rgba(36, 204, 44, 0.5)',
  });

  const lessonsFromLocalStorage = JSON.parse(
    localStorage.getItem('lessons') ?? '{}',
  ) as Record<string, number>;

  const lessonTime = lessonsFromLocalStorage[openLesson] ?? 0;

  const isLocked = status === 'locked';
  const isVideoAvailable = isLocked ? 'locked' : id;
  const isOpen = openLesson === id;

  useEffect(() => {
    const updatedProgressBarStyles:IProgressBarStyles = {      
      backgroundColor: 'green',
    };
    let progressVideo = (lessonTime / duration!) * 100;

    updatedProgressBarStyles.width = `${progressVideo}%`;
    setProgressBarStyles(updatedProgressBarStyles);
  }, [duration, lessonTime]);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    player.currentTime(lessonTime);
    function getTime() {
      localStorage.setItem(
        'lessons',
        JSON.stringify({
          ...lessonsFromLocalStorage,
          [`${openLesson}`]: player.cache_.currentTime,
        }),
      );
    }

    player.on('timeupdate', throttle(getTime, 1000));
  };

  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    poster: `${previewImageLink}/lesson-${order}.webp`,
    sources: [
      {
        src: link || '',
        type: 'application/x-mpegURL',
      },
    ],
  };

  return (
    <VideoItem>
      <LessonTextWrapper onClick={() => toggleLessonVideo(isVideoAvailable)}>
        <LessonTitle>
          {i + 1}. {title}
          {isLocked && <ImBlocked color='red' size={15} />}
        </LessonTitle>
        <StyledOpenSpan clicked={isOpen}>+</StyledOpenSpan>
      </LessonTextWrapper>
      <VideoWrapper open>
        {isOpen && (
          <>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            <ProgressBarContainer>
              <ProgressBar style={{ ...progressBarStyles }} />
            </ProgressBarContainer>
          </>
        )}
      </VideoWrapper>
    </VideoItem>
  );
};

export default Lesson;
