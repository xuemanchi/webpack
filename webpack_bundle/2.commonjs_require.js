/**
 * commonjs方式导入
 * webpack生成的代码效果
 **/


/*
* 步骤:
* 1. 定义全局模块modules, 模块上存着每个模块的内部实现
* 2. 定义require函数, 创建一个模块初始化对象{exports: {}}, 根据传入的moduleId 在modules中找到对应的模块函数执行并传入初始化模块对象
* 3. 入口调用require函数
* */

var modules = {

};
var cache = {};
function require (moduleId) {
	var cacheModule = cache[moduleId];
	if (cacheModule !== undefined) {
		return cacheModule.exports
	}

	var module = cache[moduleId] = {
		exports : {}
	};
	modules[moduleId](module, module.exports, require);
	return module.exports;
}

// require defineProperty  给对象的每个字段定义getter属性描述器
require.d = (exports, definition) => {
	for (const key in definition) {
		if (require.o(definition, key) && !require.o(exports, key)) {
			Object.defineProperty(exports, key, {
				enumerable: true,
				get: definition[key]
			})
		}
	}
}

// require hasOwnProperty  判断是否拥有该属性
require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

// require 声明是esModule模块   声明是一个es6 module
require.r = (exports) => {
	Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	Object.defineProperty(exports, '__esModule', { value: true });
}

require.p = '';

require.u = (chunkId) => chunkId + '.main.js';

var exports = {};

// require 查找模块方式
require.f = {};

var installedChunkData = {
	'main': 0
}
require.f.jsonp = (chunkId, promises) => {
	var installedChunkedData = installedChunkData[chunkId];
	if (installedChunkedData !== 0) {
		if (installedChunkedData) {

		} else {

			// 初始化一个promise对象
			var promise = new Promise((resolve, reject) => {

				// 将resolve,reject保存到装在的chunkData里
				installedChunkedData = installedChunkData[chunkId] = [resolve, reject];
			})

			// 并将promise实例也装载进去
			// deferred
			installedChunkedData[2] = promise;
			promises.push(promise);

			var url = require.p + require.u(chunkId);

			require.l(url)
		}
	}
}

require.l = (url) => {
	var script = document.createElement('script');
	script.src = url;
	document.head.appendChild(script); // 开始通过jsonp加载
}
require.m = modules;
var chunkLoadingGlobal = self["webpackChunkwebpack_bundle"] = self["webpackChunkwebpack_bundle"] || [];
var webpackJsonpCallback = (data) => { // 定义全局chunkLoadingGlobal的push方法, 异步模块加载完时调用
	var [chunkIds, moreModules] = data;
	var chunk;
	for (const moduleId in moreModules) {
		if (require.o(moreModules, moduleId)) {
			require.m[moduleId] = moreModules[moduleId];
		}
	}
	for (var i = 0; i < chunkIds.length; i++) {
		chunk = chunkIds[i];
		if (require.o(installedChunkData, chunk) && installedChunkData[chunk]) {
			installedChunkData[chunk][0](); // 调用resolve
		}
		installedChunkData[chunk] = 0 // 完成加载
	}

}
chunkLoadingGlobal.push = webpackJsonpCallback

require.r(exports)

require.e = (chunkId) => {
	let promises = [];

	// jsonp异步加载模块
	require.f.jsonp(chunkId, promises);

	return Promise.all(promises); // 返回所有的promise
}

require.e("src_module_title_js")
	.then(require.bind(require, "./src/module/title.js"))
	.then(result => {
		console.log(result);
	});
