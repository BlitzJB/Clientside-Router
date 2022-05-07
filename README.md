# Clientside-Router
A Clientside router in vanilla javascript for that sweet sweet performance

### Filestructure
useage illustrated in the files above  
- `router.js` is the main module
- `views.js` is the routing logic to be defined by the user
- `main.js` is the application of router on the DOM

Remember to import `main.js` as type `module`
```js
<script src="/js/main.js" type="module"></script>
```

### Requirements
- backend to handle initial requests (tools like express prefered as it handles static file serving logic)
- JS template literal syntax highlighter like *lit-html* to make life easier

### Known Issues:
- Current method of detecting navigation by browser's navigation buttons is ineffecient (setInterval every 20ms)
- Router doesnt have common features like redirect
- Router doesnt support component driven development cohesively (even though it wasnt designed to be meant to)
