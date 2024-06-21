import React, { useEffect, useState } from 'react'
import { ImageDb } from '../config'
import { listAll,getDownloadURL ,ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'


function Img_FireBase() {
  const[img,setImg]= useState('')
  const[imageUrl,setimageUrl]=useState([])

  const handleClick=()=>{
 
  if (img !==null) {
     const imageRef = ref(ImageDb,`files/${v4()}`)
  console.log("imageRef=>",imageRef);
  uploadBytes(imageRef,img)
  .then(value=>{
    console.log(value);

    getDownloadURL(value.ref)
      .then(url=>{
        setimageUrl(data=>[...data,url])
      })
  })

  }
  }

  useEffect(()=>{
listAll(ref(ImageDb,'files'))
.then(img=>{
  console.log("after success==>",img);
  img.items.forEach(val=>
    {
      getDownloadURL(val)
      .then(url=>{
        setimageUrl(data=>[...data,url])
      })
    }
  )
})
  },[])

  return (
    <div>
       <input type="file" onChange={(e)=>setImg(e.target.files[0])} />
       <button onClick={handleClick} >Upload</button>
       <br />
     {
        imageUrl?.map(dataVal=><div>
          <img src={dataVal} height="200" width="200px" />
          <br />
          </div>)
     }
    </div>
  )
}


export default Img_FireBase
