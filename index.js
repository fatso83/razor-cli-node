"use strict";
const promisify = require("promisify-node");
const glob = promisify(require("glob"));
const fse = require("fs-extra");
const child_process = require("child_process");
const os = require("os");
const path = require("path");
const program = require("commander");
const pkg = require("./package.json");
const options = { nonull : true };

program
    .version(pkg.version)
    .option("--partials <dir>", "Directory containing partials")
    .option("--output <dir>", "Output directory (i.e. \"build/partials\")")
    .parse(process.argv);


if( !program.partials || !program.output) {
    program.help();
}


// options is optional
glob(program.partials + "**/*.cshtml", options)
    .then(files => {
        const jobs = files.map( f => buildPartial(f) );

        return Promise.all(jobs);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

/**
 * @returns {Promise}
 */
function buildPartial(partialName){
    const dir = path.dirname(partialName);
    const baseName = path.basename(partialName, ".cshtml");
    const modelFileName = path.join(dir, baseName) + ".example.json";
    const outputFile = path.join(program.output, dir, baseName) + ".html";

    return new Promise((resolve, reject) => {

        const dirLib = path.join(__dirname, "ext-lib");
        const RAZOR_PATH=`${dirLib}/Microsoft.AspNet.Razor.3.0.0/lib/net45`;
        const RAZORENG_PATH=`${dirLib}/RazorEngine.3.8.2/lib/net45`;
        const JSON_PATH=`${dirLib}/Newtonsoft.Json.8.0.3/lib/net45`;
        let env = { MONO_PATH : [RAZORENG_PATH,RAZOR_PATH,JSON_PATH].join(path.delimiter) };

        const cp = child_process.exec(`MONO_PATH=${env.MONO_PATH} mono ext-lib/razor-cli.exe ${partialName} ${modelFileName}`, env, (err, stdout, stderr) => {
            if(err) reject(err);

            fse.outputFile(outputFile, stdout, (err) => {
                if(err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}
