
import rendererConfig from './webpack.config.renderer';
import {development as mainConfig} from './webpack.config.main';

module.exports = [rendererConfig, mainConfig];
