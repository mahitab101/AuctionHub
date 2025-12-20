'use client'
import { useParamsStore } from '@/hooks/useParsmsStore'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter();
  const pathName = usePathname();
  const reset = useParamsStore(state => state.reset)

  function handleReset() {
    if (pathName != "/") router.push("/");
    reset();
  }

  return (
    <div onClick={handleReset}>
      <Image
        src="/images/logo.svg"
        height={30} width={30}
        alt="logo"
        className='cursor-pointer'
      />
    </div>
  )
}
