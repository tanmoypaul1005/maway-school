import { useEffect } from 'react'
import { PageTitle } from '../../App/Utility/UtilityFunctions'

const Canondale = () => {

  useEffect(()=>{
    PageTitle("Canondale !")
  })
  return (
    <div className='flex justify-center items-center mx-auto h-screen w-20 bg-red-50'>Canondale</div>
  )
}

export default Canondale