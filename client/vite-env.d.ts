{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "baseUrl": "./src",
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite/client", "vite-plugin-svgr/client", "node"]
  },
  "include": ["src", "setupTests.ts", "jest.environment.js"],
  "exclude": ["node_modules"]
}
