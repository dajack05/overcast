import {defineConfig} from 'vitest/config'

export default defineConfig({
    test:{
        include:[
            './store/*.test.ts',
            './server/src/*.test.ts',
            './middleware/*.test.ts',
        ],
        coverage:{
            provider:'istanbul'
        }
    }
});