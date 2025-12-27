type HeadingProps = {
    title: string;
    subTitle?: string;
    center?: boolean;
}
export default function Heading({ title, subTitle, center }: HeadingProps) {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <h3 className="font-semibold">{title}</h3>
            {subTitle && <p className="font-light mt-2 text-neutral-500">{subTitle}</p>}
        </div>
    )
}
