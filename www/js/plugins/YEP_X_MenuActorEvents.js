//=============================================================================
// Yanfly Engine Plugins - Main Menu Manager Extension - Actor Events
// YEP_X_MenuActorEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MenuActorEvents = true;

var Yanfly = Yanfly || {};
Yanfly.MMAE = Yanfly.MMAE || {};
Yanfly.MMAE.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Req YEP_MainMenuManager) Allows you to run common events
 * straight from the main menu depending on which actor the player has picked.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_MainMenuManager. Make sure this plugin is located
 * under YEP_MainMenuManager in the plugin list.
 *
 * This plugin lets you create Main Menu commands that play different common
 * events depending on which actor is selected. A variety of combinations can
 * be ran depending on which keyword and actor is picked by the player before
 * running the common event.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The notetags are only used for actors. They don't apply to classes or any
 * other database objects.
 * 
 * Actor Notetags:
 * 
 *   <Menu keyword Event: x>
 *   - Replace 'keyword' with the exact keyword used in the Main Menu Manager
 *   command ext entry setup that you want to associate with this notetag.
 *   - Replace 'x' with the exact ID of the common event you wish to run.
 *
 * ============================================================================
 * Main Menu Manager - Positioning the Actor Common Event Command
 * ============================================================================
 *
 * For those using the Main Menu Manager and would like to position the Row
 * command in a place you'd like, use the following format:
 *
 *       Name: 'Insert Command Name Here'
 *     Symbol: ActorEvent
 *       Show: true
 *    Enabled: true
 *        Ext: 'Insert Keyword Here'
 *  Main Bind: this.commandPersonal.bind(this)
 * Actor Bind: 
 *
 * Insert the above setup within a Main Menu Manager slot. Provided you copy
 * the exact settings to where you need it, it will appear there while using
 * all of the naming, enabling, disabling, hiding, and showing effects done by
 * the plugin parameters.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 */
//=============================================================================

if (Imported.YEP_MainMenuManager) {

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.MMAE.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
  var symbol = this._commandWindow.currentSymbol();
  if (symbol.match(/ActorEvent/i)) {
    this.processActorEvent();
  } else {
    Yanfly.MMAE.Scene_Menu_onPersonalOk.call(this);
  }
};

Scene_Menu.prototype.processActorEvent = function() {
    var ext = this._commandWindow.currentExt().toUpperCase();
    var actor = $gameParty.menuActor();
    var notedata = actor.actor().note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; ++i) {
        var line = notedata[i];
        if (line.match(/<Menu (.*) Event: (\d+)>/i)) {
            var checkExt = String(RegExp.$1).trim().toUpperCase();
            var commonEventId = Number(RegExp.$2);
            if (checkExt === ext && commonEventId) {
              $gameTemp.reserveCommonEvent(commonEventId);
              return this.popScene();
            }
        }
    }
    this._statusWindow.activate();
};

//=============================================================================
// End of File
//=============================================================================

} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MenuActorEvents without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

};