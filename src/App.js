import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.css";

import Card from "./Card";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseEvent, setMouseEvent] = useState(null);
  const cardRef = useRef(null);
  const updateRate = 10;
  const timeToUpdate = () => {
    setCounter(counter + 1);
    return counter % updateRate === 0;
  };
  const setOrigin = element => {
    const { left, top, width, height } = element.getBoundingClientRect();
    setCenterX(Math.floor(left) + Math.floor(width.toFixed() / 2));
    setCenterY(Math.floor(top) + Math.floor(height.toFixed() / 2));
  };

  const updatePosition = event => {
    setMouseX(event.clientX - centerX);
    setMouseY((event.clientY - centerY) * -1);
  };

  const handleMouseEnter = useCallback(
    event => {
      setMouseEvent(event);
    },
    [mouseX, mouseY]
  );

  const handleMouseMove = useCallback(
    event => {
      setMouseEvent(event);
      if (timeToUpdate()) {
        update(event);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    cardRef.current.style = "";
  }, [mouseX, mouseY]);

  const update = event => {
    if (!event) return;

    updatePosition(event);
    updateTransformStyle(
      (mouseY / cardRef.current.offsetHeight / 2).toFixed(2),
      (mouseX / cardRef.current.offsetWidth / 2).toFixed(2)
    );
  };

  const updateTransformStyle = (x, y) => {
    const style = `rotateX(${x}deg) rotateY(${y}deg)`;
    cardRef.current.style.transform = style;
  };

  useEffect(() => {
    setOrigin(cardRef.current);
  }, [centerX, centerY]);

  useEffect(() => {
    update(mouseEvent);
  }, [mouseEvent]);

  return (
    <div className="card-container">
      <Card
        src="https://images.unsplash.com/photo-1542396601-dca920ea2807?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjc1MjQyfQ&auto=format&fit=crop&w=1896&q=80"
        handleMouseEnter={handleMouseEnter}
        handleMouseMove={handleMouseMove}
        handleMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        <h1 className="card__body__title">Mountains</h1>
        <p className="card__body__text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </Card>
    </div>
  );
}
