# generated-art

## Install

After cloning the repository, run `npm install` to install dependencies. You need to have node installed on your machine. 

## Build
Run `gulp dev` to build and start a local server.  
This command compiles the nunjucks templates, sass and lints the javascript and outputs them in the **dist folder**.
The dist folder is served on port 3000.


## Edit
The source files are found in the **src folder**. Any changes made in the dist folder will be overridden by the build. 

###### Html
We are using nunjucks to modularize the HTML. 
We use layout.nunjucks as the main template, which contains links to stylesheets and script that are globally used. 
There's a canvas partial which contains the canvas element. 


Any component that is reused on the site should be created as either a partial or a macro.  
Please refer to [this tutorial by Zell](http://zellwk.com/blog/nunjucks-with-gulp/) or the [nunjucks documentation](https://mozilla.github.io/nunjucks/).


###### Css
We're using Sass for styles. The sass files are compiled by gulp and will automatically compile on save after you run the dev command. **Main.scss** is the main file which should only really serve as a container for the other files. Please create seperate partials for your component to keep the code organised. 

###### Javascript
The js files are stored in the js folder. They are compiled and linted on save. Feel free to use ES2015 if you want to. 