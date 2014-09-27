var request = require('request'),
    _ = require('underscore'),
    spawn = require('child_process').spawn,
    fs = require('fs');

var url = 'http://spectator.na.lol.riotgames.com:8088/observer-mode/rest/featured';

request(url, function(err, response, content) {
  var data = JSON.parse(content);
  _.each(data.gameList, function(game) {
    console.log(game.gameId, game.observers.encryptionKey);
    if (!fs.existsSync('/Users/giratikanon/Documents/lol-ob/test/' + game.gameId)) {
      var cmd = '/Users/giratikanon/Documents/lol-ob/download-ob.pl',
          download = spawn(cmd, ['test', game.gameId, game.observers.encryptionKey] );
      console.log(cmd);
      download.stdout.on('data', function(data) {
        console.log(data.toString('utf8'));
      });
      download.stderr.on('data', function(data) {
        console.log(data);
      });
    } else {
      console.log("skipping", game.gameId)
    }
  });
});