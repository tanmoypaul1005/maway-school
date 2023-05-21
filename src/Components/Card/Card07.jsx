import Link from "next/link";
import React, { useState } from 'react'
import Image from 'next/image'
import Dropdown02 from '../Dropdown/Dropdown02';
import { DELETE, EDIT } from '../Utilities/Sources';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Card07 = ({item, src, src2, title='', text='', delete_card_modal, setDeleteCardModal, editable_item = null, setEditableItem = () => {}}) => {
    // ! src  = just the source
    // ! src2 = source with base url

    const [is_public, setIsPublic] = useState(false)

    if(!src && src2) {
        // src = BaseURL + src2;
        // TODO::
    }
    
    return ( 
        <div className="h-56 md:h-64 lg:h-64 rounded-lg md:overflow-hidden shadow my-1">
            <Link href="/my-projects/details">
                <div className='h-[70%] sm:h-[75%] md:h-[75%] p-1 sm:p-2 md:p-2 lg:p-3 bg-white cp'>
                    <div className="h-full w-full relative rounded-lg overflow-hidden">
                        <Image className="h-auto" src={src} alt="Post Card Image" layout="fill" objectFit="cover"/>
                    </div>
                </div>
            </Link>
            <div className="h-full bg-white px-2 sm:px-3 md:px-4 lg:px-5 py-4 pt-0">
                <Link href="/my-projects/details">
                    <div className='text-md sm:text-lg font-semibold mb-0 md:mb-1 lg:mb-2 truncate cp'>{title}</div>
                </Link>
                <div className='flex justify-between items-center'>
                    <span className='text-sm sm:text-md font-semibold text-[#4E4376] truncate'>{text}</span>

                    <div className="hidden md:flex items-center justify-end space-x-2">

                        {is_public ? (
                            <AiFillEye onClick={() => setIsPublic(false)} className="text-gray-500 cp"/>
                        ) : (
                            <AiFillEyeInvisible onClick={() => setIsPublic(true)} className="text-gray-500 cp"/>
                        )}

                        <div className="h-3 w-3 relative cp hover:scale-105 transition-all cp">
                            <Image onClick={() => setEditableItem(item)}className="h-auto" src={EDIT} alt="Post Card Image" layout="fill" objectFit="contain"/>
                        </div>
                        <div className="h-3 w-3 relative cp hover:scale-105 transition-all cp">
                            <Image onClick={() => setDeleteCardModal(true)} className="h-auto" src={DELETE} alt="Post Card Image" layout="fill" objectFit="contain"/>
                        </div>
                    </div>

                    <div className="block md:hidden">
                        <Dropdown02
                            width={36}
                            button={<BsThreeDotsVertical className="text-xl text-gray-800"/>}
                            body={(
                                <div className="py-1 bg-white shadow-c1 rounded-md">

                                    <div onClick={() => setIsPublic(!is_public)} className="py-2 px-5 hover:bg-gray-200 cursor-pointer flex items-center space-x-2">
                                        {is_public ? (
                                            <>
                                                <AiFillEye onClick={() => setIsPublic(false)} className="text-gray-500 cp"/>
                                                <div className="text-sm">Public</div>
                                            </>
                                        ) : (
                                            <>
                                                <AiFillEyeInvisible onClick={() => setIsPublic(true)} className="text-gray-500 cp"/>
                                                <div className="text-sm">Private</div>
                                            </>
                                        )}
                                    </div>

                                    <div onClick={() => setEditableItem(item)} className="py-2 px-5 hover:bg-gray-200 cursor-pointer flex items-center space-x-2">
                                        <div className="h-4 w-4 relative cp hover:scale-105 transition-all">
                                            <Image className="h-auto" src={EDIT} alt="Post Card Image" layout="fill" objectFit="contain"/>
                                        </div>
                                        <div className="text-sm">Edit</div>
                                    </div>

                                    <div onClick={() => setDeleteCardModal(true)} className="py-2 px-5 hover:bg-gray-200 cursor-pointer flex items-center space-x-2">
                                        <div className="h-4 w-4 relative cp hover:scale-105 transition-all">
                                            <Image className="h-auto" src={DELETE} alt="Post Card Image" layout="fill" objectFit="contain"/>
                                        </div>
                                        <div className="text-sm">Delete</div>
                                    </div>

                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Card07;