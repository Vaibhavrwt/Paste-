import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {PencilLine, Eye, Trash2, Copy, Calendar, Share} from 'lucide-react';
import { FormatDate } from "../utlis/formatDate";




const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [ searchTerm , setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId));
  }

  
  const handleCopy = (paste) => {
    const url = `${window.location.origin}/pastes/${paste?._id}`;
    navigator.clipboard.writeText(url)
    toast.success("URL Copied",{
      position:"top-center",
      style: { fontSize: '15px' },
    })
  };

  return (
    <div className='flex flex-col justify-center items-center '>
        <div className='flex flex-col justify-center w-[100vw] items-center gap-4 mt-4 md:flex-row md:w-full'>
          <input 
            className='p-2 pl-4 rounded-md flex flex-row justify-center bg-white text-black
            my-2 text-[1rem] w-[60%] placeholder:text-gray-500 placeholder:text-[0.9rem] focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none max-md:w-[80%]'
            type="search"
            placeholder='Search' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className='p-2 rounded-md bg-white text-black text-[0.9rem] w-[12%] h-10 hover:bg-gray-500 hover:text-white transition-all duration-200 cursor-pointer font-bold
          max-md:w-[30%]'>
            
              Search
          </button>
        </div>

        <div className='bg-white flex flex-col gap-3 mt-6 w-[600px] rounded-md max-md:w-[90vw] max-md:mx-auto'>
            <h2 className='text-black font-bold text-[1.5rem] pt-3 pl-6 max-md:text-center
            max-md:text-[1.3rem] max-md:mx-auto max-md:p-0 0 max-md:pt-2'>
              All Pastes</h2>
            <div className='w-[98%] h-[1px] bg-gray-500 mx-auto'></div>
            <div className='flex flex-col gap-10 mt-4 mb-6 mx-6 '>
            {
              filteredData.length > 0 && filteredData.map(
                (paste) => {
                  return(

                    <div className='pasteBox bg-gray-100 text-black opacity-70 p-4 flex flex-row justify-between rounded-[5px] transition-all duration-200 hover:scale-[1.02] 
                    border-[1px] border-gray-500 hover:opacity-100 max-md:flex-col max-md:gap-4' 
                      key={paste?._id}>

                      <div className='flex flex-col gap-2 w-[50%] max-md:w-[100%]'>
                          <div className='text-[1.8rem] font-bold line-clamp-1 max-md:text-[1.2rem]'>
                              {paste.title}
                          </div>
                          <div className='line-clamp-3  text-black  text-[1rem] max-md:text-[0.9rem]'>
                              {paste.content}
                          </div>
                      </div>
                      
                      <div className='max-md:flex max-md:flex-col-reverse'>

                        <div className='flex flex-row gap-4 place-content-evenly max-md:gap-4 
                        max-md:mt-3 max-md:justify-start'>
                            <button
                              className='bg-black text-white rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-blue-400 cursor-pointer border-[1px] border-gray-500'
                              >
                              <Link to={`/?pasteId=${paste?._id}`}>
                                {/* EDIT */}
                                <PencilLine
                                  className="max-md:size-4"
                                  size={15}
                                />

                              </Link>
                              
                            </button>

                            <button
                              className='bg-black text-white rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-purple-800 cursor-pointer border-[1px] border-gray-500'
                              >
                                <Link to={`/pastes/${paste?._id}`}>
                                  {/* VIEW */}
                                  <Eye
                                    className='max-md:size-4'
                                    size={15}
                                  />
                                </Link>
                            </button>

                            <button 
                              className='bg-black text-white rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-red-800 cursor-pointer border-[1px] border-gray-500'
                              onClick={() => handleDelete(paste?._id)}>
                                {/* DELETE */}
                              <Trash2
                                className='max-md:size-4'
                                size={15}
                              />
                            </button>

                            <button
                              className='bg-black text-white rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-green-500 cursor-pointer border-[1px] border-gray-500 '
                                onClick={() => {navigator.clipboard.writeText(paste?.content)
                                toast.success("Copied To Clipboard",{
                                    position:"top-center",
                                    style: { fontSize: '15px' },
                                  })  }}> 
                                {/* COPY */}
                                <Copy
                                  className='max-md:size-4'
                                  size={15}
                                />
                            </button>

                            <button
                              className='bg-black text-white rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-yellow-600 cursor-pointer border-[1px] border-gray-500'
                              onClick={() => handleCopy(paste)}>
                                {/* SHARE */}
                                <Share
                                  className='max-md:size-4'
                                  size={15}
                                />
                            </button>
                        </div>

                        <div className="gap-x-1 flex justify-start items-center text-[0.9rem] mt-4 font-bold 
                         text-black max-md:text-[0.7rem]">
                            <Calendar className="text-black max-md:size-3"
                             size={20} />
                            {FormatDate(paste?.createdAt)}
                        </div>

                      </div>

                    </div>


                  )
                }
              )
            }

            </div>
        </div>
        
    </div>
  )
}

export default Paste
