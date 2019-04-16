var io = require('socket.io').listen(2900);

io.sockets.on('connection', function(socket){
    socket.on('authenticate', function(data) {
        var username = data.user;
        var password = data.pass;
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'events'
        });
        con.connect(function(err){
            if(err) {
                console.log(err);
                con.end();
            }
            var query = "SELECT UserID, username, accessLevel FROM user WHERE username=" + mysql.escape(username) + " AND password=" + mysql.escape(password);
            con.query(query, function(err, result){
                if(err) {
                    console.log(err);
                    con.end();
                }
                else {
                    var returnString = '';
                    if(result.length == 0){
                        con.end();
                        console.log("Username/Password do not match!")
                        socket.emit('authenticateResponse', -1);
                    }
                    else {
                        returnString = result[0].UserID + "," + result[0].username + "," + result[0].accessLevel;
                        console.log(returnString);
                        con.end();
                        socket.emit('authenticateResponse', returnString);
                    }
                }
            });
        });
    })
})