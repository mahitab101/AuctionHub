'use client'
import { useParamsStore } from '@/hooks/useParsmsStore'
import Image from 'next/image'

export default function Logo() {
    const reset = useParamsStore(state=>state.reset)
  return (
           <div onClick={reset}>
               <Image 
                    src="/images/logo.svg" 
                    height={30} width={30} 
                    alt="logo" 
                    className='cursor-pointer'
               />
           </div>
  )
}
