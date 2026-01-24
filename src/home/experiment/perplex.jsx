import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <div className="button-container">
        <button className="brutalist-button openai button-1">
          <div className="openai-logo">
            <svg className="openai-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.3977 7.0896h-2.3106V0.0676l-7.5094 6.3542V0.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932 -6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657 -4.531v4.531h-5.355l5.355 -4.531zm-13.2862 0.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h0.0001v-2.6488l5.7763 -5.7764v7.0111l-5.7764 5.2993zm12.7086 0.0248 -5.7766 -5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882 -5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z" fill="#21B2C7" />
            </svg>
          </div>
          <div className="button-text">
            <span>Powered By</span>
            <span>Perplexity</span>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .brutalist-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    color: #eaf9fb;
    font-weight: bold;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .button-1 {
    background-color: #0b3f46;
    border: 1.5px solid #21B2C7;
    border-radius: 6px;
    box-shadow: 1.5px 1.5px 0 #000000;
  }

  .button-1:hover {
    background-color: #136873;
    border-color: #062a30;
    transform: translate(-2px, -2px) rotate(0.5deg);
    box-shadow:
      4px 4px 0 #000000,
      6px 6px 8px rgba(33, 178, 199, 0.25);
  }

  .button-1::before,
  .button-1::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.15),
      transparent
    );
  }

  .button-1::before {
    left: -100%;
  }

  .button-1::after {
    left: 100%;
  }

  .button-1:hover::before {
    animation: swipeRight 1.5s infinite;
  }

  .button-1:hover::after {
    animation: swipeLeft 1.5s infinite;
  }

  @keyframes swipeRight {
    100% {
      transform: translateX(200%) skew(-45deg);
    }
  }

  @keyframes swipeLeft {
    100% {
      transform: translateX(-200%) skew(-45deg);
    }
  }

  .openai-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    transition: transform 0.25s ease;
  }

  .openai-icon {
    width: 26px;
    height: 26px;
    fill: #21B2C7;
    transition: all 0.25s ease;
  }

  .openai-text {
    font-size: 10px;
    letter-spacing: 0.2px;
    color: #21B2C7;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all 0.25s ease;
  }

  .button-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    text-align: center;
    color: #bfeef4;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    z-index: 3;
    transition: all 0.25s ease;
  }

  .button-text span:first-child {
    font-size: 8px;
    font-weight: normal;
  }

  .button-text span:last-child {
    font-size: 10px;
  }

  .brutalist-button:hover .openai-logo {
    transform: translateY(-2px);
  }

  .brutalist-button:hover .openai-icon {
    width: 20px;
    height: 20px;
    animation: spin-and-zoom 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  }

  .brutalist-button:hover .button-text,
  .brutalist-button:hover .openai-text {
    opacity: 1;
    max-height: 28px;
    margin-top: 2px;
  }

  @keyframes spin-and-zoom {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.08);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }

  .brutalist-button:active .openai-icon,
  .brutalist-button:active .openai-text,
  .brutalist-button:active .button-text {
    transform: scale(0.95);
  }
`;





export default Button;
