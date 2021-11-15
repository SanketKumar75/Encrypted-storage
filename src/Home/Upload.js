import axios from "../axios";
import React, { useEffect, useState } from "react";
import { encImage } from "../utils/imageEnc";

function Upload() {
  const [privateKey, setprivateKey] = useState("");
  const [user, setuser] = useState({});
  const [image, setimage] = useState({});
  useEffect(() => {
    const pk = window.localStorage.getItem("privateKey");
    const u = window.localStorage.getItem("user");
    setprivateKey(pk);
    setuser(JSON.parse(u));
  }, []);
  const uploadImage = async () => {
    // console.log(image);
    try {
      const encryptImage = await encImage(image, privateKey);
      console.log(encryptImage);
      let upload = await axios.post("uploads/one_media", {
        userId: user?._id,
        mediaData: encryptImage,
      });

      upload = await upload.data;
      console.log(upload);

      if (upload?.status == 1) {
        alert(upload?.msg);
        window.location.reload();
        return;
      }

      alert(upload?.msg);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <div className=" p-0 bd-highlight btny p-0 bd-highlight border-round bg-primary ">
        <center><h5 className="mt-1 ml-4 p-2">Upload new file</h5>
        <h6 className="mt-1 ml-4">
          (file size must be less then 50kb otherwise network error arise.)
        </h6>
        <input
          type="file"
          className=" mt-3 mb-0 btn "
          accept="image/*"
          multiple={false}
          onChange={(e) => setimage(e.target.files[0])}
        ></input>

        <button onClick={uploadImage} className=" w-25 btn btn-success mx-4 my-2 mb-3">
          {" "}
          <h4 >Upload</h4> {" "}
        </button></center>
      </div>
    </div>
  );
}

export default Upload;
