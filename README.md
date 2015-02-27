# routing-libs-study
This repository studies and compares different micro routing libraries for Single Page Application

## Introduction

This prototype contains a group of protos implementing Single Page Application routing feature using below popuplar micro routing libs respectively:
- router.js 
- page.js
- director.js   
- Crossroads.js //TODO

All protos tries to implement 1)-4) features using hashbang/hash mode

1. navigate on page (e.g.follow on links)
2. directly update urls in location bar
3. browser forward/backward
4.  default routes: handle default route for all unmatched paths.

Promising libraries which can fulfill above requirements are further studied against below features: //TODO

5. dynamic route: route with params
6. listeners: - invoke function before routing to matched path
	- e.g. security checking for certain path
	- e.g. save changes checking for all path
7. asynch routing: 
    - e.g. asynch security checking
8. multple binding:
    

## To run this prototype:
Start a local server points to index.html OR

1. Install Node.js 
2. Run "npm install" to install all dependencies
3. Run "grunt" to start a local server
4. Go to localhost:3000  

To see how native #/ behaves when no external lib is used, please select "Dont' use external libs".

# Summary of Findings

## router.js: 
link: https://github.com/tildeio/router.js

0. License : Looks like MIT
1. Depends on RSVP and router-recognizer.js
2. Buggy, little examples and documents.
3. The original router.js tries to invoke unexisting hooks and causes transition error. Tracing the commit history reveals that condition checks before invoking handler hooks was removed since commit a666c9 and it is very likely the reason that caused this bug. Thus, this prototype adds condition check back in callHook() method in router.js
4. It requires a location bar watcher to update url changes. This prototype watches for hashchange. 
Conclusion: A good lib but there seems little support for standalone usage.

## page.js: 
0. MIT License
1. Dependency free
2. It intercepts the onclick event on window, prevents the default behavior and matach state changes to route path. This method I believe is bad for hashbang mode.
3. Bug: Cannot correctly handle updating url hash. Attaching a watcher to watch for hashchange cannot not solve the problem. To use this lib requires understanding the underlaying mechanism in order to fix the problem.

## director.js
link: https://github.com/flatiron/director

0. MIT License
1. Dependency free, very small lib
