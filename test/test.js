/* eslint-env mocha */

const assert = require('assert');
const Timer = require('../src/Timer');
const FastSpeedtest = require('../src/Api');

describe('Timer', () => {
  describe('#constructor', () => {
    it('should return new Timer instance', () => {
      const timer = new Timer(10000, () => {
      });
      assert.ok(timer instanceof Timer);
    });

    it('should fail if no delay passing', () => {
      assert.throws(() => {
        new Timer(undefined, () => {
        });
      });
    });

    it('should fail if non numeric delay passing', () => {
      assert.throws(() => {
        new Timer('6', () => {
        });
      });
    });

    it('should fail if non function callback passing', () => {
      assert.throws(() => {
        new Timer(3000, 'test');
      });
    });
  });
});

describe('run', () => {
  it('should run speed test',   () => {
    const speedtest = new FastSpeedtest({
      token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
      verbose: false, // default: false
      timeout: 10000, // default: 5000
      https: true, // default: true
      urlCount: 5, // default: 5
      bufferSize: 8, // default: 8
      unit: FastSpeedtest.UNITS.Mbps, // default: Bps
    });
    return speedtest
      .getSpeed("http://localhost:8000/api/speedtest/list")
      .then((s) => {
        console.log(`Speed: ${s} Mbps`);
      })
      .catch((e) => {
        console.error(e.message);
      });
  });
})
