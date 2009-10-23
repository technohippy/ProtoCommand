ProtoCommand = Class.create();
ProtoCommand.all = $A();
ProtoCommand.resetAllStatus = function() {
  ProtoCommand.all.each(function(cmd) {cmd.resetStatus();});
};
ProtoCommand.keys = {
  f1:112, f2:113, f3:114, f4:115, f5:116, 
  f6:117, f7:118, f8:119, f9:120, f10:121,
  left:37, up:38,right:39, down:40, 
  enter:13, esc:27,
  a:65, b:66, c:67, d:68, e:69, f:70, g:71, 
  h:72, i:73, j:74, k:75, l:76, m:77, m:78, 
  o:79, p:80, q:81, r:82, s:83, t:84, u:85, 
  v:86, w:87, x:88, y:89, z:90
};
ProtoCommand.observe = function(command) {
  Event.observe(window, 'keydown', function(e) {
    command.put(e.keyCode)});
}
ProtoCommand.observeAll = function() {
  ProtoCommand.all.each(function(e) {
    ProtoCommand.observe(e);
  });
}
ProtoCommand.prototype = {
  initialize: function(command) {
    this.setCommand(command);
    ProtoCommand.all.push(this);
  },
  setCommand: function(command) {
    this.command = $A();
    command.split(' ').each(function(key) {
      this.command.push(ProtoCommand.keys[key]);
    }.bind(this));
    this.resetStatus();
  },
  resetStatus: function() {
    this.current = this.command.clone();
  },
  action: function() {
    alert("Please setup the `action' function.");
  },
  reset: function() {
  },
  link: function(url) {
    this.action = function(){window.location = url};
  },
  put: function(keyCode) {
    if (this.current.first() == keyCode) {
      this.current.shift();
      if (this.current.length == 0) {
        this.action();
        ProtoCommand.resetAllStatus();
      }
    }
    else {
      this.reset();
      this.resetStatus();
    }
  }
};

