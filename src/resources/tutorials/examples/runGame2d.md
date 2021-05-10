# 2. Create Enemies

(Step 4/5) To Learn how to add enenies into your game.

##### 4. In `game.js`, Add a `getCharacters` function in the `create` function.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fTJp0inDN2U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```javascript
// File: code/client/src/game.js
// Copy
g.getCharacters('enemy');
// End Copy
  g.getCharacters('players', player => {
    if (player.id === g.myId()) {
      g.cameraFollow(player.sprite);
    }
  });/*[*/
  g.getCharacters('enemy');/*]*/
  g.drawBackground('background', 3, 500, 2000);
```