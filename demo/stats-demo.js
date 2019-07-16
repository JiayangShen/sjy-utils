{
    "errors" : [],
	"warnings" : [],
	"version" : "3.5.5",
	"hash" : "f1992945b03a5a808c75",
	"publicPath" : "/",
	"assetsByChunkName" :
	{
		"main" : ["js/main.746687.js", "css/main.450d64.css"],
		"vendor" : "js/vendor.1ad54c.js",
		"manifest" : "js/manifest.09cec8.js"
	},
    "entrypoints" :
	{
		"vendor" :
		{
			"chunks" : [25, 24],
			"assets" : ["js/manifest.09cec8.js", "js/vendor.1ad54c.js"]
		},
		"main" :
		{
			"chunks" : [25, 24, 23],
			"assets" : ["js/manifest.09cec8.js", "js/vendor.1ad54c.js", "js/main.746687.js", "css/main.450d64.css"]
		}
	},
    "assets" : [
        {
			"name" : "img/fork.760f08.svg",
			"size" : 691,
			"chunks" : [],
			"chunkNames" : []
		},
        {
			"name" : "js/module/0.95d1ea.js",
			"size" : 35267,
			"chunks" : [0],
			"chunkNames" : []
		},
        {
			"name" : "js/main.746687.js",
			"size" : 34123,
			"chunks" : [23],
			"chunkNames" : ["main"]
		},
		{
			"name" : "js/vendor.1ad54c.js",
			"size" : 95726,
			"chunks" : [24],
			"chunkNames" : ["vendor"]
		},
		{
			"name" : "js/manifest.09cec8.js",
			"size" : 1698,
			"chunks" : [25],
			"chunkNames" : ["manifest"]
		},
		{
			"name" : "css/main.450d64.css",
			"size" : 4417,
			"chunks" : [23],
			"chunkNames" : ["main"]
		},
		{
			"name" : "vue-ssr-client-manifest.json",
			"size" : 22027,
			"chunks" : [],
			"chunkNames" : [],
			"emitted" : true
		},
		{
			"name" : "stats.json",
			"size" : 0,
			"chunks" : [],
			"chunkNames" : []
		}
    ],
    "chunks" : [
        {
			"id" : 0,
			"rendered" : true,
			"initial" : false,
			"entry" : false,
			"extraAsync" : false,
			"size" : 70370,
			"names" : [],
			"files" : ["js/module/0.95d1ea.js"],
			"hash" : "95d1ea34ba575731f5da",
			"parents" : [23],
			"modules" : [
				{
					"id" : 151,
					"identifier" : "D:\\hualala-client-touch\\node_modules\\babel-loader\\lib\\index.js!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=script&index=0!D:\\hualala-client-touch\\src\\page\\mall\\category\\index.vue D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\template-compiler\\index.js?{\"id\":\"data-v-0e8db72c\",\"hasScoped\":false,\"preserveWhitespace\":false}!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=template&index=0!D:\\hualala-client-touch\\src\\page\\mall\\category\\index.vue D:\\hualala-client-touch\\node_modules\\vue-loader\\index.js??ref--1!D:\\hualala-client-touch\\node_modules\\eslint-loader\\index.js??ref--0!D:\\hualala-client-touch\\src\\page\\mall\\category\\index.vue",
					"name" : "./src/page/mall/category/index.vue + 2 modules",
					"index" : 256,
					"index2" : 295,
					"size" : 14334,
					"cacheable" : true,
					"built" : true,
					"optional" : false,
					"prefetched" : false,
					"chunks" : [0],
					"assets" : [],
					"failed" : false,
					"errors" : 0,
					"warnings" : 0,
					"reasons" : [
						{
							"moduleId" : 144,
							"moduleIdentifier" : "D:\\hualala-client-touch\\src\\page lazy /^\\.\\/.*\\/index$/",
							"module" : "./src/page lazy ^\\.\\/.*\\/index$",
							"moduleName" : "./src/page lazy ^\\.\\/.*\\/index$",
							"type" : "context element",
							"userRequest" : "./mall/category/index",
							"loc" : "./mall/category/index"
						}
					],
					"usedExports" : true,
					"providedExports" : ["default"],
					"optimizationBailout" : ["ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./src/page lazy ^\\.\\/.*\\/index$ (referenced with context element)"],
					"depth" : 3
				}
            ]
        },
        {
            "id" : 23,
			"rendered" : true,
			"initial" : true,
			"entry" : false,
			"extraAsync" : false,
			"size" : 78726,
			"names" : ["main"],
			"files" : ["js/main.746687.js", "css/main.450d64.css"],
			"hash" : "74668720b2b03ddaec14",
			"parents" : [24],
			"modules" : [
                {
                    "id" : 0,
					"identifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\_core.js",
					"name" : "./node_modules/core-js/library/modules/_core.js",
					"index" : 45,
					"index2" : 37,
					"size" : 122,
					"cacheable" : true,
					"built" : true,
					"optional" : false,
					"prefetched" : false,
					"chunks" : [23],
					"assets" : [],
					"issuer" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\promise.js",
					"issuerId" : 118,
					"issuerName" : "./node_modules/core-js/library/fn/promise.js",
					"failed" : false,
					"errors" : 0,
					"warnings" : 0,
                    "reasons" : [
                        {
							"moduleId" : 4,
							"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\_export.js",
							"module" : "./node_modules/core-js/library/modules/_export.js",
							"moduleName" : "./node_modules/core-js/library/modules/_export.js",
							"type" : "cjs require",
							"userRequest" : "./_core",
							"loc" : "2:11-29"
						}
                    ]
                }
            ]
        },
        {
            "id" : 24,
			"rendered" : true,
			"initial" : true,
			"entry" : false,
			"extraAsync" : false,
			"size" : 310585,
			"names" : ["vendor"],
			"files" : ["js/vendor.1ad54c.js"],
			"hash" : "1ad54c241e7aa3546aa1",
			"parents" : [25],
			"modules" : [
                {
                    "id" : 3,
					"identifier" : "D:\\hualala-client-touch\\node_modules\\axios\\lib\\utils.js",
					"name" : "./node_modules/axios/lib/utils.js",
					"index" : 4,
					"index2" : 3,
					"size" : 7558,
					"cacheable" : true,
					"built" : true,
					"optional" : false,
					"prefetched" : false,
					"chunks" : [24],
					"assets" : [],
					"issuer" : "D:\\hualala-client-touch\\node_modules\\axios\\lib\\axios.js",
					"issuerId" : 76,
					"issuerName" : "./node_modules/axios/lib/axios.js",
					"failed" : false,
					"errors" : 0,
					"warnings" : 0,
					"reasons" : [
                        {
							"moduleId" : 26,
							"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\axios\\lib\\defaults.js",
							"module" : "./node_modules/axios/lib/defaults.js",
							"moduleName" : "./node_modules/axios/lib/defaults.js",
							"type" : "cjs require",
							"userRequest" : "./utils",
							"loc" : "3:12-30"
						}
                    ]
                    "usedExports" : true,
					"providedExports" : null,
					"optimizationBailout" : ["ModuleConcatenation bailout: Module is not an ECMAScript module"],
					"depth" : 3,
					"source" : "..."
                }
            ]
        },
        {
            "id" : 25,
			"rendered" : true,
			"initial" : true,
			"entry" : true,
			"extraAsync" : false,
			"size" : 0,
			"names" : ["manifest"],
			"files" : ["js/manifest.09cec8.js"],
			"hash" : "09cec8e32f8d7cc3224e",
			"parents" : [],
			"modules" : [],
			"filteredModules" : 0,
			"origins" : []
        }
    ],
    "modules" : [
        {
			"id" : 293,
			"identifier" : "D:\\hualala-client-touch\\node_modules\\file-loader\\index.js??ref--5!D:\\hualala-client-touch\\src\\img\\mall\\search.png",
			"name" : "./src/img/mall/search.png",
			"index" : 323,
			"index2" : 315,
			"size" : 67,
			"cacheable" : true,
			"built" : true,
			"optional" : false,
			"prefetched" : false,
			"chunks" : [1],
			"assets" : ["img/search.8e502f.png"],
			"issuer" : "D:\\hualala-client-touch\\node_modules\\css-loader\\index.js?minimize!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\style-compiler\\index.js?{\"vue\":true,\"id\":\"data-v-10cab7bd\",\"scoped\":true,\"hasInlineConfig\":false}!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=styles&index=0!D:\\hualala-client-touch\\src\\page\\mall\\home\\search.vue",
			"issuerId" : 292,
			"issuerName" : "./node_modules/css-loader?minimize!./node_modules/vue-loader/lib/style-compiler?{\"vue\":true,\"id\":\"data-v-10cab7bd\",\"scoped\":true,\"hasInlineConfig\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/page/mall/home/search.vue",
			"failed" : false,
			"errors" : 0,
			"warnings" : 0,
			"reasons" : [
				{
					"moduleId" : 292,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\css-loader\\index.js?minimize!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\style-compiler\\index.js?{\"vue\":true,\"id\":\"data-v-10cab7bd\",\"scoped\":true,\"hasInlineConfig\":false}!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=styles&index=0!D:\\hualala-client-touch\\src\\page\\mall\\home\\search.vue",
					"module" : "./node_modules/css-loader?minimize!./node_modules/vue-loader/lib/style-compiler?{\"vue\":true,\"id\":\"data-v-10cab7bd\",\"scoped\":true,\"hasInlineConfig\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/page/mall/home/search.vue",
					"moduleName" : "./node_modules/css-loader?minimize!./node_modules/vue-loader/lib/style-compiler?{\"vue\":true,\"id\":\"data-v-10cab7bd\",\"scoped\":true,\"hasInlineConfig\":false}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/page/mall/home/search.vue",
					"type" : "cjs require",
					"userRequest" : "../../../img/mall/search.png",
					"loc" : "6:442-481"
				}
			],
			"usedExports" : true,
			"providedExports" : null,
			"optimizationBailout" : ["ModuleConcatenation bailout: Module is not an ECMAScript module"],
			"depth" : 8,
			"source" : "module.exports = __webpack_public_path__ + \"img/search.8e502f.png\";"
		},
        {
			"id" : 294,
			"identifier" : "D:\\hualala-client-touch\\node_modules\\to-string-loader\\src\\to-string.js!D:\\hualala-client-touch\\node_modules\\css-loader\\index.js!D:\\hualala-client-touch\\node_modules\\postcss-loader\\index.js!D:\\hualala-client-touch\\src\\page\\mall\\home\\style.css",
			"name" : "./src/page/mall/home/style.css",
			"index" : 326,
			"index2" : 322,
			"size" : 301,
			"cacheable" : true,
			"built" : true,
			"optional" : false,
			"prefetched" : false,
			"chunks" : [1],
			"assets" : [],
			"issuer" : "D:\\hualala-client-touch\\node_modules\\babel-loader\\lib\\index.js!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=script&index=0!D:\\hualala-client-touch\\src\\page\\mall\\home\\index.vue",
			"issuerId" : null,
			"issuerName" : "./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/page/mall/home/index.vue",
			"failed" : false,
			"errors" : 0,
			"warnings" : 0,
			"reasons" : [
				{
					"moduleId" : 155,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\babel-loader\\lib\\index.js!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=script&index=0!D:\\hualala-client-touch\\src\\page\\mall\\home\\search.vue D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\template-compiler\\index.js?{\"id\":\"data-v-10cab7bd\",\"hasScoped\":true,\"preserveWhitespace\":false}!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=template&index=0!D:\\hualala-client-touch\\src\\page\\mall\\home\\search.vue D:\\hualala-client-touch\\node_modules\\vue-loader\\index.js??ref--1!D:\\hualala-client-touch\\node_modules\\eslint-loader\\index.js??ref--0!D:\\hualala-client-touch\\src\\page\\mall\\home\\search.vue D:\\hualala-client-touch\\node_modules\\babel-loader\\lib\\index.js!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=script&index=0!D:\\hualala-client-touch\\src\\page\\mall\\home\\index.vue D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\template-compiler\\index.js?{\"id\":\"data-v-e0b4e966\",\"hasScoped\":false,\"preserveWhitespace\":false}!D:\\hualala-client-touch\\node_modules\\vue-loader\\lib\\selector.js?type=template&index=0!D:\\hualala-client-touch\\src\\page\\mall\\home\\index.vue D:\\hualala-client-touch\\node_modules\\vue-loader\\index.js??ref--1!D:\\hualala-client-touch\\node_modules\\eslint-loader\\index.js??ref--0!D:\\hualala-client-touch\\src\\page\\mall\\home\\index.vue",
					"module" : "./src/page/mall/home/index.vue + 5 modules",
					"moduleName" : "./src/page/mall/home/index.vue + 5 modules",
					"type" : "harmony import",
					"userRequest" : "./style.css",
					"loc" : "48:0-33"
				}
			],
			"usedExports" : ["default"],
			"providedExports" : null,
			"optimizationBailout" : ["ModuleConcatenation bailout: Module is not an ECMAScript module"],
			"depth" : 5,
			"source" : "\n        var result = require(\"!!../../../../node_modules/css-loader/index.js!../../../../node_modules/postcss-loader/index.js!./style.css\");\n\n        if (typeof result === \"string\") {\n            module.exports = result;\n        } else {\n            module.exports = result.toString();\n        }\n    "
		},
        {
			"id" : 0,
			"identifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\_core.js",
			"name" : "./node_modules/core-js/library/modules/_core.js",
			"index" : 45,
			"index2" : 37,
			"size" : 122,
			"cacheable" : true,
			"built" : true,
			"optional" : false,
			"prefetched" : false,
			"chunks" : [23],
			"assets" : [],
			"issuer" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\promise.js",
			"issuerId" : 118,
			"issuerName" : "./node_modules/core-js/library/fn/promise.js",
			"failed" : false,
			"errors" : 0,
			"warnings" : 0,
			"reasons" : [
				{
					"moduleId" : 4,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\_export.js",
					"module" : "./node_modules/core-js/library/modules/_export.js",
					"moduleName" : "./node_modules/core-js/library/modules/_export.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "2:11-29"
				},
				{
					"moduleId" : 36,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\_wks-define.js",
					"module" : "./node_modules/core-js/library/modules/_wks-define.js",
					"moduleName" : "./node_modules/core-js/library/modules/_wks-define.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "2:11-29"
				},
				{
					"moduleId" : 42,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\core.get-iterator-method.js",
					"module" : "./node_modules/core-js/library/modules/core.get-iterator-method.js",
					"moduleName" : "./node_modules/core-js/library/modules/core.get-iterator-method.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "4:17-35"
				},
				{
					"moduleId" : 108,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\symbol\\index.js",
					"module" : "./node_modules/core-js/library/fn/symbol/index.js",
					"moduleName" : "./node_modules/core-js/library/fn/symbol/index.js",
					"type" : "cjs require",
					"userRequest" : "../../modules/_core",
					"loc" : "5:17-47"
				},
				{
					"moduleId" : 118,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\promise.js",
					"module" : "./node_modules/core-js/library/fn/promise.js",
					"moduleName" : "./node_modules/core-js/library/fn/promise.js",
					"type" : "cjs require",
					"userRequest" : "../modules/_core",
					"loc" : "7:17-44"
				},
				{
					"moduleId" : 119,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\es6.promise.js",
					"module" : "./node_modules/core-js/library/modules/es6.promise.js",
					"moduleName" : "./node_modules/core-js/library/modules/es6.promise.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "225:10-28"
				},
				{
					"moduleId" : 125,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\_set-species.js",
					"module" : "./node_modules/core-js/library/modules/_set-species.js",
					"moduleName" : "./node_modules/core-js/library/modules/_set-species.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "3:11-29"
				},
				{
					"moduleId" : 126,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\es7.promise.finally.js",
					"module" : "./node_modules/core-js/library/modules/es7.promise.finally.js",
					"moduleName" : "./node_modules/core-js/library/modules/es7.promise.finally.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "4:11-29"
				},
				{
					"moduleId" : 130,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\object\\define-property.js",
					"module" : "./node_modules/core-js/library/fn/object/define-property.js",
					"moduleName" : "./node_modules/core-js/library/fn/object/define-property.js",
					"type" : "cjs require",
					"userRequest" : "../../modules/_core",
					"loc" : "2:14-44"
				},
				{
					"moduleId" : 132,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\json\\stringify.js",
					"module" : "./node_modules/core-js/library/fn/json/stringify.js",
					"moduleName" : "./node_modules/core-js/library/fn/json/stringify.js",
					"type" : "cjs require",
					"userRequest" : "../../modules/_core",
					"loc" : "1:11-41"
				},
				{
					"moduleId" : 134,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\object\\assign.js",
					"module" : "./node_modules/core-js/library/fn/object/assign.js",
					"moduleName" : "./node_modules/core-js/library/fn/object/assign.js",
					"type" : "cjs require",
					"userRequest" : "../../modules/_core",
					"loc" : "2:17-47"
				},
				{
					"moduleId" : 138,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\object\\keys.js",
					"module" : "./node_modules/core-js/library/fn/object/keys.js",
					"moduleName" : "./node_modules/core-js/library/fn/object/keys.js",
					"type" : "cjs require",
					"userRequest" : "../../modules/_core",
					"loc" : "2:17-47"
				},
				{
					"moduleId" : 140,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\_object-sap.js",
					"module" : "./node_modules/core-js/library/modules/_object-sap.js",
					"moduleName" : "./node_modules/core-js/library/modules/_object-sap.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "3:11-29"
				},
				{
					"moduleId" : 141,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\fn\\array\\from.js",
					"module" : "./node_modules/core-js/library/fn/array/from.js",
					"moduleName" : "./node_modules/core-js/library/fn/array/from.js",
					"type" : "cjs require",
					"userRequest" : "../../modules/_core",
					"loc" : "3:17-47"
				},
				{
					"moduleId" : 190,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\core.is-iterable.js",
					"module" : "./node_modules/core-js/library/modules/core.is-iterable.js",
					"moduleName" : "./node_modules/core-js/library/modules/core.is-iterable.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "4:17-35"
				},
				{
					"moduleId" : 193,
					"moduleIdentifier" : "D:\\hualala-client-touch\\node_modules\\core-js\\library\\modules\\core.get-iterator.js",
					"module" : "./node_modules/core-js/library/modules/core.get-iterator.js",
					"moduleName" : "./node_modules/core-js/library/modules/core.get-iterator.js",
					"type" : "cjs require",
					"userRequest" : "./_core",
					"loc" : "3:17-35"
				}
			],
			"usedExports" : true,
			"providedExports" : null,
			"optimizationBailout" : ["ModuleConcatenation bailout: Module is not an ECMAScript module"],
			"depth" : 4,
			"source" : "var core = module.exports = { version: '2.5.0' };\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n"
		}
    ]
}
















