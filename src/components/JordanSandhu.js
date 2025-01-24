import React,{useRef, useState} from "react";

const JordanSandhu = () => {

  const audioRef=useRef(null);
const [isPlaying, setisPlaying] = useState(false);
const [data, setdata] = useState(null)


const handleClick=async(songId)=>{
  const response= await fetch('http://localhost:5000/songs',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({songId})
  })
  const data=await response.json();
  setdata(data);

  if(data._id===songId){
    if(audioRef.current){
      audioRef.current.src=data.file_path;
      if(!isPlaying){
audioRef.current.play(true);
setisPlaying(true);
      }
      else{
        audioRef.current.pause(false);
        setisPlaying(false);
      }
    }
  }
}

  return (
    <>
    <div>
      <p onClick={()=>{handleClick("67937e6a47bdbe218604426c")}}>Tareefan mp3 song by Jordan Sandhu in album Tareefan.</p>
      <p onClick={()=>{handleClick("67937ed747bdbe218604426e")}}>Munda Sardaran Da mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("67937eff47bdbe2186044270")}}>Chann Chann Da mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("67937f2347bdbe2186044272")}}>Pre Workout mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("67937f6e47bdbe2186044274")}}>Chobbar mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("67937f9b47bdbe2186044276")}}>Do Vaari Jatt mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("67937fcf47bdbe2186044278")}}>Teeje Week mp3 song by Jordan Sandhu in album Teeje Week.</p>
      <p onClick={()=>{handleClick("67937ffa47bdbe218604427a")}}>Mirrors mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("6793806a47bdbe218604427c")}}>
        Black Effect mp3 song by Jordan Sandhu in album Black
        Effect - Single.
      </p>
      <p onClick={()=>{handleClick("6793809447bdbe218604427e")}}>Freestyle mp3 song by Jordan Sandhu in album Fame - EP.</p>
      <p onClick={()=>{handleClick("679380b647bdbe2186044280")}}>Gasoline mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("679380e547bdbe2186044282")}}>Tu Te Sharab mp3 song by Jordan Sandhu in album Tu Te Sharab.</p>
      <p onClick={()=>{handleClick("6793812c47bdbe2186044284")}}>Jimmewari mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("679381e247bdbe2186044286")}}>Season mp3 song by Jordan Sandh.</p>
      <p onClick={()=>{handleClick("6793820b47bdbe2186044288")}}>Love Like This mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("6793823b47bdbe218604428a")}}>
        Never Hear Out mp3 song by Jordan Sandhu.
      </p>
      <p onClick={()=>{handleClick("6793826c47bdbe218604428c")}}>At a Loss mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("679382a147bdbe218604428e")}}>Rafflan De Butt mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("679382f347bdbe2186044290")}}>Everyone Asks mp3 song by Jordan Sandhu.</p>
      <p onClick={()=>{handleClick("6793832b47bdbe2186044292")}}>
        Rank 1 mp3 song by Jordan Sandhu in album Rank 1
     - Single.
      </p>
      <p onClick={()=>{handleClick("6793835547bdbe2186044294")}}>
        Shehar Vichon Geda mp3 song by Jordan Sandhu in album Shehar Vichon Geda
        - Single.
      </p>
      <p onClick={()=>{handleClick("679383de47bdbe2186044296")}}>
      Zulfaan mp3 song by Jordan Sandhu in album Zulfaan - Single.
      </p>
      <p onClick={()=>{handleClick("6793841247bdbe2186044298")}}>
        Nimm Thalle mp3 song by Jordan Sandhu in album Nimm Thalle - Single.
      </p>
    </div>
    <audio ref={audioRef}/>
    </>
  );
};

export default JordanSandhu;
