function Vue() {
    this.$data = {
        msg: ''
    };
    this.el = document.getElementById('app')
    this.virtualDom = ''
    this.observer(this.$data);
    this.render();
}


Vue.prototype.observer = function (obj) {
    let value
    let _self = this
    for (let key in obj) {
        value = obj[key]
        if (typeof value === 'object') {
            this.observer(obj[key])
        } else {
            Object.defineProperty(obj, key, {
                get: function () {
                    // 收集依赖
                    return value
                },
                set: function (newVal) {
                    value = newVal
                    _self.render()
                    return newVal
                }
            })
        }
    }
}

Vue.prototype.render = function () {
    this.virtualDom = this.$data.msg
    this.el.innerHTML = this.virtualDom
}