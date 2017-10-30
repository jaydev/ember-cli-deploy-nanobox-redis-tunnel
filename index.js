/* eslint-env node */
'use strict';

const BasePlugin = require('ember-cli-deploy-plugin');
const { spawn } = require('child_process');

module.exports = {
  name: 'ember-cli-deploy-nanobox-redis-tunnel',

  createDeployPlugin(options) {
    const DeployPlugin = BasePlugin.extend({
      name: options.name,
      defaultConfig: {port: 6379},
      requiredConfig: ['remote', 'component'],

      setup() {
        const remote = this.readConfig('remote'),
              component = this.readConfig('component'),
              port = this.readConfig('port');
        const proc = spawn('nanobox', [
          'tunnel',
          remote,
          component,
          '-p',
          port
        ]);
        this.log(`Connected to ${remote} ${component} on port ${port}`, {
          verbose: true
        });
        return {tunnel: proc};
      },

      teardown(context) {
        this.log('Closing tunnel', {verbose: true});
        context.tunnel.kill('SIGTERM');
      }
    });

    return new DeployPlugin();
  }
};
