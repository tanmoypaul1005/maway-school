import { useTranslation } from 'react-i18next';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Card02 = ({src, src2, title='', text='', stars=5}) => {
    const { t } = useTranslation();

    // ! src  = just the source
    // ! src2 = source with base url

    if(!src && src2) {
        // src = BaseURL + src2;
        // TODO::
    }

    return ( 
        <div className="h-80 rounded-lg overflow-hidden shadow cp my-1">
            <div className="h-[62%] relative overflow-hidden">
                <img className="h-full w-full object-cover" src={src} alt="Post Card img"/>
            </div>
            <div className="h-full bg-white px-5 py-4">
                <div className='text-lg font-semibold inline'>{title}</div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        {[...Array(parseInt(stars))].map((item, index) => (
                            <AiFillStar key={index} className='text-lg text-yellow-400'/>
                        ))}
                        {[...Array(5 - parseInt(stars))].map((item, index) => (
                            <AiOutlineStar key={index} className='text-lg text-yellow-400'/>
                        ))}

                        <span className='font-semibold text-gray-600'>(2.5K)</span>
                    </div>
                    <div>
                        <span className='font-semibold text-gray-600 truncate'>(2.5K {t("Total Cards")})</span>
                    </div>
                </div>
                <div className='text-sm'>{text.substring(0,70)}</div>
            </div>
        </div>
     );
}

export default Card02;