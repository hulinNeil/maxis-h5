## myansend-frontend

### Directory

```
├── config                   # Webpack config files & project scripts
├── dist                     # Compiled file
├── public                   # Resource files that do not participate in compilation
├── mock                     # Mock API
├── src                      # Project directory
│   ├── assets               # Static resource files
│   │   ├── styles           # Global styles
│   │   └── fonts            # Maxis font files
│   ├── index.tsx            # Entry file
│   ├── App.tsx              # Page Root
│   ├── services             # API directory
│   ├── components           # Global common components
│   ├── models               # Dva Models
│   ├── pages                # All pages
│   │   ├── Home
│   │   ├── Result
│   │   ···
│   ├── routes               # First-level routing Dynamic routing
│   │   └── index.tsx
│   └── utils
├── .babelrc                 # Babel config
├── .eslintrc.js             # Eslint config
├── tsconfig.json            # Ts config
├── package.json
└── README.md
```

### Develop

- Install dependencies: `npm install`
- use online API
  1. Run project: `npm run start`
- use mock API, it listen on 8089 port
  1. run `npm run mock`
  2. change `config/web.js`

### Deploy

- Deploy dev
  1. Install dependencies: `npm install`
  2. Build project: `npm run build:dev`
  3. Run web service: `npm run service`
- Deploy staging
  1. Install dependencies: `npm install`
  2. Build project: `npm run build:staging`
  3. Run web service: `npm run service`
- Deploy live
  1. Install dependencies: `npm install`
  2. Build project: `npm run build:live`
  3. Run web service: `npm run service`

### Other

- Edit environment variables: you should change three file: `.eslintrc.js`, `config/web.js`, `src/typings.d.ts`
- Add CSS file, support 2 way: `import './index.less'` or `import styles from './index.less'`
- Dva model file is only allowed to be created in the `src/models` and `src/pages` directories
- The request error message is already handled in `src/utils/send.ts` and can be removed if it does not meet future requirements
