#!/usr/bin/env node

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
glob(program.partials + "/**/*.cshtml", options)
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
    const partialDir = path.dirname(partialName);
    const baseName = path.basename(partialName, ".cshtml");
    const modelFileName = path.join(partialDir, baseName) + ".example.json";

    // remove the first part
    const outputDir = path.join(program.output, partialDir.replace(program.partials, ""));

    const outputFile =  path.join(outputDir, baseName + ".html");

    return new Promise((resolve, reject) => {

        const dirLib = path.join(__dirname, "build");
        const env = {};

        const cp = child_process.exec(`${dirLib}/razor-cli ${partialName} ${modelFileName}`, env, (err, stdout, stderr) => {
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
