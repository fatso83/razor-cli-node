# razor-cli-node
> Compile Razor templates

_Requires a working .NET runtime_. You can use Mono on Mac and Windows.

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
error handling. Most substantial improvements will be probably end up in
the [.NET utility](https://github.com/fatso83/razor-cli).
