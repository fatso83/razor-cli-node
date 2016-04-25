# razor-cli-node
> Compile Razor templates

## Install
`npm install --save-dev razor-cli`

## Usage
This works on the convention that you have a directory containing
pairs of files on the form `_component.cshtml` and `_component.example.json`.
Running `razor-cli --partials Views/partials --output build/partials` will
then output a single html file (such as `_component.html`) per pair.

## Known bugs
None. Probably lots.


