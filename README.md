# Installation
## Prerequisites
- node.js
- express (npm)
- jade (npm)
- jasmine-node (npm)

## Instructions
Sorry, no instructions yet.  I'm hoping to publish this as an npm module but I'm still learning.

# Usage
## Show some Respect

You can run this by specifying a directory containing a respect.config file on the command line.  The project is setup for dogfooding so you can run Respect against itself by using:

>	respect .

Or in Windows

> bin/respect .

Alternatively you can run Respect against any arbitrary project by specifying the path to the project as an argument.  The path you specify represents the directory holding your respect.config and feature sub directories.

>	respect myproject

The respect.config file should contain json that configures the global settings variable.  Things you may want to set are title and port.

## Setting up Specs
1. Create a directory called features
2. Create a respect.config file in that new directory
3. Create subdirectories for features
4. Create .js files in those subdirectories to test the features

# HELP!
I am just learning Node.js and could use all of the help I can get on this project. If you think this is a useful project please contact me to see how you can help.  If you are an expert in Node.js or NPM I could use some advice as to the best way to psetup the project so it can be distributed and used on any project.  If you don't know much about Node.js or NPM, don't worry, we can learn together.
