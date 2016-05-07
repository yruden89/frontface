import superAgent from "superagent"

export default function () {

    superAgent.globalErrorHooks  = {
        areEnabled: true,
        hooks: []
    };

    addInterceptor("get");
    addInterceptor("head");
    addInterceptor("del");
    addInterceptor("delete");
    addInterceptor("patch");
    addInterceptor("post");
    addInterceptor("put");


    superAgent.addHook = function (errorHook) {
        superAgent.globalErrorHooks.hooks.push(errorHook);
    };

    superAgent.removeHook = function (hookToRemove) {
        let hooks = superAgent.globalErrorHooks.hooks;
        superAgent.globalErrorHooks.hooks = hooks.filter(function(hook){
            return hook != hookToRemove;
        });
    };

    function addInterceptor(methodName){
        let method = superAgent[methodName];
        superAgent[methodName] = function() {
            let request = method.apply(superAgent, arguments);
            request.on("response", errorHandler.bind(request));
            return request;
        }
    }

    function errorHandler(res){
        if (res.status >= 200 && res.status < 300) return;
        if (!superAgent.globalErrorHooks.areEnabled) return;


        let new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        let _this = this;
        new_err.response = res;
        new_err.status = res.status;
        superAgent.globalErrorHooks.hooks.forEach(function(hook){
            hook.call(_this, new_err, res);
        });
    }
}
