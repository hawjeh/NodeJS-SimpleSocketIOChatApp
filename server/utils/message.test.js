const expect = require('expect');

var {
  generateMessage,
  generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'andrew';
    var text = 'hello world';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'admin';
    var lat = '1.22';
    var lon = '-0.23';
    var url = `https://www.google.com/maps?q=${lat},${lon}`;
    var message = generateLocationMessage(from, lat, lon);

    expect(message.createdAt).toBeA('number');
    expect(message.url).toBe(url);
    expect(message).toInclude({
      from,
      url
    });
  })
});
