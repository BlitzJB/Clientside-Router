# Clientside-Router
A Clientside router in vanilla javascript for that sweet sweet performance

useage illustrated in the files above  

- `router.js` is the main module
- `views.js` is the routing logic to be defined by the user
- `main.js` is the application of router on the DOM

Known Issues:
- Current method of detecting navigation by browser's navigation buttons is ineffecient (setInterval every 20ms)
- Router doesnt have common features like redirect
- Router doesnt support component driven development cohesively (even though it wasnt designed to be meant to)
