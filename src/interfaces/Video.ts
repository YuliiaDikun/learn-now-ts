import { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
export interface IVideoJSProps {
  options: VideoJsPlayerOptions;
  onReady?: (player: VideoJsPlayer) => void;
  preview?: boolean;
}