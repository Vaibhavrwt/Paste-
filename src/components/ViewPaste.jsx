import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  return (
    <div className='flex flex-col justify-center items-center '>

      <div className='flex flex-row justify-center w-full items-center gap-4 mt-4'>
        <input 
          className='p-2 pl-4 rounded-2xl flex flex-row justify-center bg-blue-950 text-white
          my-2 text-[1rem] w-[70%] placeholder:text-gray-500 placeholder:text-[0.9rem] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
          type="text"
          value={paste ? paste.title : ''}
          disabled
          onChange={(e) => setTitle(e.target.value)}
          />

        
      </div>

      <div className='relative mt-4'>
        <button 
          className='absolute -top-[20px] right-1 p-1 rounded-2xl  text-white text-[0.9rem] hover:bg-white hover:text-black transition-all duration-200 cursor-pointer font-bold '

          onClick={() => {navigator.clipboard.writeText(paste ? paste.content : '')
                            toast.success("Copied To Clipboard",{
                              position:"bottom-center",
                              style: { fontSize: '15px' },
                            })  }}
        > 
            <img src="../src/assets/copied-icon.png" alt="" 
            className='h-6 w-6 '/>
        </button>
        <textarea 
          className='mt-4 p-4 w-[600px] rounded-2xl text-[1rem] bg-blue-950 text-white
           placeholder:text-gray-500 
             focus:outline-none focus:shadow-blue-300 focus:shadow-[0px_10px_40px_rgba(59,130,246,0.5)] transition-all duration-200 cursor-not-allowed'
            
          value={paste ? paste.content : ''}
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>

    </div>
  )
}

export default ViewPaste
