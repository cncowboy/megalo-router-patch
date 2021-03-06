import {go, back, push, replace} from './utils/methods';
import {parseRoute} from './utils/query'

let _Vue;

const routerPatch = {
    install(Vue, options) {

        if (this.installed && _Vue === Vue) return;
        this.installed = true;
        _Vue = Vue;

        let _route = {};
        let _router = {};

        Vue.mixin({
            created() {
                if (this.$parent) return;
                const {$mp} = this.$root;
                _route = parseRoute($mp);
                _router = {
                    app: this,
                    mode: 'history',
                    currentRoute: _route,
                    push: (location, complete, fail, success) => push(location, complete, fail, success, $mp.platform),
                    replace: (location, complete, fail, success) => replace(location, complete, fail, success, $mp.platform),
                    go: (delta) => go(delta, $mp.platform),
                    back: () => back($mp.platform)
                };
            }
        });

        Object.defineProperty(Vue.prototype, '$router', {
            get() {
                return _router;
            }
        });

        Object.defineProperty(Vue.prototype, '$route', {
            get() {
                return _route;
            }
        });
    }
};

export default routerPatch;
