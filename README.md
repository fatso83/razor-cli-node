# razor-cli-node
> Compile Razor templates

_Requires a working Mono runtime_. 
[With a little tweaking](https://github.com/fatso83/razor-cli/issues/2) 
in the underlying .NET utility it should also work
with the normal .NET runtime in Windows as well.

## Install
`npm install -g razor-cli`

## Usage
It works on the convention that you have a directory containing
pairs of files on the form `_component.cshtml` and `_component.example.json`.
Running `razor-cli --partials Views/partials --output build/partials` will
then output a single html file (such as `_component.html`) per pair.

## Help needed!
In its current form, this is little more than a proof of concept.
We have a wrapper around a [utility using .NET libraries](https://github.com/fatso83/razor-cli),
which is the the piece actually doing the work.

The basic functionality is in place, but we need better
error handling and some work to make it work on Windows
without the Mono runtime.

Most substantial improvements will be probably end up in
the [.NET utility](https://github.com/fatso83/razor-cli).
