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
      position:"bottom-center",
      style: { fontSize: '15px' },
    })
  };

  return (
    <div >
        <div className='flex flex-row justify-center w-full items-center gap-4 mt-4'>
          <input 
            className='p-2 pl-4 rounded-2xl flex flex-row justify-center bg-blue-950 text-white
            my-2 text-[1rem] w-[60%] placeholder:text-gray-500 placeholder:text-[0.9rem] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
            type="search"
            placeholder='Search' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className='p-2 rounded-2xl bg-blue-950 text-white text-[0.9rem] w-[12%] h-10 hover:bg-gray-300 hover:text-black transition-all duration-200 cursor-pointer font-bold'>
            
              Search
          </button>
        </div>

        <div className='bg-blue-950 flex flex-col gap-3 mt-6 rounded-2xl'>
            <h2 className='text-white font-bold text-[1.5rem] pt-3 pl-6 '>All Pastes</h2>
            <div className='w-[98%] h-[1px] bg-white mx-auto'></div>
            <div className='flex flex-col gap-10 mt-4 mb-6 mx-6 '>
            {
              filteredData.length > 0 && filteredData.map(
                (paste) => {
                  return(

                    <div className='pasteBox bg-gray-800 text-white p-4 flex flex-row justify-between 
                    rounded-[5px] transition-all duration-200 hover:scale-[1.02] border-[1px] border-gray-500' 
                      key={paste?._id}>

                      <div className='flex flex-col gap-2 w-[50%]'>
                          <div className='text-[1.8rem] font-bold line-clamp-1'>
                              {paste.title}
                          </div>
                          <div className='line-clamp-3  text-white opacity-80 text-[1rem]'>
                              {paste.content}
                          </div>
                      </div>
                      
                      <div>

                        <div className='flex flex-row gap-4 place-content-evenly'>
                            <button
                              className='bg-gray-800 rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-blue-400 cursor-pointer border-[1px] border-gray-500'
                              >
                              <Link to={`/?pasteId=${paste?._id}`}>
                                {/* EDIT */}
                                <PencilLine
                                  className=""
                                  size={15}
                                />

                              </Link>
                              
                            </button>

                            <button
                              className='bg-gray-800 rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-purple-800 cursor-pointer border-[1px] border-gray-500'
                              >
                                <Link to={`/pastes/${paste?._id}`}>
                                  {/* VIEW */}
                                  <Eye
                                    className=''
                                    size={15}
                                  />
                                </Link>
                            </button>

                            <button 
                              className='bg-gray-800 rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-red-800 cursor-pointer border-[1px] border-gray-500'
                              onClick={() => handleDelete(paste?._id)}>
                                {/* DELETE */}
                              <Trash2
                                className=''
                                size={15}
                              />
                            </button>

                            <button
                              className='bg-gray-800 rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-green-500 cursor-pointer border-[1px] border-gray-500 '
                                onClick={() => {navigator.clipboard.writeText(paste?.content)
                                toast.success("Copied To Clipboard",{
                                    position:"bottom-center",
                                    style: { fontSize: '15px' },
                                  })  }}> 
                                {/* COPY */}
                                <Copy
                                  className=''
                                  size={15}
                                />
                            </button>

                            <button
                              className='bg-gray-800 rounded-[5px] text-[0.9rem] py-1 px-1 
                              hover:text-yellow-600 cursor-pointer border-[1px] border-gray-500'
                              onClick={() => handleCopy(paste)}>
                                {/* SHARE */}
                                <Share
                                  className=''
                                  size={15}
                                />
                            </button>
                        </div>

                        <div className="gap-x-1 flex justify-end items-center text-[1rem] mt-4 font-bold 
                        opacity-80 text-white">
                            <Calendar className="text-white opacity-80"
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
