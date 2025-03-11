import { ReactNode } from 'react';

declare module 'next-themes' {
  export interface ThemeProviderProps {
    children: ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    storageKey?: string;
    forcedTheme?: string;
    disableTransitionOnChange?: boolean;
    themes?: string[];
  }

  export interface UseThemeProps {
    themes: string[];
    forcedTheme?: string;
    setTheme: (theme: string) => void;
    theme?: string;
    resolvedTheme?: string;
    systemTheme?: 'dark' | 'light';
  }

  export function ThemeProvider(props: ThemeProviderProps): JSX.Element;
  export function useTheme(): UseThemeProps;
} 