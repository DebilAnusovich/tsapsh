//=============================================================================
// Yanfly Engine Plugins - Merge Common Events
// YEP_MergeCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MergeCommonEvents = true;

var Yanfly = Yanfly || {};
Yanfly.MerCoEv = Yanfly.MerCoEv || {};
Yanfly.MerCoEv.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Merges together common events so that they can use labels
 * across the whole.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * For those using complex eventing systems utilizing Labels and Common Events,
 * you may have noticed that labels in one Common event won't jump to any
 * labels located in the parent Common Event. This plugin makes it so that
 * Common Events with the <Merge> tag in their database name will import all
 * child Common Events ran from it and merge it into the current list as if the
 * Common Events have consolidated into one. By doing such a thing, Labels
 * become connected through the parent Common Event and can interact with each
 * other instead of just of just the Common Event instance itself before.
 *
 * ============================================================================
 * Name Tags
 * ============================================================================
 *
 * <Merge>
 * - Just insert this into any Common Event's name in the database that you
 * want to merge all child Common Events into. Let's take a look at how this
 * will make things behave:
 *
 * ---------------
 * Common Event 1:
 * ---------------
 * ◆Label：Top
 * ◆Common Event： 2
 * ◆Common Event： 3
 * ◆Label：Middle
 * ◆Common Event： 4
 * ◆Jump to Label：Top
 * ◆Label：End
 *
 * ---------------
 * Common Event 2:
 * ---------------
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 1
 * ◆Jump to Label：Middle
 *
 * ---------------
 * Common Event 3:
 * ---------------
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 2
 * ◆Jump to Label：Top
 *
 * ---------------
 * Common Event 4:
 * ---------------
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 3
 * ◆Jump to Label：End
 *
 * Without <Merge> in the name, the Common Event will go through and display
 * messages Merge 1 through 3. The Jump to Label events in the child Common
 * Events are ignored because there's no Labels inside their own Common Event
 * lists. After that, the event will loop forever over and over.
 *
 * As a result of adding <Merge> to Common Event 1's name, this is what the
 * event will run like.
 *
 * ---------------
 * Common Event 1:
 * ---------------
 * ◆Label：Top
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 1
 * ◆Jump to Label：Middle
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 2
 * ◆Jump to Label：Top
 * ◆Label：Middle
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 3
 * ◆Jump to Label：End
 * ◆Jump to Label：Top
 * ◆Label：End
 * 
 * The event will display the 'Merge 1' message, jump to the 'Middle' label,
 * display the 'Merge 3', and then jump the 'End' label to close out the event.
 *
 * WARNING: When using <Merge> be wary of common events that lead back to any
 * common events that were used earlier, for this may cause an infinite loop
 * and lock out your game.
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

//=============================================================================
// Game_Interpreter
//=============================================================================

// Common Event
Yanfly.MerCoEv.Game_Interpreter_command117 =
  Game_Interpreter.prototype.command117;
Game_Interpreter.prototype.command117 = function() {
    var commonEvent = $dataCommonEvents[this._params[0]];
    if (commonEvent && commonEvent.name.match(/<Merge>/i)) {
      var eventId = this.isOnCurrentMap() ? this._eventId : 0;
      var list = [];
      var id = this._params[0];
      this.mergeCommonEventList(list, id, 0);
      this.setupChild(list, eventId);
      return true;
    }
    return Yanfly.MerCoEv.Game_Interpreter_command117.call(this);
};

Game_Interpreter.prototype.mergeCommonEventList = function(list, id, indent) {
  var commonEvent = JsonEx.makeDeepCopy($dataCommonEvents[id]);
  for (var i = 0; i < commonEvent.list.length; ++i) {
    var ev = commonEvent.list[i];
    ev.indent += indent;
    if (ev.code === 117) {
      var commonEventId = ev.parameters[0];
      this.mergeCommonEventList(list, commonEventId, ev.indent);
    } else {
      list.push(ev);
    }
  }
};

//=============================================================================
// End of File
//=============================================================================