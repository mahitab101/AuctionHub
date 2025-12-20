import EmptyFilter from '@/app/components/EmptyFilter'

type SignInProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SignIn({ searchParams }: SignInProps) {
  const resolved = await searchParams
  const callbackUrl = resolved.callbackUrl as string | undefined

  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subTitle="Please click below to login"
      callbackUrl={callbackUrl}
      showLogin
    />
  )
}
