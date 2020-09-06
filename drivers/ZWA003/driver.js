'use strict';

const Homey = require('homey');

class ZWA003Driver extends Homey.Driver {

  onInit() {
    super.onInit();

    this.sceneTrigger = new Homey.FlowCardTriggerDevice('zwa003_scene').register().registerRunListener((args, state) => {
      return args.device.sceneRunListener(args, state);
    });
  }

}

module.exports = ZWA003Driver;
