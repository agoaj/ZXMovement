//=============================================================================
// ZXMovement.js
//=============================================================================
/*:
 * @plugindesc Allow character movement at fixed intervals without lerping
 *
 * @author Agoaj
 *
 * @param Move Delay
 * @desc Sets the time before your character can take another step in Milliseconds.
 * Default: 100
 * @default 100
 * @help
 *
 * COMPATIBILITY
 * Replaces Game_CharacterBase.updateMove and Game_CharacterBase.isMoving
 */
 
 (function() {
    
	var parameters = PluginManager.parameters('ZXMovement');
	
	var paramMoveDelay = Number(parameters['Move Delay'] || 100)*4;
	
	Game_CharacterBase.prototype.updateMove = function() {
		if(this._realX != this._x || this._realY != this._y)
			this.movementStartedTime = SceneManager._currentTime;
		this._realX = this._x;
		this._realY = this._y;
		this.refreshBushDepth();
	}; 
	
	Game_CharacterBase.prototype.isMoving = function() {
		if(this._realX != this._x || this._realY != this._y)
			return true;
		if(typeof this.movementStartedTime === 'undefined')
			return false;
		if(this.movementStartedTime + paramMoveDelay / this._moveSpeed <= SceneManager._currentTime)
			return false;
		if(this.movementStartedTime > SceneManager._currentTime)
			return true;
		return true;
	};
	
 })();