import { cmsLinks } from "cms"
import { ImageLoaderProps } from "next/image"

export const loader = ({ src }: ImageLoaderProps) =>
  `${cmsLinks.hostname}${src}`
