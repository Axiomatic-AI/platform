import logoDark from '../assets/logo_with_text_horizontal.svg';
import logoLight from '../assets/logo_with_text_horizontal_light.svg';
import { useTheme } from 'next-themes';

export default function LogoWithText() {
  const { resolvedTheme } = useTheme();
  
  return (
    <a href="/" className="flex items-center mt-[-4px]">
      {resolvedTheme === 'dark' ? (
        <img src={logoDark.src} alt="Axiomatic AI" className="h-10" />
      ) : (
        <img src={logoLight.src} alt="Axiomatic AI" className="h-10" />
      )}
    </a>
  )
}