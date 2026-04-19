import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { ABOUT_IMAGES, ABOUT_CONTENT } from '../../constants';
import './About.css';

const SLIDE_MS = 10000;

function circularOffset(index: number, activeIndex: number, len: number) {
  // Normalize offset to the shortest direction around the loop.
  let d = index - activeIndex;
  if (d > len / 2) d -= len;
  if (d < -len / 2) d += len;
  return d;
}

export function About() {
  const images = useMemo(() => ABOUT_IMAGES, []);
  const len = images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timerRef.current != null) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % len);
    }, SLIDE_MS);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current != null) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  const onPick = (nextIndex: number) => {
    setActiveIndex(nextIndex);
    resetTimer();
  };

  return (
    <section className="about">
       <h2>
        {ABOUT_CONTENT.title.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </h2>

      <div className="text about-text">
        {ABOUT_CONTENT.secondaryText.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>

      <div className="about-slider" aria-label="About images slider">
        {images.map((src, i) => {
          const offset = circularOffset(i, activeIndex, len);
          const isVisible = offset === -1 || offset === 0 || offset === 1;

          // Percent-based asymmetric layout with visible gaps.
          // left: 18%, gap: 2%, center: 60%, gap: 2%, right: 18%
          let roleLeft = -9999;
          let roleWidth = 18;
          if (offset === -1) {
            roleLeft = 0;
            roleWidth = 18;
          } else if (offset === 0) {
            roleLeft = 20;
            roleWidth = 60;
          } else if (offset === 1) {
            roleLeft = 82;
            roleWidth = 18;
          }

          return (
            <button
              key={i}
              type="button"
              className={`about-photo ${offset === -1 ? 'left' : offset === 0 ? 'center' : offset === 1 ? 'right' : 'hidden'}`}
              style={
                {
                  left: `${roleLeft}%`,
                  width: `${roleWidth}%`,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  backgroundImage: `url(${src})`,
                } satisfies CSSProperties
              }
              onClick={() => onPick(i)}
              aria-label="Show photo"
            />
          );
        })}
      </div>

     
    </section>
  );
}
