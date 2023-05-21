
const Card01 = ({src, src2, text=''}) => {
    // ! src  = just the source
    // ! src2 = source with base url

    if(!src && src2) {
        // src = BaseURL + src2;
        // TODO::
    }
    
    return ( 
        <div className="h-60 bg-gray-300 rounded-lg overflow-hidden shadow cp">
            <div className="bg-gray-400 h-[77%] relative overflow-hidden">
                <img className="h-full w-full object-cover" src={src} alt="Post Card img" />
            </div>
            <div className="bg-white h-[23%] center">
                <div className='text-xl font-semibold inline'>
                    {text}
                </div>
            </div>
        </div>
     );
}

export default Card01;