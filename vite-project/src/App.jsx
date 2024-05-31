import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const fileData = new FormData();
      fileData.append("file", file);

      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        }, 
      });
      const fileUrl = "https://gateway.pinata.cloud/ipfs/"+ responseData.data.IpfsHash;
      console.log(fileUrl);
      setFileUrl(fileUrl);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>IPFS Test - Upload your file</h1>
      <form>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
        <button type="Submit" onClick={handelSubmit}>Upload</button>
      </form>
      {
        fileUrl && (
          <a href={fileUrl} target="_blank">{fileUrl}</a>
        )
      }
    </div>
  );
}

export default App
