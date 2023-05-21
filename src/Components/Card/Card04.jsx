import Image from 'next/image'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Card04 = ({src, src2, title='', text='', stars=5}) => {
    // ! src  = just the source
    // ! src2 = source with base url

    if(!src && src2) {
        // src = BaseURL + src2;
        // TODO::
    }
    
    return ( 
        <div className="h-56 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow cp my-1">
            <div className='h-[70%] sm:h-[75%] md:h-[75%] p-2 sm:p-3 md:p-4 lg:p-5 bg-white'>
                <div className="h-full w-full relative rounded-lg overflow-hidden">
                    <Image className="h-auto" src={src} alt="Post Card Image" layout="fill" objectFit="cover"/>
                </div>
            </div>
            <div className="h-full bg-white px-2 sm:px-3 md:px-4 lg:px-5 py-4 pt-0">
                <div className='text-md sm:text-lg font-semibold mb-0 md:mb-1 lg:mb-2'>{title}</div>
                <div className='flex justify-between items-center'>
                    <span className='text-sm sm:text-md font-semibold text-[#4E4376]'>{text}</span>
                    <div className='flex items-center'>
                        <AiFillStar className='text-xl text-yellow-400 mr-1'/>
                        <span className='font-bold'>{stars}</span>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Card04;