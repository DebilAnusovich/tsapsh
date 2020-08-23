//=============================================================================
// Yanfly Engine Plugins - Title Command Window
// YEP_TitleCommandWindow.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_TitleCommandWindow = true;

var Yanfly = Yanfly || {};
Yanfly.Template = Yanfly.Template || {};
Yanfly.Template.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc vBETA --------------------------------------------------
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Text
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Text
 *
 * ============================================================================
 * Main Menu Manager - Positioning the Row Command
 * ============================================================================
 *
 * For those using the Main Menu Manager and would like to position the Row
 * command in a place you'd like, use the following format:
 *
 *       Name: 
 *     Symbol: 
 *       Show: 
 *    Enabled: 
 *        Ext: 
 *  Main Bind: 
 * Actor Bind: 
 *
 * Insert the above setup within a Main Menu Manager slot. Provided you copy
 * the exact settings to where you need it, it will appear there while using
 * all of the naming, enabling, disabling, hiding, and showing effects done by
 * the plugin parameters.
 *
 * Remember to turn off 'Auto Add Menu' from the plugin parameters.
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[87]Name
 *
 * Help Description:
 * Line1
 * Line2
 *
 * Symbol:
 * symbol
 *
 * Show/Hide:
 * show = true;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Text
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * Version BETA:
 * - Started Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @default
 *
 * @param Alignment
 * @parent ---General---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Default alignment of the text in the command window.
 * @default center
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_TitleCommandWindow');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Variables = String(Yanfly.Parameters['Variables']);

//=============================================================================
// DataManager
//=============================================================================



//=============================================================================
// End of File
//=============================================================================