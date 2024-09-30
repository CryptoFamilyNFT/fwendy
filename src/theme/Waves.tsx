import React from 'react';

const wavesStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '15vh',
  marginBottom: '-7px',
  minHeight: '100px',
  maxHeight: '150px',
};

const parallaxStyles = {
  animation: 'moveForever 25s cubic-bezier(.55,.5,.45,.5) infinite',
};

const useStyle1 = {
  animationDelay: '-2s',
  animationDuration: '7s',
};

const useStyle2 = {
  animationDelay: '-3s',
  animationDuration: '10s',
};

const useStyle3 = {
  animationDelay: '-4s',
  animationDuration: '13s',
};

const useStyle4 = {
  animationDelay: '-5s',
  animationDuration: '20s',
};

const keyframesStyle = `
  @keyframes moveForever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }
    100% {
      transform: translate3d(85px, 0, 0);
    }
  }
`;

const Waves: React.FC = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <style>{keyframesStyle}</style>
      <svg
        style={wavesStyle}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" style={{ ...parallaxStyles, ...useStyle1 }} />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" style={{ ...parallaxStyles, ...useStyle2 }} />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" style={{ ...parallaxStyles, ...useStyle3 }} />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" style={{ ...parallaxStyles, ...useStyle4 }} />
        </g>
      </svg>
    </div>
  );
};

export default Waves;
