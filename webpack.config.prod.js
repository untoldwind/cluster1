
import {production as rendererConfig} from './webpack.config.renderer';
import {production as mainConfig} from './webpack.config.main';

module.exports = [rendererConfig, mainConfig];
