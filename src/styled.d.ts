
import 'styled-components';


declare module 'styled-components' {
  export interface DefaultTheme {
    bgcolor: string;
    textcolor :string;
    accentcolor : string;
    tabbgcolor? : string;
    bordercolor : string;
  }
}