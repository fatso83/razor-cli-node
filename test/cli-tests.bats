#!/usr/bin/env bats
# Testing command line tools
# https://blog.engineyard.com/2014/bats-test-command-line-tools
# https://github.com/sstephenson/bats

DIR=$BATS_TEST_DIRNAME
CMD="node $DIR/../index.js"
PARTIALS="$DIR/fixtures"
OUTPUT_DIR="$DIR/build.tmp"
EXPECTED="$DIR/expected-output"

setup(){
    rm -rf $OUTPUT_DIR
    install
}

teardown(){
    rm -rf $OUTPUT_DIR
}

install(){
    echo "Installing from scratch"
    rm -r "$DIR/../node_modules"
    npm install 
}

@test "Basic functionality" {
    run $CMD --partials "$PARTIALS" --output "$OUTPUT_DIR"
    diff "$EXPECTED"/partial.html  "$OUTPUT_DIR/$PARTIALS"/partial.html
}
