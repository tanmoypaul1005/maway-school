import Image from 'next/image'

const Card06 = ({src, src2, title='', subtitle=''}) => {
    // ! src  = just the source
    // ! src2 = source with base url

    if(!src && src2) {
        // src = BaseURL + src2;
        // TODO::
    }
    
    return ( 
        <div className='flex items-center flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 px-3 py-3 md:px-5 md:py-5 rounded-lg bg-white shadow cp transition-all ease-in'>
            <div className="bg-white h-10 w-10 md:h-12 md:w-12 relative overflow-hidden rounded-full">
                <Image className="h-auto" src={src} alt="Post Card Image" layout="fill" objectFit="cover"/>
            </div>
            <div className="text-center md:text-left">
                <div className='text-base md:text-lg font-semibold truncate'>{title}</div>
                <div className='text-xs md:text-sm truncate'>{subtitle}</div>
            </div>
        </div>
     );
}
 
export default Card06;