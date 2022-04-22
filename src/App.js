import { useState, useEffect } from "react";
import "./App.css";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function App() {
  const uuid = uuidv4();
  const [imageUpload, setImageUpload] = useState([]);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuid}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [url, ...prev]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [url, ...prev]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="upload_container">
        <textarea></textarea>
        <input
          type="file"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload Image</button>
      </div>

      {imageList.map((image, index) => (
        <div className="blog_title_container" key={index}>
          <div>
            <h1>April 19th, 2022</h1>
            <p>This is what I did today</p>
            <button>Detail</button>
          </div>
          <div>
            <img
              src={image}
              alt="blog img"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
