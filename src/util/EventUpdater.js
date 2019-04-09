class EventUpdater{
	constructor() {
        this.latestTime = this.convertDate(new Date());
    }
    twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }
    convertDate(date){
        return date.getUTCFullYear() + "-" + this.twoDigits(1 + date.getUTCMonth()) + "-" + this.twoDigits(date.getUTCDate()) + " " + this.twoDigits(date.getUTCHours()) + ":" + this.twoDigits(date.getUTCMinutes()) + ":" + this.twoDigits(date.getUTCSeconds());
    };
    //TO DO I don;t know how asnyc/await works -Miles
    async checkForUpdates() {
        // var mysql = require('mysql');
        // var connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'root',
        //     database: 'events'
        // });
        // connection.query('SELECT a.EventID FROM action a WHERE a.TimeStamp > "' + this.latestTime +'"', await function(err, result){
        //     if(err) {
        //         console.log(err);
        //         connection.end();
        //     }
        //     else {
        //         // await result.length() > 0;
        //         console.log(result);
        //         connection.end();
        //     }
        // });
    }
}

var eu = new EventUpdater();
// setTimeout(function(){},100000);
eu.checkForUpdates();