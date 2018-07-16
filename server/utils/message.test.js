var expect=require('expect');
var {generateMessage}=require('./message');

describe('generateMessage',()=>{
  it('it should display correct message object',()=>{
    var from='Raju';
    var text='some text';
    var message=generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
  });
});
