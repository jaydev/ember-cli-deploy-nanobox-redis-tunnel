/* eslint-env node */
'use strict';

const BasePlugin = require('ember-cli-deploy-plugin');
const { spawn } = require('child_process');
const redis = require('redis');

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

        this.log(
          `Connected to component \`${component}\` on port \`${port}\` ` +
          `on remote \`${remote}\``,
          {verbose: true}
        );

        // Wait for the connection to establish before returning
        return this._waitForConnection(port, proc);
      },

      teardown(context) {
        this.log('Closing Redis tunnel', {verbose: true});
        context.tunnel.kill('SIGTERM');
      },

      _waitForConnection(port, proc) {
        return new Promise((resolve, reject) => {
          const client = redis.createClient({
            host: 'localhost',
            port: port
          });

          client.on('error', err => {
            if (err.code === 'ECONNREFUSED') {
              this.log(
                'Connection refused. Tunnel may not be ready. Retrying...',
                {verbose: true}
              );
            } else {
              reject(err.toString());
            }
          });

          client.on('ready', () => {
            this.log('Connection ready', {verbose: true});
            resolve({tunnel: proc});
          });
        });
      }
    });

    return new DeployPlugin();
  }
};
