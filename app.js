const request = require('request');
const fs = require('fs');

const gitToken = fs.readFileSync('./git-token');


request.get('https://api.ipify.org', (err, res, body) => {
    const existingIp = fs.readFileSync('./ip').toString();

    if (existingIp !== body) {
        fs.writeFileSync('./ip', body);
    }

    require('child_process').exec('git add .', (err, stdout) => {
        console.log(stdout);

        require('child_process').exec('git commit -m "Update address"', (error, stdout) => {
            console.log(stdout);
            require('child_process').exec('git push', (er, stdout) => {
                console.log(stdout);
            });
        });
    });

});