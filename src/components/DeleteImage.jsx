import React from 'react'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function DeleteImage({name}) {
    const {currentUser} = useAuth();
    const deleteImage = async ()=>{
        const deleteRef = ref(storage, `${currentUser.uid}/${name}` )
        if ( confirm("Are you sure?")){
            deleteObject(deleteRef).then((response)=>{
                console.log(response);
            })
            .catch((error)=>{
                console.log(error);
            })
        } 
        
    }
  return (
    <div className='delete' onClick={()=> deleteImage()}></div>
  )
}
