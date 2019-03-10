//Database config file for connecting
const  {sql , azurePromise} = require("./sqlPool")

//library great for time manipulation and formatting
var moment = require('moment');

//Submit attendance to MSSQL
async function logAttendee(name, email, guestCount, favoriteSong, comments, res) {

    //Get current time
    timestamp = moment().format();

    try {
        //Wait for database
        let azurePool = await azurePromise
        let result = await azurePool.request()
            .input('full_name', sql.VarChar(sql.max), name)
            .input('email', sql.VarChar(sql.max), email)
            .input('guest_count', sql.Int, guestCount)
            .input('favorite_song', sql.VarChar(sql.max), favoriteSong)
            .input('comments', sql.VarChar(sql.max), comments)
            .input('timestamp', sql.DateTime2, timestamp)
            //simplely inserts values into MSSQL database
            .query('INSERT INTO attendees VALUES (@full_name, @email, @guest_count, @favorite_song, @comments, @timestamp);')      

            if (result.rowsAffected >= 1){
                //If atleast 1 row of data is successfully submitted then send success message
                res.end('{"success" : "Thanks for the Information!", "status" : 200}');
            } else{
                //If no rows are submitted then submit must have failed
                //send error message
                res.end('{"error" : "There was a problem submitting your RSVP!", "status" : 404}');
            }
            
            
    } catch (err) {
        //Failed connecting
        //Send error message
        res.end('{"error" : "There was a problem submitting your RSVP!", "status" : 404}');
    }
    
}
//Function is exported to allow main server file to use
module.exports.logAttendee = logAttendee;