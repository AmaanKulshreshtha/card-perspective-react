import React from "react";
import "./index.css";

const Card = React.forwardRef(
  (
    {
      src,
      children,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseMove,
      styles
    },
    ref
  ) => (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      <div className="card__img">
        <img src={src} />
      </div>
      <div className="card__body">{children}</div>
      <div className="card__overlay" />
    </div>
  )
);

export default Card;
