import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;

      secondary: {
        gray_50: string;
        gray_100: string;
      };

      black: string;
      white: string;

      success: string;
      warning: string;
      danger: string;
    };
  }
}
