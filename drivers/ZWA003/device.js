'use strict';

const { ZwaveDevice } = require('homey-meshdriver');

class ZWA003 extends ZwaveDevice {

  onMeshInit() {
    this._sceneTrigger = this.getDriver().sceneTrigger;

    this.registerCapability('measure_battery', 'BATTERY');

    this.registerReportListener('CENTRAL_SCENE', 'CENTRAL_SCENE_NOTIFICATION', report => {
      if (report['Properties1'] !== undefined
        && report.Properties1['Key Attributes'] !== undefined
        && report['Scene Number'] !== undefined) {
        const data = {
          button: report['Scene Number'].toString(),
          scene: report.Properties1['Key Attributes'],
        };
        this._sceneTrigger.trigger(this, null, data);
      }
    });
  }

  sceneRunListener(args, state) {
    if (!args) return Promise.reject(new Error('No arguments provided'));
    if (!state) return Promise.reject(new Error('No state provided'));

    if (args.button !== undefined
      && state.button !== undefined
      && args.scene !== undefined
      && state.scene !== undefined) {
      return (args.button === state.button && args.scene === state.scene);
    }
    return Promise.reject(new Error('Button or scene undefined in args or state'));
  }

}

module.exports = ZWA003;
