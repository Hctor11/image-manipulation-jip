import Jimp from "jimp";
import { useEffect, useState } from "react";

const ImageComponent = ({ imageUrl, width, height }) => {
  const [image, setImage] = useState(undefined);
  const [jimpImage, setJimpImage] = useState(undefined);
  const [transformedImage, setTransformedImage] = useState(undefined);

  // load an image
  useEffect(() => {
    const loadImage = async () => {
      //loading an image from URL
      const jimpImage = await Jimp.read(imageUrl);
      setJimpImage(jimpImage);

      // transform image to base64
      const image = await jimpImage.getBase64Async(Jimp.MIME_JPEG);
      setImage(image);
    };

    loadImage();
  }, [imageUrl]);

  // generate the transformed image
  useEffect(() => {
    if (jimpImage) {
      const transfromImage = async () => {
        const transformedImage = await jimpImage.getBase64Async(Jimp.MIME_JPEG);
        setTransformedImage(transformedImage);
      };
      transfromImage();
    }
  }, [jimpImage, height, width]);

  return image && jimpImage ? (
    <>
      <h1>Original Image</h1>
      <img className="original-image" src={image} alt="Original image" />
      <h1>Transformed Image</h1>
      <img
        className="TranaformedImage"
        src={transformedImage}
        alt="Transformed Image"
      />
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default ImageComponent;
