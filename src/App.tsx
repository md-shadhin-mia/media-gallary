import { useState } from "react"
import image1 from "./assets/images/image-1.webp";
import image2 from "./assets/images/image-2.webp";
import image3 from "./assets/images/image-3.webp";
import image4 from "./assets/images/image-4.webp";
import image5 from "./assets/images/image-5.webp";
import image6 from "./assets/images/image-6.webp";
import image7 from "./assets/images/image-7.webp";
import image8 from "./assets/images/image-8.webp";
import image9 from "./assets/images/image-9.webp";
import image10 from "./assets/images/image-10.jpeg";
import image11 from "./assets/images/image-11.jpeg";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [images, setImages]=useState<Image[]>([
    {
      id:1,
      name:"anything",
      src:image1,
      order:1,
    },
    {
      id:2,
      name:"image2",
      src:image2,
      order:2
    },
    {
      id:3,
      name:"image3",
      src:image3,
      order:3
    },
    {
      id:4,
      name:"image4",
      src:image4,
      order:4
    },
    {
      id:5,
      name:"image5",
      src:image5,
      order:5
    },
    {
      id:6,
      name:"image6",
      src:image6,
      order:6
    },
    {
      id:7,
      name:"image7",
      src:image7,
      order:7
    },
    {
      id:8,
      name:"image8",
      src:image8,
      order:8
    },
    {
      id:9,
      name:"image9",
      src:image9,
      order:9
    },
    {
      id:10,
      name:"image10",
      src:image10,
      order:10
    },
    {
      id:11,
      name:"image11",
      src:image11,
      order:11
    }
  ]);
  return (
    <div className="container p-16">
      <ImageGallery images={images}  />
    </div>
    
  )
}

export default App
