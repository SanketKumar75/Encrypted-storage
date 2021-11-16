import CryptoJS from "crypto-js";

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      //   console.log("Called", reader);
      baseURL = reader.result;
      //   console.log(baseURL);
      resolve(baseURL);
    };
    // console.log(fileInfo);
  });
};

export const encImage = async (file, password) => {
  let imageBase64 = await getBase64(file);
  var encrypted = CryptoJS.AES.encrypt(imageBase64, password).toString();
  return encrypted;
};