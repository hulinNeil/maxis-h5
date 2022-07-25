const currentContext = require.context('./', true, /\.ts$/);
const pageContext = require.context('../pages', true, /model\.ts$/);

const currentModels = currentContext
  .keys()
  .filter(item => item !== './index.ts' && !~item.indexOf('.d.ts'))
  .map(key => currentContext(key));

const pageModels = pageContext.keys().map(key => pageContext(key));

export default [...currentModels, ...pageModels];
