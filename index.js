/* eslint-env node */
'use strict';

const BasePlugin = require('ember-cli-deploy-plugin');
const { spawn } = require('child_process');

module.exports = {
  name: 'ember-cli-deploy-nanobox-redis-tunnel',

  createDeployPlugin(options) {
    const DeployPlugin = BasePlugin.extend({
      name: options.name,
      runBefore: 'ember-cli-deploy-redis',
      defaultConfig: {port: 6379},
      requiredConfig: ['remote', 'component'],

      willUpload() {
        const proc = spawn('nanobox', [
          'tunnel',
          this.readConfig('remote'),
          this.readConfig('component'),
          '-p',
          this.readConfig('port')
        ]);
        return {tunnel: proc};
      },

      didUpload(context) {
        context.tunnel.kill('SIGTERM');
      }
    });

    return new DeployPlugin();
  }
};
