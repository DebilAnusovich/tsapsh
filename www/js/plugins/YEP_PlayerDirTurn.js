//=============================================================================
// Yanfly Engine Plugins - Player Direction Turn
// YEP_PlayerDirTurn.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_PlayerDirTurn = true;

var Yanfly = Yanfly || {};
Yanfly.PDTurn = Yanfly.PDTurn || {};
Yanfly.PDTurn.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc vWIP The player can turn while standing in place by pressing a
 * direction while holding down a Don't Move button.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Is facing specific directions without walking first important in your game?
 * The need to turn to face a direction while standing in place can be done!
 * Some games utilize a slight button tap to change directions, but this may
 * prove more difficult for some players.
 *
 * This plugin will take a different approach to turning while standing in
 * place: holding down a button (this plugin will use Ctrl by default) while
 * pressing a direction will allow the player to turn and face a direction
 * without having to actually move that direction!
 *
 * If the (Ctrl) button is held down while clicking with the mouse, the player
 * character will turn towards the direction of the mouse as well.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version BETA:
 * - Started Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ButtonPressed
 * @text Don't Move Button
 * @type combo
 * @option alt
 * @option control
 * @option shift
 * @option pageup
 * @option pagedown
 * @desc If this held down while pressing a direction or clicking on
 * the screen, the player will turn instead of move.
 * @default control
 *
 */
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_PlayerDirTurn');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.PlayerTurnButton = String(Yanfly.Parameters['ButtonPressed']);

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.PDTurn.Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
  if (!this.isMoving() && this.canMove() &&
  Input.isPressed(Yanfly.Param.PlayerTurnButton)) {
    var direction = this.getInputDirection();
    if (direction > 0) {
      $gameTemp.clearDestination();
      this.setDirection(direction);
    }
  } else {
    Yanfly.PDTurn.Game_Player_moveByInput.call(this);
  }
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.PDTurn.Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
  if (Input.isPressed(Yanfly.Param.PlayerTurnButton)) {
    if (TouchInput.isTriggered() || this._touchCount > 0) {
      if (TouchInput.isPressed()) {
        if (this._touchCount === 0 || this._touchCount >= 15) {
          var x = $gameMap.canvasToMapX(TouchInput.x);
          var y = $gameMap.canvasToMapY(TouchInput.y);
          var sx = $gamePlayer.deltaXFrom(x);
          var sy = $gamePlayer.deltaYFrom(y);
          if (Math.abs(sx) > Math.abs(sy)) {
            $gamePlayer.setDirection(sx > 0 ? 4 : 6);
          } else if (sy !== 0) {
            $gamePlayer.setDirection(sy > 0 ? 8 : 2);
          }
        }
        this._touchCount++;
      } else {
        this._touchCount = 0;
      }
    }
  } else {
    Yanfly.PDTurn.Scene_Map_processMapTouch.call(this);
  }
};

//=============================================================================
// End of File
//=============================================================================