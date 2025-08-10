const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["logo.png","placeholder.svg","robots.txt"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DPscuxhW.js",app:"_app/immutable/entry/app.DKMklI3_.js",imports:["_app/immutable/entry/start.DPscuxhW.js","_app/immutable/chunks/CMM5F5IC.js","_app/immutable/chunks/CkHgP2aA.js","_app/immutable/chunks/Btcb0jqc.js","_app/immutable/entry/app.DKMklI3_.js","_app/immutable/chunks/Btcb0jqc.js","_app/immutable/chunks/CkHgP2aA.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/AYVHNyoE.js","_app/immutable/chunks/BefBN_yz.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BtR6rinq.js')),
			__memo(() => import('./chunks/1-Ba1uMEBY.js')),
			__memo(() => import('./chunks/2-CE0JFHlp.js')),
			__memo(() => import('./chunks/3-1L2O0ksh.js')),
			__memo(() => import('./chunks/4-Bd3LQu6t.js')),
			__memo(() => import('./chunks/5-CncAejWp.js')),
			__memo(() => import('./chunks/6-B3gFt1UN.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/editor",
				pattern: /^\/editor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
