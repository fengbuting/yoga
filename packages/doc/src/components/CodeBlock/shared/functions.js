import { importStatement } from './templates';

const injectImport = (imports, componentList, paths, destruct) => {
  let injectedString = imports;

  paths.forEach((path, index) => {
    const components = componentList[index].split(', ');
    const stringPosition = injectedString.indexOf(` } from '${path}'`);

    if (stringPosition > -1) {
      components.forEach(component => {
        const findComponent = new RegExp(`\\b${component}\\b`, 'gm');

        if (!injectedString.match(findComponent)) {
          injectedString = [
            injectedString.slice(0, stringPosition),
            `, ${component}`,
            injectedString.slice(stringPosition),
          ].join('');
        }
      });
    } else {
      injectedString = injectedString.concat(
        `\n${importStatement(components, path, destruct)}`,
      );
    }
  });

  return injectedString;
};

export default injectImport;
