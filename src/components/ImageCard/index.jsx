import "./index.css";

const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      {image && <img src={image} alt="generated" />}
    </div>
  );
};

export default ImageCard;
