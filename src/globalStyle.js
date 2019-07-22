import { injectGlobal } from 'emotion';

injectGlobal`
  .container {
    padding: 16px 16px 0;
    // min-height: 100vh;
    @media(min-width: 720px) {
      padding: 16px 40px 0;
    }
    @media(min-width: 1440px) {
      padding: 16px 80px 0;
    }
  }
`