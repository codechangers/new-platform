# 5. Add Soccer Balls

Step (6/6) To add Soccer Balls into your game.

##### 6. In `room.js`, Add `addABall` function so it adds a ball for every two players.

```javascript
// File: code/server/rooms/room.js
// Copy
	addABall() {
	const playersPerBall = 2;
	const numOf = (t) => Object.keys(this.state[t]).length;
	if (
		numOf('players') % playersPerBall === 0 &&
		numOf('soccerBalls') < numOf('players') / playersPerBall
	) {
		g.createACharacter('soccerBalls',
			g.nextCharacterId('soccerBalls'), {
				x: GAME_WIDTH / 2,
				y: GAME_HEIGHT / 2,
			});
	}
}
// End Copy
	onLeave(client) {
		g.deleteACharacter('players', client.sessionId);
		g.deleteACharacter('goals', client.sessionId);
	}/*[*/
	
	addABall() {
		const playersPerBall = 2;
		const numOf = (t) => Object.keys(this.state[t]).length;
		if (
			numOf('players') % playersPerBall === 0 &&
			numOf('soccerBalls') < numOf('players') / playersPerBall
		) {
			g.createACharacter('soccerBalls',
				g.nextCharacterId('soccerBalls'), {
					x: GAME_WIDTH / 2,
					y: GAME_HEIGHT / 2,
				});
		}
	}/*]*/
};
```