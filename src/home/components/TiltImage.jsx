// components/TiltImage.jsx

const TiltImage = ({
  src,
  alt = "Image",
  maxHeight = "400px",
  className = "",
}) => {
  return (
    <div className="flex justify-center">
      <div
        className="transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateY = (x / rect.width - 0.5) * 20;
          const rotateX = (y / rect.height - 0.5) * -20;

          card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
          `;
        }}
      >
        <img
          src={src}
          alt={alt}
          className={`
            w-auto
            h-auto
            max-w-full
            object-contain
            rounded-2xl
            border
            p-2
            shadow-lg
            bg-base-100
            ${className}
          `}
          style={{ maxHeight }}
        />
      </div>
    </div>
  );
};

export default TiltImage;
