function ProtoCommand(command) {this.initialize(command)};
ProtoCommand.all = [];
ProtoCommand.resetAllStatus = function() {
  for (var i = 0; i < ProtoCommand.all.length; i++) {
    ProtoCommand.all[i].resetStatus();
  }
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
  // ref. http://liosk.blog103.fc2.com/blog-entry-61.html
  var type = 'keydown';
  var listener = function(e){command.put(e.keyCode)};
  if (window.addEventListener) {
    window.addEventListener(type, listener, false);
  }
  else if (window.attachEvent) {
    window.attachEvent('on' + type, 
      function(){listener.call(window, window.event)});
  }
  else {
    window['on' + type] = function(e){
      listener.call(target, e || window.event)};
  }
}
ProtoCommand.observeAll = function() {
  for (var i = 0; i < ProtoCommand.all.length; i++) {
    ProtoCommand.observe(ProtoCommand.all[i]);
  }
}
ProtoCommand.prototype = {
  initialize: function(command) {
    this.setCommand(command);
    ProtoCommand.all.push(this);
  },
  setCommand: function(command) {
    this.command = [];
    var keys = command.split(' ');
    for (var i = 0; i < keys.length; i++) {
      this.command.push(ProtoCommand.keys[keys[i]]);
    }
    this.resetStatus();
  },
  resetStatus: function() {
    this.current = [];
    for (var i = 0; i < this.command.length; i++) {
      this.current.push(this.command[i]);
    }
  },
  action: function() {
    alert("Please setup your own `action' function.");
  },
  reset: function() {
  },
  link: function(url) {
    this.action = function(){window.location = url};
  },
  put: function(keyCode) {
    if (this.current[0] == keyCode) {
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

