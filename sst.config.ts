/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'sst2',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
                aws: {
                    region: "eu-central-1",
                    profile: "prompt",
                  },
			}
		};
	},
	async run() {
		await import('./functions');
	}
});
