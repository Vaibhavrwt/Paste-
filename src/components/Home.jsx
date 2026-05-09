import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addToPaste, updateToPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
    
    const [title , setTitle] = useState('');
    const [value , setValue] = useState('');
    const [searchParams , setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
   

    useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])
    

    function createPaste(){
      const paste = {
        title: title,
        content: value,
        _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
      }

      if(pasteId){
          //update
          dispatch(updateToPaste(paste));
      }
      else if(title && value){
          //create
          dispatch(addToPaste(paste));
      }
      else{
          toast.error("Please fill in all fields.",{
              position:"bottom-center",
              style: { fontSize: '15px' },
          });
          setTitle(title);
          setValue(value);
          return;
      }

      //after creation and updation
      
          
        setTitle('');
        setValue('');
        setSearchParams({});
      
      
    }

  return (

    <div className='flex flex-col justify-center items-center '>

      <div className='flex flex-row justify-center w-full items-center gap-4 mt-4'>
        <input className='p-2 pl-4 rounded-2xl flex flex-row justify-center bg-blue-950 text-white
          my-2 text-[1rem] w-[60%] placeholder:text-gray-500 placeholder:text-[0.9rem] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />

        <button className='p-2 rounded-2xl bg-blue-950 text-white text-[0.9rem] w-[12%] h-10 hover:bg-gray-300 hover:text-black transition-all duration-200 cursor-pointer font-bold'
          onClick={createPaste}>
            {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <div className='relative mt-4'>
        <button 
          className='absolute -top-[20px] right-1 p-1 rounded-2xl  text-white text-[0.9rem] hover:bg-white hover:text-black transition-all duration-200 cursor-pointer font-bold '

          onClick={() => {navigator.clipboard.writeText(value)
                            toast.success("Copied To Clipboard",{
                              position:"bottom-center",
                              style: { fontSize: '15px' },
                            })  }}
        > 
            <img src="../public/copy-svgrepo-com.svg" alt="" 
            className='h-6 w-6 '/>
            
        </button>
        <textarea 
          className='mt-4 p-4 w-[600px] rounded-2xl text-[1rem] bg-blue-950 text-white
           placeholder:text-gray-500 
             focus:outline-none focus:shadow-blue-300 focus:shadow-[0px_10px_40px_rgba(59,130,246,0.5)] transition-all duration-200'
          placeholder='Paste Content'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>

    </div>

    
  )
}

export default Home
