import React from "react";

const video = React.forwardRef((props, ref) => (
    <video
        src={props.src}
        controls
        playsInline
        crossOrigin
        onEnded={props.onVideoEnded}
        autoPlay={props.autoplay}
        ref={ref}
  />
));

export default video;
