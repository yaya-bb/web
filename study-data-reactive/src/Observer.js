import { def } from './utils.js'
import defineReactive from './defineReactive.js';
import { arrayMethods } from './array.js';
import observe from './observe.js';
import Dep from './Dep.js';
// Observer 将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)的object
// 大写开头表示一个类
export default class Observer {
  // 构造器
  // 类需要思考如何被实例化
  constructor(value) {
    // 每个Observer的实例，成员中都有一个Dep的实例
    // 将__ob__绑在dep上
    // 当数据被修改时，就会触发dep
    this.dep = new Dep();

    // 添加__ob__属性，实际上是不可枚举属性
    /*
    * __ob__的作用可以用来标记当前value是否已经被Observer转换为响应式数据了；
    * 而且可以通过value.__ob__来访问Observer的实例
    */
    // 给实例this，一定要注意，构造函数中的this不是表示类本身，而是表示实例)，给实例添加了__ob__属性，值是这次new的实例
    // 定义一个对象属性
    def(value, '__ob__', this, false);
    console.log('构造器', value);
    // 检查是数组还是对象
    if(Array.isArray(value)) {
      // 如果是数组，要强行将这个数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods);
      // 让数组变得observe
      this.observeArray(value);
    } else {
      // 将一个正常的object转换为每个层级的属性都是响应式(可以被侦测的)的object
      this.walk(value);
    }
  };
  // 遍历，遍历value里面的每一个key,让每一个key设置为defineReactive
  // 对于对象上的属性进行遍历，将其变为响应式
  walk(value) {
    // defineReactive被Observer的walk方法调用
    for(let k in value) {
      // 把value的k属性变成reactive
      // 通过这步操作，外层变成响应式
      defineReactive(value, k);
    }
  }
  // 数组的特殊遍历
  observeArray(arr) {
    for(let i = 0; i < arr.length; i++) {
      /*
      * Observer类会附加到每一个被侦测的object上，一旦被附加，Observer会将object所有属性转换为getter/setter的形式
      */
      // 逐项进行observe
      observe(arr[i]);     
    }
  }
}