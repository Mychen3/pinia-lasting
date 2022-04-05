import typescript from 'rollup-plugin-typescript2';
export default {
        input:"src/index.ts",
        output:[
                {
                     format:"cjs",
                     file:"lib/pinia-lasting.cjs.js"
                },
                {
                     format:"esm",
                     file:"lib/pinia-lasting.esm.js"
                }
        ],
    plugins:[typescript()]
}