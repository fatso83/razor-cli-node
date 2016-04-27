#!/usr/bin/env node --harmony
const fse = require('fs-extra');
const path = require('path');

const RAZOR_PATH = "Microsoft.AspNet.Razor.3.0.0/lib/net45/System.Web.Razor.dll"
const RAZORENG_PATH = "RazorEngine.3.8.2/lib/net45/RazorEngine.dll"
const JSON_PATH = "Newtonsoft.Json.8.0.3/lib/net45/Newtonsoft.Json.dll"
const paths = [ RAZOR_PATH, RAZORENG_PATH, JSON_PATH].map( p => path.normalize(`${__dirname}/${p}`));
const opts = {};

paths.forEach( p => fse.copy(p, path.join(__dirname, path.basename(p)), (err) => err && console.error(err) ) )
