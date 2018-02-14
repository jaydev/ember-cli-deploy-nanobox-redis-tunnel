# ember-cli-deploy-nanobox-redis-tunnel

> An ember-cli-deploy plugin to upload index.html to a Nanobox machine’s Redis store using nanobox tunnel.

This plugin uploads a file, presumably index.html, to a Redis store using a Nanobox tunnel.

More often than not this plugin will be used in conjunction with the [lightning method of deployment][1] where the ember application assets will be served from S3 and the index.html file will be served from Redis.

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][2].

## Quick Start
To get up and running quickly, do the following:

- Ensure [ember-cli-deploy-build][4] is installed and configured.

- Install this plugin

```bash
$ ember install ember-cli-deploy-nanobox-redis-tunnel
```

- Place the following configuration into `config/deploy.js`

```javascript
ENV['nanobox-redis-tunnel'] = {
  component: 'your redis component name',
  remote: 'your-app-name'
}
```

- If you are deploying an Ember application that lives in a separate directory from your server-side application, you may also need to ensure that the Ember app is connected to the Nanobox  
  
```bash  
nanobox remote add my-app-name
```

- Run the pipeline

```bash
$ ember deploy
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-nanobox-redis-tunnel
```

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][2].

### component

*Required* – The name of your Nanobox Redis component, e.g. as defined in your Nanobox boxfile.yml

### remote

*Required* – The name of your Nanobox application. Eg the “App name” found by running `nanobox remote ls`

### port

The Redis port.

*Default:* `6379`



[1]: https://github.com/ember-cli-deploy/ember-cli-deploy-lightning-pack "ember-cli-deploy-lightning-pack"
[2]: http://ember-cli-deploy.com/docs/v1.0.x/using-plugins/ "Plugin Documentation"
[4]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
