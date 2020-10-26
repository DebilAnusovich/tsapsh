//=============================================================================
// TWings Plugins
// TWings_CharList.js
//=============================================================================

/*:
 * @plugindesc v1.30 (MV) Create a list of characters window
 * @author TWings (Pierre-Alain Huille)
 *
 * @param DispTexts
 * @text Texts
 *
 * @param cmdName
 * @parent DispTexts 
 * @type text
 * @text Menu command name
 * @desc Name in the menu.
 * @default Star Tablet
 *
 * @param hiddenName
 * @parent DispTexts  
 * @type text
 * @text Default hidden names
 * @desc Default name to display for hidden characters.
 * @default ?????
 *
 * @param noHint
 * @parent DispTexts  
 * @type text
 * @text No hint
 * @desc Default text to display when no hint available.
 * @default No hint available 
 *
 * @param CharsParams
 * @text Characters 
 *
 * @param charPool
 * @parent CharsParams  
 * @type struct<CharPool>[]
 * @text Characters List
 * @desc List of relevant characters.
 *
 * @param charPoolSelectVar
 * @parent CharsParams 
 * @type variable
 * @text List select var
 * @desc Variable to use for list selection (0 to not use).
 * @default 0
 *
 * @param WinParams
 * @text Windows
 *
 * @param cmdDisplaySwitchId
 * @parent WinParams  
 * @type switch
 * @text Menu access switch
 * @desc Specified switch controls Menu access.
 * @default 1
 *
 * @param wCols
 * @parent WinParams 
 * @type number
 * @min 1
 * @max 5
 * @text Columns
 * @desc Number of columns to display
 * @default 4
 *
 * @param wWidth
 * @parent WinParams 
 * @type number
 * @min 816
 * @text Window width
 * @desc Width of the upper window.
 * @default 816
 *
 * @param wHeight
 * @parent WinParams  
 * @type number
 * @min 441
 * @text Window height
 * @desc Height of the upper window.
 * @default 441 
 *
 * @param charShadows
 * @parent WinParams  
 * @type boolean
 * @text Shadows
 * @desc Display shadows for locked characters.
 * @default true
 *
 * @help
 * Free to use with proper credit for non-commercial games.
 * Contact me for commercial games : Discord https://discord.gg/m85SkuY
 * 
 * --------------------------------------------------------------------------------
 *
 * This plugin create a new menu that displays a predefined list of characters.
 * It's inspired from the Suikoden games tablet of stars.
 * You can choose which character to include.
 * You can hide characters who are still locked
 * and display short hints to find them.
 *
 * This plugin requires to be properly parametered to work :
 *
 * - You need to define a switch to activate the Menu access.
 * - You need to define the characters list with at least the following param :
 *   + Actor id : refers to the id in the database. 
 * 
 * --------------------------------------------------------------------------------
 * 
 * Plugin Commands:
 *
 * --------------------------------------------------------------------------------
 *  
 * openCharList
 * Directly open the characters List window.
 *
 * preloadCharPics
 * Preloads the characters sprites and faces.
 * To use before openCharList if you notice some pictures missing.
 * You'll also want to add a wait command between the two commands.
 *
 * Use example : 
 *           preloadCharPics
 *           wait 15
 *           openCharList
 * 
 * --------------------------------------------------------------------------------
 *
 * Parameters:
 *
 * --------------------------------------------------------------------------------
 * 
 * - Texts :
 * Customise some of the plugin's default texts.
 *   - Menu command name :
 *   Name of the command used to access the feature in the pause menu. 
 *   - Default hidden names :
 *   Text to display for hidden characters.  
 *   - No hint :
 *   Text to display when there's no hint available.   
 *
 * - Characters :
 * Parameters used to define your characters list.
 *   - Charcters List :
 *   Core of the plugin. You won't get any result without filling it properly. 
 *     - Actor : 
 *     Actor from the database. This is a required parameter !
 *     - Hint text : 
 *     Displays this hint when the character is locked.
 *     You can use up to 4 lines. 
 *     - Found Switch : 
 *     When this switch is ON, unlock the character display.
 *     if none, the character is displayed by default.
 *     - List id : 
 *     (optional advanced feature)
 *     Works with List select var.
 *     The character will be listed only when the value is the same as 
 *     the variable (leave at 0 to not use it).
 *     - Unlocked text : 
 *     Displays when the character is unlocked.
 *	   You can use up to 4 lines. 
 *     If left empty displays profile from database.
 *	   In that case you're limited to the 2 available lines.
 *     - Show switch : 
 *     (optional advanced feature)
 *     The character will be listed only when the switch is turned ON 
 *     (leave at none to not use it).
 *
 *   - List select var :
 *   (optional advanced feature)
 *   Defines a variable used to filter the displayed list.
 *   Works with the 4th parameters in the characters list (List id).
 *   When specified, the window will display only characters with 
 *   their 4th parameter to 0 or equal to the variable value.
 *
 * - Windows :
 * Customise some of the plugin's default texts.
 *   - Menu access switch :
 *   Switch to use to enable/disable access in the pause menu.
 *   - Columns:
 *   Number of columns used to display your list.  
 *   - Window width :
 *   Width of the main upper window.
 *   - Window height :
 *   Height of the main upper window. 
 *   - Shadows :
 *   When ON, shadows will be displayed for locked characters.
 *   When OFF, nothing will be displayed except the hidden name text.
 * 
 * --------------------------------------------------------------------------------
 *
 * Versions history :
 *
 * -------------------------------------------------------------------------------- 
 *
 * - Version 1.30 :
 *      + New Show Switch parameter.
 *      + Improved some parameters naming and description.
 *
 * - Version 1.24 :
 *      + Parameters input improvement.  
 *
 * - Version 1.23 :
 *      + Enabled use of special characters like \V[]...
 *
 * - Version 1.22a :
 *      + Performance optimisation. 
 *
 * - Version 1.22 : 
 *      + Customisable columns number.
 *
 * - Version 1.21 :
 *      + Improved input for Hint and Unlocked text.
 * WARNING : Those fields (even empty ones) must be reinitalised 
 *             if you were previously using an older version !
 *      + Memory usage optimisation. 
 *      + More detailed and organised plugin description.
 *
 * - Version 1.20 : 
 *      + Hint and Unlocked text can now use up to 4 lines.
 *      + The Shadows option wasn't properly handled. 
 * 
 * - Version 1.11 : 
 *      + New plugin commands to call the window directly in events.
 * 
 * - Version 1.10 : 
 *      + Optimisation for wide windows.
 *      + Customisable hidden name text.
 *      + Customisable missing hint text.
 *      + Customisable unlocked text.  
 *      + Display of hidden characters shadows.
 * 
 * - Version 1.00 : 
 *      + Release.
 */
/*~struct~CharPool:
 * @param charId
 * @type actor
 * @text Actor
 * @default 1
 * @desc Actor to display.
 * @param charHint
 * @type note
 * @text Hint text
 * @default ""
 * @desc Hint to display before the actor is found.
 * @param charSwitch
 * @type switch
 * @default 0
 * @text Found Switch
 * @desc Switch to indicate that the actor has been found.
 * @param SelectVar
 * @type number
 * @min 0
 * @default 0
 * @text List id
 * @desc (advanced) id of the list including this actor.
 * @param charDesc
 * @type note
 * @text Unlocked text
 * @default ""
 * @desc Description text to display after the actor has been found.
 * @param showSwitch
 * @type switch
 * @default 0
 * @text Show Switch
 * @desc (advanced) the actor will be visible only when this switch is ON.
 */

var TW=TW||{};function TW_CharacterRef(t,a,i,e,r,o){this.id=t,null==a&&(a=""),this.hint=a,null==i&&(i=""),this.details=i,this.swValue=e,this.hero=r,null==o&&(o=0),this.show=o}function TW_CharacterPool(){this.charList=Array(),this.nbChars=0,this.addChar=function(t,a,i,e,r,o){this.charList[this.nbChars]=new TW_CharacterRef(t,a,i,e,r,o),this.nbChars++},this.getHeroList=function(t){for(var a=Array(),i=0;i<this.nbChars;i++){var e=this.charList[i].show;e&&!$gameSwitches.value(e)||0!=this.charList[i].hero&&this.charList[i].hero!=t||a.push(this.charList[i])}return a},this.getLength=function(t){return this.getHeroList(t).length}}TW.charlist=TW.charlist||{},TW.windows=TW.windows||{},TW.windows.TWCharList=TW.windows.TWCharList||{},TW.charlist.params=PluginManager.parameters("TWings_CharList"),TW.windows.TWCharList.cmdDisplaySwitchId=Number(TW.charlist.params.cmdDisplaySwitchId||1),TW.windows.TWCharList.cmdName=String(TW.charlist.params.cmdName||"Star Tablet"),TW.windows.TWCharList.sHiddenName=String(TW.charlist.params.hiddenName||"?????"),TW.windows.TWCharList.sNoHint=String(TW.charlist.params.noHint||"No hint available"),TW.windows.TWCharList.bShadows=JSON.parse(TW.charlist.params.charShadows||!0),TW.windows.TWCharList.wWidth=Number(TW.charlist.params.wWidth||816),TW.windows.TWCharList.wHeight=Number(TW.charlist.params.wHeight||441),TW.windows.TWCharList.wCols=Number(TW.charlist.params.wCols||4),TW.charlist.charPoolSelectVar=Number(TW.charlist.params.charPoolSelectVar||0),TW.charlist.aCharPool=JSON.parse(TW.charlist.params.charPool),TW.charlist.poolLength=TW.charlist.aCharPool.length,TW.charlist.charPool=new TW_CharacterPool;for(var i=0;i<TW.charlist.poolLength;i++){var charPoolEntry=JSON.parse(TW.charlist.aCharPool[i]),hint=JSON.parse(charPoolEntry.charHint),desc=JSON.parse(charPoolEntry.charDesc);TW.charlist.charPool.addChar(charPoolEntry.charId,hint,desc,charPoolEntry.charSwitch,charPoolEntry.SelectVar,charPoolEntry.showSwitch)}function Scene_TWCharList(){this.initialize.apply(this,arguments)}function Window_TWCharList(){this.initialize.apply(this,arguments)}function Window_TWCharDetail(){this.initialize.apply(this,arguments)}TW.charlist.params=!0,TW.charlist.aCharPool=[],TW.charlist.Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand,Game_Interpreter.prototype.pluginCommand=function(t,a){TW.charlist.Game_Interpreter_pluginCommand.call(this,t,a),"preloadCharPics"===t&&TW.preLoad(),"openCharList"===t&&SceneManager.push(Scene_TWCharList)},Window_Base.prototype.reserveFaceImages=function(){TW.preLoad()},TW.preLoad=function(){$gameActors._data.forEach(function(t){null!=t&&(ImageManager.loadFace(t.faceName()),ImageManager.loadCharacter(t.characterName()),TW.windows.TWCharList.bShadows&&ImageManager.loadShadowChar(t.characterName()))},this)},Bitmap.prototype.darken=function(){var t=this.width,a=this.height,i=this._canvas,e=this._context,r=document.createElement("canvas"),o=r.getContext("2d");r.width=t,r.height=a,o.drawImage(i,0,0,t,a,1,1,t,a),e.save(),e.fillStyle="rgba(0, 0, 0, 0.9)",e.fillRect(0,0,t,a),e.globalCompositeOperation="destination-in",e.drawImage(r,0,0,t,a,0,0,t,a),e.restore(),this._setDirty()},ImageManager.loadShadowChar=function(t,a){return this.loadBitmap("img/characters/",t,a,!1,!0)},ImageManager.loadBitmap=function(t,a,i,e,r){if(a){var o=t+encodeURIComponent(a)+".png";if(r)var s=this.loadShadowBitmap(o,1);else s=this.loadNormalBitmap(o,i||0);return s.smooth=e,s}return this.loadEmptyBitmap()},ImageManager.loadShadowBitmap=function(t,a){var i=this._generateCacheKey(t,a),e=this._imageCache.get(i);return e?e.isReady()||e.decode():((e=Bitmap.load(t)).addLoadListener(function(){e.rotateHue(a),e.darken()}),this._imageCache.add(i,e)),e},Scene_Menu.prototype.commandTWCharList=function(){SceneManager.push(Scene_TWCharList)},TW.windows.TWCharList.Scene_Menu_createCommandWindow=Scene_Menu.prototype.createCommandWindow,Scene_Menu.prototype.createCommandWindow=function(){TW.windows.TWCharList.Scene_Menu_createCommandWindow.call(this),$gameSwitches.value(TW.windows.TWCharList.cmdDisplaySwitchId)&&this._commandWindow.setHandler("TWCharList",this.commandTWCharList.bind(this))},TW.windows.TWCharList.Window_MenuCommand_addOriginalCommands=Window_MenuCommand.prototype.addOriginalCommands,Window_MenuCommand.prototype.addOriginalCommands=function(){TW.windows.TWCharList.Window_MenuCommand_addOriginalCommands.call(this),$gameSwitches.value(TW.windows.TWCharList.cmdDisplaySwitchId)&&this.addTWCharListCommand()},Window_MenuCommand.prototype.addTWCharListCommand=function(){this.needsCommand("TWCharList")&&this.addCommand(TW.windows.TWCharList.cmdName,"TWCharList",!0)},Scene_TWCharList.prototype=Object.create(Scene_MenuBase.prototype),Scene_TWCharList.prototype.constructor=Scene_TWCharList,Scene_TWCharList.prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this)},Scene_TWCharList.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),this.createListWindow(),this.createDetailWindow()},Scene_TWCharList.prototype.createListWindow=function(){this._listWindow=new Window_TWCharList,this._listWindow.setHandler("cancel",this.popScene.bind(this)),this.addWindow(this._listWindow)},Scene_TWCharList.prototype.createDetailWindow=function(){var t=this._listWindow.x,a=this._listWindow.height,i=this._listWindow.width,e=Graphics.boxHeight-a;this._detailWindow=new Window_TWCharDetail(t,a,i,e),this._listWindow.setDetailWindow(this._detailWindow),this.addWindow(this._detailWindow)},Scene_TWCharList.prototype.start=function(){Scene_MenuBase.prototype.start.call(this)},Window_TWCharList.prototype=Object.create(Window_Selectable.prototype),Window_TWCharList.prototype.constructor=Window_TWCharList,Window_TWCharList.lastTopRow=0,Window_TWCharList.lastIndex=0,Window_TWCharList.prototype.initialize=function(){var t=TW.windows.TWCharList.wWidth,a=TW.windows.TWCharList.wHeight;Window_Selectable.prototype.initialize.call(this,0,0,t,a),this.setTopRow(Window_TWCharList.lastTopRow),this.select(Window_TWCharList.lastIndex),this.refresh(),this.activate()},Window_TWCharList.prototype.maxCols=function(){return TW.windows.TWCharList.wCols},Window_TWCharList.prototype.maxItems=function(){var t=0;return TW.charlist.charPoolSelectVar>0&&(t=$gameVariables.value(TW.charlist.charPoolSelectVar)),TW.charlist.charPool.getLength(t)},Window_TWCharList.prototype.itemWidth=function(){return Math.floor((this.width-2*this.padding+this.spacing())/this.maxCols()-this.spacing())},Window_TWCharList.prototype.itemHeight=function(){return 50},Window_TWCharList.prototype.select=function(t){if(this._index=t,this._stayCount=0,this.ensureCursorVisible(),this.updateCursor(),this.callUpdateHelp(),this._detailWindow){var a=0;TW.charlist.charPoolSelectVar>0&&(a=$gameVariables.value(TW.charlist.charPoolSelectVar)),this._detailWindow.refresh(TW.charlist.charPool.getHeroList(a)[this._index])}},Window_TWCharList.prototype.refresh=function(){this.createContents(),this.drawAllItems()},Window_TWCharList.prototype.drawAllItems=function(){var t=this.topIndex(),a=0;TW.charlist.charPoolSelectVar>0&&(a=$gameVariables.value(TW.charlist.charPoolSelectVar)),TW.charlist.ActorList=TW.charlist.charPool.getHeroList(a),TW.charlist.colCount=0;for(var i=6,e=40,r=20,o=(this.width-15)/this.maxCols(),s=0;s<this.maxPageItems();s++){var h=t+s;h<this.maxItems()&&(TW.charlist.colCount=h+1,this.drawItem(TW.charlist.ActorList[h],i,e,r,o,50),TW.charlist.colCount%this.maxCols()==0?(i+=50,e=40,r=20):(e+=o,r+=o))}},Window_TWCharList.prototype.drawItem=function(t,a,i,e,r,o){var s=$gameActors.actor(t.id);0==t.swValue||$gameSwitches.value(t.swValue)?(this.drawActorName(s,i,a,r),this.drawActorCharacter(s,e,a+40)):(this.drawText(TW.windows.TWCharList.sHiddenName,i,a,r),TW.windows.TWCharList.bShadows&&this.drawActorShadow(s,e,a+40))},Window_TWCharList.prototype.drawActorShadow=function(t,a,i){this.drawShadowChar(t.characterName(),t.characterIndex(),a,i)},Window_TWCharList.prototype.drawShadowChar=function(t,a,i,e){var r=ImageManager.loadShadowChar(t),o=ImageManager.isBigCharacter(t),s=r.width/(o?3:12),h=r.height/(o?4:8),n=a,c=(n%4*3+1)*s,d=4*Math.floor(n/4)*h;this.contents.blt(r,c,d,s,h,i-s/2,e-h)},Window_TWCharList.prototype.setDetailWindow=function(t){this._detailWindow=t,this.update()},Window_TWCharDetail.prototype=Object.create(Window_Base.prototype),Window_TWCharDetail.prototype.constructor=Window_TWCharDetail,Window_TWCharDetail.prototype.initialize=function(t,a,i,e){Window_Base.prototype.initialize.call(this,t,a,i,e);var r=0;TW.charlist.charPoolSelectVar>0&&(r=$gameVariables.value(TW.charlist.charPoolSelectVar)),this.refresh(TW.charlist.charPool.getHeroList(r)[0])},Window_TWCharDetail.prototype.refresh=function(t){var a=$gameActors.actor(t.id);if(this.contents.clear(),0==t.swValue||$gameSwitches.value(t.swValue)){for(var i=this.width-200,e="",r=(e=""!=t.details?t.details.replace(/.line./g,"\n").split(/[\r\n]+/):a.profile().split(/[\r\n]+/)).length,o=0;o<r;o++)this.drawTextEx(e[o],150,this.lineHeight()*o,i);this.drawActorFace(a,0,0,142,143)}else{i=this.width-100;if(""==t.hint)this.drawText(TW.windows.TWCharList.sNoHint,40,0,i);else{var s=t.hint.replace(/.line./g,"\n").split(/[\r\n]+/);for(r=s.length,o=0;o<r;o++)this.drawTextEx(s[o],40,this.lineHeight()*o,i)}}};