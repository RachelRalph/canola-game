import ReactPlayer from "react-player/file";
import { useEffect } from "react";

function isSafari() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent || "";
  const vendor = navigator.vendor || "";

  return /Safari/i.test(ua) && /Apple/i.test(vendor) && !/Chrome|Chromium|CriOS|FxiOS|Edg/i.test(ua);
}

function Animation({
  video,
  safariVideo,
  png,
  getAnimate,
  setAnimate,
  durationMs = 2000,
  kind = "generic",
  extraClassName = "",
  stillClassName = "",
}) {
    const isAnimating = getAnimate();
    const animationSource = isSafari() && safariVideo ? safariVideo : video;
    const animatedImage = typeof animationSource === "string" && animationSource.toLowerCase().endsWith(".png");

    useEffect(() => {
      if (!isAnimating) {
        return undefined;
      }

      const timer = window.setTimeout(() => {
        setAnimate(false);
      }, durationMs);

      return () => window.clearTimeout(timer);
    }, [durationMs, isAnimating, setAnimate]);

    if (isAnimating){
    if (animatedImage) {
      return (
        <img
          src={animationSource}
          className={`asset-media asset-animation asset-${kind} ${extraClassName}`.trim()}
          alt=""
        />
      );
    }

    return (
       <ReactPlayer
         url={animationSource}
         muted={true}
         playing={true}
         loop={false}
         onEnded={() => setAnimate(false)}
         className={`asset-media asset-animation asset-${kind} ${extraClassName}`.trim()}
       />
        );
    }
    else {
        return(
        <img src={png} className={`asset-media asset-image asset-${kind} ${stillClassName}`.trim()} alt="" />
        );
    }
}

export default Animation;
