import Image from 'next/image'

export const LoadImage = ({
  src,
  alt,
  ...props
}: {
  src: string
  alt: string
  className?: string
}) => (
  <Image
    src={src}
    alt={alt}
    width={500}
    height={500}
    {...props}
  />
)
