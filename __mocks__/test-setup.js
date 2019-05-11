import '@babel/polyfill';
import {storageMock, URL_PREFIX, getUrlPrefix} from './test-utils';
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

configure({adapter: new Adapter()});
global.APP_URL = `http://app.tool:8080${getUrlPrefix()}`;
// eslint-disable-next-line no-undef
jsdom.reconfigure({
    url: `${global.APP_URL}/`
});
global.localStorage = global.localStorage || storageMock();
global.requestAnimationFrame = global.requestAnimationFrame || (() => {});

const meta = document.createElement('meta');
meta.setAttribute('data-name', 'urlPrefix');
meta.content = URL_PREFIX;
document.head.appendChild(meta);
