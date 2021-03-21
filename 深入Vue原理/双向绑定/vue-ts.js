/**
 * 为了更好的理解博客
 * (https://juejin.cn/post/6844903601416978439#heading-10)
 * 中所讲的Vue2.0双向绑定原理，所以自己再重新实现一下这个方法(ts)
 */
var uid = 0;
var Dep = /** @class */ (function () {
    function Dep() {
        this.id = uid++;
        this.subs = [];
    }
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    Dep.prototype.notify = function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    };
    Dep.prototype.depend = function () {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    };
    Dep.target = null;
    return Dep;
}());
var Subscriber = /** @class */ (function () {
    function Subscriber(vm, expOrFn, cb) {
        this.depIds = {};
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.val = this.get();
    }
    Subscriber.prototype.update = function () {
        this.run();
    };
    Subscriber.prototype.run = function () {
        var val = this.get();
        if (this.val !== val) {
            this.val = val;
            this.cb.call(this.vm, val);
        }
    };
    Subscriber.prototype.get = function () {
        Dep.target = this;
        console.log(this.vm);
        var val = this.vm.data[this.expOrFn];
        Dep.target = null;
        return val;
    };
    Subscriber.prototype.addDep = function (dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    };
    return Subscriber;
}());
var Observer = /** @class */ (function () {
    function Observer(value) {
        this.value = value;
        this.walk();
    }
    Observer.prototype.walk = function () {
        var _this = this;
        Object.keys(this.value).forEach(function (key) { return _this.defineReactive(_this.value, key, _this.value[key]); });
    };
    Observer.prototype.defineReactive = function (obj, key, val) {
        var dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            set: function (newValue) {
                console.log(val);
                if (val === newValue)
                    return;
                val = newValue;
                observe(newValue);
                dep.notify();
            },
            get: function () {
                console.log(val);
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            }
        });
    };
    return Observer;
}());
var observe = function (value) {
    if (!value || typeof value !== "object")
        return;
    return new Observer(value);
};
var Vue = /** @class */ (function () {
    function Vue(option) {
        var _this = this;
        this.data = option.data;
        Object.keys(this.data).forEach(function (key) { return _this.proxy(key); });
        observe(this.data);
    }
    Vue.prototype.$watch = function (expOrFn, callback) {
        new Subscriber(this, expOrFn, callback);
    };
    Vue.prototype.proxy = function (key) {
        Object.defineProperty(this, key, {
            get: function () {
                return this.data[key];
            },
            set: function (newValue) {
                this.data[key] = newValue;
            }
        });
    };
    return Vue;
}());
var demo = new Vue({
    data: { text: "" }
});
var input = document.getElementById("input");
var p = document.getElementById("p");
input.addEventListener("input", function (event) {
    demo.text = event.target.value;
});
demo.$watch("text", function (val) { return (p.innerHTML = val); });
