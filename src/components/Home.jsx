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

      <div className='flex flex-col justify-center w-[100vw] items-center gap-4 mt-4 md:flex-row md:w-full'>
        <input className='p-2 pl-4 rounded-md flex flex-row justify-center bg-white text-black
          my-2 text-[1rem] w-[60%] placeholder:text-gray-500 placeholder:text-[0.9rem] focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none 
          transition-all duration-200 max-md:w-[80%]'
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />

        <button className='p-2 rounded-md bg-white text-black text-[0.9rem] w-[12%] h-10 hover:bg-gray-500 hover:text-white transition-all duration-200 cursor-pointer font-bold
        max-md:w-[30%]'
          onClick={createPaste}>
            {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <div className='relative mt-4'>
        <button 
          className='absolute -top-[20px] right-1 p-1 rounded-md  text-white text-[0.9rem]  hover:text-white transition-all duration-200 cursor-pointer font-bold '

          onClick={() => {navigator.clipboard.writeText(value)
                            toast.success("Copied To Clipboard",{
                              position:"bottom-center",
                              style: { fontSize: '15px' },
                            })  }}
        > 
            <img src="/copy-svgrepo-com.svg" alt="" 
            className='h-6 w-6 '/>
            
        </button>
        <textarea 
          className='mt-4 p-4 w-[600px] rounded-md text-[1rem] bg-white text-black
           placeholder:text-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none transition-all duration-200 max-md:w-[350px] max-md:mx-auto'
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
