const fs = require('fs/promises');
const path = require('path');
const selection = require('./icon/selection.json');

(async () => {

    const iconNameList = selection.icons.map((item) => `'icon-${item.properties.name}'`);

    await fs.rm(path.resolve(__dirname,'interface.ts'), {force: true, recursive: true});
    const typeFile = `export type EIconType = ${iconNameList.join(' | \n    ')}\n`;

    await fs.writeFile(path.resolve(__dirname, 'interface.ts'), typeFile);

    console.log('生成icon枚举类型成功！')


})().catch((err) => {console.error(err)})
