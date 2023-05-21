import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Card03 = ({src, src2, title='', text='', stars = 5, color = '#F9E8EA'}) => {
    // ! src  = just the source
    // ! src2 = source with base url

    if(!src && src2) {
        // src = BaseURL + src2;
        // TODO::
    }

    return (
        <div className={`w-96 h-80 rounded-md p-7`} style={{background: color}}>
            <div className="bg-white rounded-md h-full w-full flex flex-col items-center justify-start p-5">

                <div className="bg-gray-400 h-16 w-16 relative overflow-hidden rounded-full mb-3">
                    <img className="h-full w-full object-cover" src={src} alt="Post Card img" />
                </div>

                <div className='text-lg font-semibold inline mb-3'>{title}</div>

                <div className='flex items-center'>
                    {[...Array(parseInt(stars))].map((item, index) => (
                        <AiFillStar key={index} className='text-2xl text-yellow-400'/>
                    ))}
                    {[...Array(5 - parseInt(stars))].map((item, index) => (
                        <AiOutlineStar key={index} className='text-2xl text-yellow-400'/>
                    ))}
                </div>

                <div className='text-sm text-center'>{text.substring(0,150)}</div>
                
            </div>
        </div>
     );
}
 
export default Card03;