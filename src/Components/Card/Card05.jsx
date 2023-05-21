import Image from 'next/image'

const Card05 = ({src, src2, title=''}) => {
    // ! src  = just the source
    // ! src2 = source with base url

    if(!src && src2) {
        // src = BaseURL + src2;
        // TODO::
    }
    
    return ( 
        <div className='w-24 sm:w-32 flex flex-col items-center justify-center px-1 py-2 md:p-3 border rounded-lg hover:border-[#73A3E7] bg-blueGray-50 hover:bg-[#D0E0F7] cp transition-all ease-in'>
            <div className="bg-gray-400 h-9 w-9 md:h-12 md:w-12 relative overflow-hidden rounded-full mb-3">
                <Image className="h-auto" src={src} alt="Post Card Image" layout="fill" objectFit="cover"/>
            </div>
            <div className='text-xs md:text-sm md:font-semibold inline truncate'>{title}</div>
        </div>
     );
}
 
export default Card05;