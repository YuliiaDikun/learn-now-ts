import { useEffect, useRef } from "react";
import videojs from "video.js";
import { VideoJsPlayer } from "video.js";
import { IVideoJSProps } from "../../interfaces/Video";
import "video.js/dist/video-js.css";
import { VideoWrapper } from "./VideoJS.styled";


export const VideoJS: React.FC<IVideoJSProps> = ({ options, onReady, preview }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VideoJsPlayer | null>(null); 

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video");

      videoElement.className = "video-js vjs-big-play-centered";
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        options,
        () => {
          onReady && onReady(player);
        }
      ));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay || false);
      player.src(options.sources || []);
    }
  }, [options, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <VideoWrapper preview={preview} data-vjs-player>
      <div ref={videoRef} />
    </VideoWrapper>
  );
};

export default VideoJS;