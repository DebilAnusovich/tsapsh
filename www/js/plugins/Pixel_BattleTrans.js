//=============================================================================
// Pixel_BattleTrans
// by Delacannon
// Date: 15/03/2015
// Youtube Demo: https://youtu.be/w4sKi43mSHI  
//=============================================================================
/*:
 * @plugindesc Creates a pixelate battle transition.
 * @author Delacannon
 */
(function() {
   var parameters = PluginManager.parameters('Pixel_BattleTrans');

   var _Scene_Map_update = Scene_Map.prototype.update;
   var _Scene_Battle_update = Scene_Battle.prototype.update;

   var display_window = false;

   Scene_Map.prototype.updateEncounterEffect = function() {
      if (this._encounterEffectDuration > 0) {
        this._encounterEffectDuration--;
        var speed = this.encounterEffectSpeed();
        var n = speed - this._encounterEffectDuration;
        var p = n / speed;
        var q = ((p - 1) * 20 * p + 5) * p + 1;
        var zoomX = $gamePlayer.screenX();
        var zoomY = $gamePlayer.screenY() - 24;
        if (n === 2) {
            $gameScreen.setZoom(zoomX, zoomY, 1);
            this.snapForBattleBackground();
            this.pixelateFilter = new PIXI.PixelateFilter();
            this.pixelateFilter.size.x = 1;
            this.pixelateFilter.size.y = 1; 
            this.children[0].filters = [this.pixelateFilter];
            this.startFlashForEncounter(speed / 2);
        }
        $gameScreen.setZoom(zoomX, zoomY, q);
        if (n === Math.floor(speed / 6)) {
            this.startFlashForEncounter(speed / 2);
        }
        if (n === Math.floor(speed / 2)) {
            BattleManager.playBattleBgm();
            this.startFadeOut(this.fadeSpeed());
            }
         }
      }
      Scene_Map.prototype.update = function() {
         _Scene_Map_update.call(this);
         if (this.pixelateFilter) {
            if (this.pixelateFilter.size.x <= 75) {
               this.pixelateFilter.size.x += 1;
               this.pixelateFilter.size.y += 1;
            }
         }
      }
      Scene_Battle.prototype.update = function() {
         if (this.pixelateFilter) {
            if (this.pixelateFilter.size.x > 1) {
               this.pixelateFilter.size.x -= 1;
               this.pixelateFilter.size.y -= 1;
            }
            if (this.pixelateFilter.size.x <= 1 && !display_window) {
               this.createMessageWindow();
               display_window = true;
            }
         }
          _Scene_Battle_update.call(this);
      }
      Scene_Battle.prototype.createAllWindows = function() {
         this.createLogWindow();
         this.createStatusWindow();
         this.createPartyCommandWindow();
         this.createActorCommandWindow();
         this.createHelpWindow();
         this.createSkillWindow();
         this.createItemWindow();
         this.createActorWindow();
         this.createEnemyWindow();
         this.createScrollTextWindow();
         this.pixelateFilter = new PIXI.PixelateFilter();
         this.pixelateFilter.size.x = 75;
         this.pixelateFilter.size.y = 75;
         this.children[0].filters = [this.pixelateFilter];
      }
})();