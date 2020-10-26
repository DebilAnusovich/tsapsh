//=============================================================================
// TWings Plugins
// TWings_Armorsmith.js
//=============================================================================

/*:
 * @plugindesc v1.01 (MV 1.5+) Armors forge upgrade system.
 * @author TWings (Pierre-Alain Huille)
 *
 * @param forgeList
 * @type struct<forgeCList>[]
 * @text Actors Armors List
 * @desc List of actors and their armors.
 *
 * @param cmdName
 * @type text
 * @text Forge command name
 * @desc Name in the menu.
 * @default Forge
 *
 * @param hammerSE
 * @text Forge sound
 * 
 * @param hmrFile
 * @parent hammerSE 
 * @type file
 * @text SE file
 * @desc Sound SE file to play when an armor is forged. 
 * @dir audio/se/
 * @require 1
 * @default Hammer
 *
 * @param hmrVol
 * @parent hammerSE 
 * @type number
 * @min 1
 * @max 100 
 * @text Volume (%)
 * @desc Volume of this SE.
 * @default 50
 *
 * @param hmrPitch
 * @parent hammerSE 
 * @type number
 * @min 50
 * @max 150 
 * @text Pitch (%)
 * @desc Pitch of this SE.
 * @default 100
 *
 * @param hmrPan
 * @parent hammerSE 
 * @type number
 * @min -100
 * @max 100 
 * @text Pan
 * @desc Pan of this SE.
 * @default 0
 *
 * @help 
 * Free to use with proper credit for non-commercial games.
 * Contact me for commercial games : Discord https://discord.gg/m85SkuY
 *
 * --------------------------------------------------------------------------------
 *
 * This plugins changes the way to upgrade armors using a forge system.
 * It's inspired from my weapon forge system.
 * You can define as many armor levels as you wish.
 * You can also define blacksmith levels in your events.
 *
 * When using it, specified armors are not removable anymore for the the actor !
 * You must instead define each armors upgrades of this type in the parameters.
 * To create higher level armors for your actors, 
 * first add the desired armors in the database.
 * Don't create upgrades with lower ids than their weaker version !!
 *
 * This plugin requires to be properly parametered to work (see Parameters section).
 *
 * --------------------------------------------------------------------------------
 * 
 * Plugin Commands:
 *
 * --------------------------------------------------------------------------------
 *
 * setArmorsmithlvl type x
 * Defines the available max forge level (beware the lowest level is 0).
 * Example : 
 *           setArmorsmithlvl 2 2
 *           Allows to upgrade your type 2 equipment up to level 2.
 *
 * openArmorsmithShop type
 * Open the armorsmith window for the specified equipment type.
 * Example : 
 *           openArmorsmithShop 2
 *           Open the armorsmith window for type 2 equipments.
 *
 * getArmorsmithlvl type x
 * Put the current max forge level into the variable x.
 * Example : 
 *           getArmorsmithlvl 2 1
 *           The variable 1 value will be replaced by the current armorsmith level.
 *	         (for type 2 equipments)
 * 
 * --------------------------------------------------------------------------------
 *
 * Parameters:
 *
 * --------------------------------------------------------------------------------
 * 
 * - Actors Armors List :
 * Core of the plugin. You won't get it to work without filling it properly.
 *   - Actor :
 *   Actor from the database.
 *   - Armors :
 *   Armors from the database. 
 *   Make sure to sort the list from weakest to strongest.
 *   Make sure to select an entry for every armor's level in your game.
 *   If you need to skip a level for some reason, select "none". 
 *   - Custom cost item :
 *   Item from the database.
 *   Make sure to select as many items as the armors's levels (and same order).
 *   If you don't need a custom item cost for a particular level, select "none".
 *   If you don't need custom item cost at all, leave empty.
 *
 * - Forge sound :
 * Define the SE to play when forging an armor.
 *   - SE file :
 *   Name of the SE sound file.
 *   - Volume (%) :
 *   Volume level of the sound.
 *   - Pitch (%) :
 *   Pitch variation of the sound.
 *   - Pan :
 *   Pan adjustment of the sound. 
 * 
 * --------------------------------------------------------------------------------
 *
 * Versions history :
 *
 * -------------------------------------------------------------------------------- 
 *
 * - Version 1.01 : 
 *      + Fixed compatibility issue with my weapon forge plugin.
 *
 * - Version 1.00 : 
 *      + Release.
 */
/*~struct~forgeCList:
 * @param charId
 * @type actor
 * @text Actor
 * @default 1
 * @param ETypes
 * @type struct<forgeAList>[]
 * @text Equipment Types
 * @desc List of equipment types.
 * @default []
 */
 /*~struct~forgeAList:
 * @param ETypeId
 * @type number
 * @min 2
 * @text Equipment Type id
 * @desc id number of the equipment slot.
 * @default 2
 * @param AId
 * @type armor[]
 * @text Armors
 * @desc Be sure to sort it from weakest to strongest (select "none" to skip a level).
 * @default []
 * @param CCId
 * @type item[]
 * @text Custom cost item
 * @desc Same order as armors (select "none" to keep standard cost).
 * @default [] 
 */

var TW=TW||{};function TW_Armor(t,i,e){this.actorId=t,this.upgrades=i,this.custCost=e}function TW_Forge2(t){this.id=t,this.lvl=0,this.armors=Array(),this.nbArmors=0,this.cCost=Array(),this.addArmor=function(t,i,e){this.armors[t]=new TW_Armor(t,i,e),this.nbArmors++},this.getUpgrade=function(t,i){var e=0;if(this.armors[t].upgrades[this.lvl]>i){for(var o=0;o<=this.lvl;o++)i==this.armors[t].upgrades[o]&&(e=o+1,o=this.lvl);for(;0==this.armors[t].upgrades[e]&&e<=this.lvl;)e++;return this.armors[t].upgrades[e]}return i},this.getCost=function(t,i){for(var e=0,o=0;o<=this.lvl;o++)i==this.armors[t].upgrades[o]&&(e=this.armors[t].custCost[o],o=this.lvl);return e},this.getArmorLvl=function(t,i){for(var e=0,o=0;o<=this.lvl;o++)i==this.armors[t].upgrades[o]&&(e=o,o=this.lvl);return e},this.setForgeLvl=function(t){this.lvl=t}}TW.forge=TW.forge||{},TW.windows=TW.windows||{},TW.windows.TWForge=TW.windows.TWForge||{},TW.forge.params2=PluginManager.parameters("TWings_Armorsmith"),TW.forge.cmdName2=String(TW.forge.params2.cmdName||"Forge"),TW.forge.hammerSE2={name:String(TW.forge.params2.hmrFile||"Hammer"),volume:Number(TW.forge.params2.hmrVol||50),pitch:Number(TW.forge.params2.hmrPitch||100),pan:Number(TW.forge.params2.hmrPan||0)},TW.forge.aCList=JSON.parse(TW.forge.params2.forgeList),TW.forge.charListLength=TW.forge.aCList.length,TW.forge.f2=Array();for(var i=0;i<TW.forge.charListLength;i++)for(var actor=JSON.parse(TW.forge.aCList[i]),aTypes=JSON.parse(actor.ETypes),tLength=aTypes.length,k=0;k<tLength;k++){var aEType=JSON.parse(aTypes[k]),aArmors=JSON.parse(aEType.AId),aLength=aArmors.length,aCharA=Array(),aCCost=Array();aEType.CCId&&(aCCost=JSON.parse(aEType.CCId));for(var aCustom=Array(),j=0;j<aLength;j++){aCharA.push(Number(aArmors[j]));var iCCost=aCCost[j];iCCost?aCustom.push(iCCost):aCustom.push(0)}TW.forge.f2[aEType.ETypeId]||(TW.forge.f2[aEType.ETypeId]=new TW_Forge2(aEType.ETypeId)),TW.forge.f2[aEType.ETypeId].addArmor(actor.charId,aCharA,aCustom)}function Scene_TWForge2(){this.initialize.apply(this,arguments)}function Window_TWForge2Command(){this.initialize.apply(this,arguments)}function Window_TWForgeBuy2(){this.initialize.apply(this,arguments)}function Window_TWForge2Confirm(){this.initialize.apply(this,arguments)}function Window_TWForgeStatus2(){this.initialize.apply(this,arguments)}TW.forge.params2=!0,TW.forge.aAList=[],TW.forge.Game_Interpreter_pluginCommand2=Game_Interpreter.prototype.pluginCommand,Game_Interpreter.prototype.pluginCommand=function(t,i){TW.forge.Game_Interpreter_pluginCommand2.call(this,t,i),"setArmorsmithlvl"===t&&TW.forge.f2[Number(i[0])].setForgeLvl(Number(i[1])),"getArmorsmithlvl"===t&&$gameVariables.setValue(Number(i[1]),TW.forge.f2[Number(i[0])].lvl),"openArmorsmithShop"===t&&(TW.forge.type=Number(i[0]),SceneManager.push(Scene_TWForge2))},TW.windows.TWForge.Game_Actor_isEquipChangeOk2=Game_Actor.prototype.isEquipChangeOk,Game_Actor.prototype.isEquipChangeOk=function(t){return(!TW.forge.f2[t+1]||!TW.forge.f2[t+1].armors[this._actorId])&&TW.windows.TWForge.Game_Actor_isEquipChangeOk2.call(this,t)},Scene_TWForge2.prototype=Object.create(Scene_MenuBase.prototype),Scene_TWForge2.prototype.constructor=Scene_TWForge2,Scene_TWForge2.prototype.initialize=function(){Scene_MenuBase.prototype.initialize.call(this)},Scene_TWForge2.prototype.prepare=function(){this._goods=$gameParty._actors,this._purchaseOnly=!0,this._item=null,this._actor=null,this._type=null,this._cCost=null},Scene_TWForge2.prototype.create=function(){Scene_MenuBase.prototype.create.call(this),this.prepare(),this.createHelpWindow(),this.createGoldWindow(),this.createCommandWindow(),this.createDummyWindow(),this.createNumberWindow(),this.createStatusWindow(),this.createBuyWindow()},Scene_TWForge2.prototype.createGoldWindow=function(){this._goldWindow=new Window_Gold(0,this._helpWindow.height),this._goldWindow.x=Graphics.boxWidth-this._goldWindow.width,this.addWindow(this._goldWindow)},Scene_TWForge2.prototype.createCommandWindow=function(){this._commandWindow=new Window_TWForge2Command(this._goldWindow.x,this._purchaseOnly),this._commandWindow.y=this._helpWindow.height,this._commandWindow.setHandler("buy",this.commandBuy.bind(this)),this._commandWindow.setHandler("cancel",this.popScene.bind(this)),this.addWindow(this._commandWindow)},Scene_TWForge2.prototype.createDummyWindow=function(){var t=this._commandWindow.y+this._commandWindow.height,i=Graphics.boxHeight-t;this._dummyWindow=new Window_Base(0,t,Graphics.boxWidth,i),this.addWindow(this._dummyWindow)},Scene_TWForge2.prototype.createNumberWindow=function(){var t=this._dummyWindow.y,i=this._dummyWindow.height;this._numberWindow=new Window_TWForge2Confirm(0,t,i),this._numberWindow.hide(),this._numberWindow.setHandler("ok",this.onNumberOk.bind(this)),this._numberWindow.setHandler("cancel",this.onNumberCancel.bind(this)),this.addWindow(this._numberWindow)},Scene_TWForge2.prototype.createStatusWindow=function(){var t=this._numberWindow.width,i=this._dummyWindow.y,e=Graphics.boxWidth-t,o=this._dummyWindow.height;this._statusWindow=new Window_TWForgeStatus2(t,i,e,o),this._statusWindow.hide(),this.addWindow(this._statusWindow)},Scene_TWForge2.prototype.createBuyWindow=function(){var t=this._dummyWindow.y,i=this._dummyWindow.height;this._buyWindow=new Window_TWForgeBuy2(0,t,i,this._goods),this._buyWindow.setHelpWindow(this._helpWindow),this._buyWindow.setStatusWindow(this._statusWindow),this._buyWindow.hide(),this._buyWindow.setHandler("ok",this.onBuyOk.bind(this)),this._buyWindow.setHandler("cancel",this.onBuyCancel.bind(this)),this.addWindow(this._buyWindow)},Scene_TWForge2.prototype.activateBuyWindow=function(){this._buyWindow.setMoney(this.money()),this._buyWindow.show(),this._buyWindow.activate(),this._statusWindow.show()},Scene_TWForge2.prototype.commandBuy=function(){this._dummyWindow.hide(),this.activateBuyWindow()},Scene_TWForge2.prototype.onBuyOk=function(){this._item=this._buyWindow.item(),this._actor=this._buyWindow.actor(),this._type=this._buyWindow._type,this._cCost=this._buyWindow.customCost(),this._buyWindow.hide(),this._numberWindow.setup(this._item,this.buyingPrice(),this._cCost),this._numberWindow.setCurrencyUnit(this.currencyUnit()),this._numberWindow.show(),this._numberWindow.activate()},Scene_TWForge2.prototype.onBuyCancel=function(){this._commandWindow.activate(),this._dummyWindow.show(),this._buyWindow.hide(),this._statusWindow.hide(),this._statusWindow.setItem(null,null,null),this._helpWindow.clear()},Scene_TWForge2.prototype.onNumberOk=function(){switch(SoundManager.playShop(),this._commandWindow.currentSymbol()){case"buy":this.doBuy()}this.endNumberInput(),this._goldWindow.refresh(),this._statusWindow.refresh()},Scene_TWForge2.prototype.onNumberCancel=function(){SoundManager.playCancel(),this.endNumberInput()},Scene_TWForge2.prototype.doBuy=function(){var t=$dataArmors[this._actor._equips[this._type]._itemId];if(this._cCost>0){var i=$dataItems[this._cCost];$gameParty.loseItem(i,this.buyingPrice())}else $gameParty.loseGold(this.buyingPrice());$gameParty.gainItem(this._item,1),this._actor.changeEquip(this._type,this._item),$gameParty.loseItem(t,1),AudioManager.playSe(TW.forge.hammerSE2)},Scene_TWForge2.prototype.endNumberInput=function(){switch(this._numberWindow.hide(),this._commandWindow.currentSymbol()){case"buy":this.activateBuyWindow();break;case"sell":this.activateSellWindow()}},Scene_TWForge2.prototype.money=function(){return this._goldWindow.value()},Scene_TWForge2.prototype.currencyUnit=function(){return this._goldWindow.currencyUnit()},Scene_TWForge2.prototype.buyingPrice=function(){return $dataArmors[this._item.id].price},Window_TWForge2Command.prototype=Object.create(Window_HorzCommand.prototype),Window_TWForge2Command.prototype.constructor=Window_TWForge2Command,Window_TWForge2Command.prototype.initialize=function(t){this._windowWidth=t,Window_HorzCommand.prototype.initialize.call(this,0,0)},Window_TWForge2Command.prototype.windowWidth=function(){return this._windowWidth},Window_TWForge2Command.prototype.maxCols=function(){return 3},Window_TWForge2Command.prototype.makeCommandList=function(){this.addCommand(TW.forge.cmdName2,"buy"),this.addCommand(TextManager.cancel,"cancel")},Window_TWForgeBuy2.prototype=Object.create(Window_Selectable.prototype),Window_TWForgeBuy2.prototype.constructor=Window_TWForgeBuy2,Window_TWForgeBuy2.prototype.initialize=function(t,i,e,o){var r=this.windowWidth();Window_Selectable.prototype.initialize.call(this,t,i,r,e),this._shopGoods=o,this._money=0,this.refresh(),this.select(0)},Window_TWForgeBuy2.prototype.windowWidth=function(){return 456},Window_TWForgeBuy2.prototype.maxItems=function(){return this._data?this._data.length:1},Window_TWForgeBuy2.prototype.item=function(){return this._data[this.index()]},Window_TWForgeBuy2.prototype.actor=function(){return this._actor[this.index()]},Window_TWForgeBuy2.prototype.customCost=function(){return this._cCost[this.index()]},Window_TWForgeBuy2.prototype.setMoney=function(t){this._money=t,this.refresh()},Window_TWForgeBuy2.prototype.isCurrentItemEnabled=function(){return this.isEnabled(this._data[this.index()],this._actor[this.index()]._equips[this._type]._itemId,this._cCost[this.index()],this.index())},Window_TWForgeBuy2.prototype.price=function(t){return this._price[t]||0},Window_TWForgeBuy2.prototype.isEnabled=function(t,i,e,o){return e>0?t.id!=i&&this.price(o)<=$gameParty.numItems($dataItems[e]):t.id!=i&&this.price(o)<=this._money},Window_TWForgeBuy2.prototype.refresh=function(){this.makeItemList(),this.createContents(),this.drawAllItems()},Window_TWForgeBuy2.prototype.makeItemList=function(){this._data=[],this._price=[],this._actor=[],this._type=TW.forge.type-1,this._cCost=[],this._shopGoods.forEach(function(t){var i=$gameActors.actor(t);if(TW.forge.f2[TW.forge.type].armors[i._actorId]){var e=$dataArmors[i._equips[this._type]._itemId],o=TW.forge.f2[TW.forge.type].getUpgrade(t,e.id),r=$dataArmors[o],n="-",s=0;e.id!=o&&(n=Math.ceil(r.price),s=TW.forge.f2[TW.forge.type].getCost(t,o)),this._data.push(r),this._price.push(n),this._actor.push(i),this._cCost.push(s)}},this)},Window_TWForgeBuy2.prototype.drawItem=function(t){var i=this._data[t],e=this.itemRect(t);e.width-=this.textPadding(),this.changePaintOpacity(this.isEnabled(i,this._actor[t]._equips[this._type]._itemId,this._cCost[t],t)),this.drawText(this._actor[t]._name,e.x,e.y,e.width-96),this._cCost[t]>0?(this.drawText(this.price(t)+" ",e.x+e.width-96-25,e.y,96,"right"),this.drawIcon($dataItems[this._cCost[t]].iconIndex,e.x+e.width-25,e.y)):(this.drawCurrencyValue(this.price(t),TextManager.currencyUnit,e.x+e.width-96,e.y,96),this.resetTextColor()),this.changePaintOpacity(!0)},Window_TWForgeBuy2.prototype.setStatusWindow=function(t){this._statusWindow=t,this.callUpdateHelp()},Window_TWForgeBuy2.prototype.updateHelp=function(){this.setHelpWindowItem(this.item()),this._statusWindow&&this._statusWindow.setItem(this.item(),this.actor(),this._type)},Window_TWForge2Confirm.prototype=Object.create(Window_Selectable.prototype),Window_TWForge2Confirm.prototype.constructor=Window_TWForge2Confirm,Window_TWForge2Confirm.prototype.initialize=function(t,i,e){var o=this.windowWidth();Window_Selectable.prototype.initialize.call(this,t,i,o,e),this._item=null,this._price=0,this._cCost=0,this._currencyUnit=TextManager.currencyUnit,this.createButtons()},Window_TWForge2Confirm.prototype.windowWidth=function(){return 456},Window_TWForge2Confirm.prototype.setup=function(t,i,e){this._item=t,this._price=i,this._cCost=e,this.placeButtons(),this.updateButtonsVisiblity(),this.refresh()},Window_TWForge2Confirm.prototype.setCurrencyUnit=function(t){this._currencyUnit=t,this.refresh()},Window_TWForge2Confirm.prototype.createButtons=function(){var t=ImageManager.loadSystem("ButtonSet");this._buttons=[];for(var i=0;i<5;i++){var e=new Sprite_Button,o=48*i,r=48*(4===i?2:1);e.bitmap=t,e.setColdFrame(o,0,r,48),e.setHotFrame(o,48,r,48),e.visible=!1,this._buttons.push(e),this.addChild(e)}this._buttons[4].setClickHandler(this.onButtonOk.bind(this))},Window_TWForge2Confirm.prototype.placeButtons=function(){for(var t=this._buttons.length,i=-16,e=0;e<t;e++)i+=this._buttons[e].width+16;for(var o=(this.width-i)/2,r=0;r<t;r++){var n=this._buttons[r];n.x=o,n.y=this.buttonY(),o+=n.width+16}},Window_TWForge2Confirm.prototype.updateButtonsVisiblity=function(){TouchInput.date>Input.date?this.showButtons():this.hideButtons()},Window_TWForge2Confirm.prototype.showButtons=function(){for(var t=0;t<this._buttons.length;t++)this._buttons[t].visible=!0},Window_TWForge2Confirm.prototype.hideButtons=function(){for(var t=0;t<this._buttons.length;t++)this._buttons[t].visible=!1},Window_TWForge2Confirm.prototype.refresh=function(){this.contents.clear(),this.drawText("Forge ?",0,this.itemY()),this.drawOk(),this.drawTotalPrice()},Window_TWForge2Confirm.prototype.drawOk=function(){var t=this.cursorX(),i=this.itemY(),e=this.cursorWidth()-this.textPadding();this.resetTextColor(),this.drawText("OK",t,i,e,"right")},Window_TWForge2Confirm.prototype.drawTotalPrice=function(){var t=this.contentsWidth()-this.textPadding();this._cCost>0?(this.drawText(this._price+" ",0,this.priceY(),t-25-6,"right"),this.drawIcon($dataItems[this._cCost].iconIndex,this.width-75,this.priceY())):this.drawCurrencyValue(this._price,this._currencyUnit,0,this.priceY(),t)},Window_TWForge2Confirm.prototype.itemY=function(){return Math.round(this.contentsHeight()/2-1.5*this.lineHeight())},Window_TWForge2Confirm.prototype.priceY=function(){return Math.round(this.contentsHeight()/2+this.lineHeight()/2)},Window_TWForge2Confirm.prototype.buttonY=function(){return Math.round(this.priceY()+2.5*this.lineHeight())},Window_TWForge2Confirm.prototype.cursorWidth=function(){return 2*this.textWidth("0")+2*this.textPadding()},Window_TWForge2Confirm.prototype.cursorX=function(){return this.contentsWidth()-this.cursorWidth()-this.textPadding()},Window_TWForge2Confirm.prototype.isOkTriggered=function(){return Input.isTriggered("ok")},Window_TWForge2Confirm.prototype.playOkSound=function(){},Window_TWForge2Confirm.prototype.updateCursor=function(){this.setCursorRect(this.cursorX(),this.itemY(),this.cursorWidth(),this.lineHeight())},Window_TWForge2Confirm.prototype.onButtonOk=function(){this.processOk()},Window_TWForgeStatus2.prototype=Object.create(Window_Base.prototype),Window_TWForgeStatus2.prototype.constructor=Window_TWForgeStatus2,Window_TWForgeStatus2.prototype.initialize=function(t,i,e,o){Window_Base.prototype.initialize.call(this,t,i,e,o),this._item=null,this._actor=null,this._equip=null,this._pageIndex=0,this.refresh()},Window_TWForgeStatus2.prototype.refresh=function(){if(this.contents.clear(),this._item){this.textPadding();this.drawActorData()}},Window_TWForgeStatus2.prototype.setItem=function(t,i,e){this._item=t,this._equip=null!=i?$dataArmors[i._equips[e]._itemId]:null,this._actor=i,this.refresh()},Window_TWForgeStatus2.prototype.drawActorData=function(){this.drawWeapons(),this.drawDarkRectEntries(),this.drawActorStatInfo()},Window_TWForgeStatus2.prototype.drawWeapons=function(){var t=this._actor.actorId(),i="Lvl "+TW.forge.f2[TW.forge.type].getArmorLvl(t,this._equip.id),e="Lvl "+TW.forge.f2[TW.forge.type].getArmorLvl(t,this._item.id);this.contents.fontSize=20;this.getRectPosition(0);var o=i+" "+this._equip.name;this.drawText(o,0,0,this.contents.width,"left"),this.getRectPosition(1),o="-> "+e+" "+this._item.name,this.drawText(o,0,this.lineHeight(),this.contents.width,"left")},Window_TWForgeStatus2.prototype.drawDarkRectEntries=function(){for(var t=0;t<8;++t){var i=this.getRectPosition(t);this.drawDarkRect(i.x,i.y,i.width,i.height)}},Window_TWForgeStatus2.prototype.getRectPosition=function(t){var i=new Rectangle;return i.width=Math.floor(this.contents.width/2),i.height=this.lineHeight(),i.x=t%2==0?0:i.width,i.y=Math.floor(t/2)*this.lineHeight()+2*this.lineHeight(),i},Window_TWForgeStatus2.prototype.drawDarkRect=function(t,i,e,o){var r=this.gaugeBackColor();this.changePaintOpacity(!1),this.contents.fillRect(t+1,i+1,e-2,o-2,r),this.changePaintOpacity(!0)},Window_TWForgeStatus2.prototype.drawActorStatInfo=function(){this.contents.fontSize=20;for(var t=0;t<8;++t){this.changePaintOpacity(!0);var i=this.getRectPosition(t);i.x+=this.textPadding(),i.width-=2*this.textPadding(),this.changeTextColor(this.systemColor());var e=TextManager.param(t);this.drawText(e,i.x,i.y,i.width),this.drawActorChange(this._actor,i,this._equip,t)}this.changePaintOpacity(!0)},Window_TWForgeStatus2.prototype.drawActorChange=function(t,i,e,o){var r=this._item.params[o];r-=e?e.params[o]:0,this.changePaintOpacity(0!==r),this.changeTextColor(this.paramchangeTextColor(r)),r>0&&this.drawText("+"+r,i.x,i.y,i.width,"right")},Window_TWForgeStatus2.prototype.pageSize=function(){return 4},Window_TWForgeStatus2.prototype.maxPages=function(){return Math.floor(($gameParty.size()+this.pageSize()-1)/this.pageSize())},Window_TWForgeStatus2.prototype.update=function(){Window_Base.prototype.update.call(this),this.updatePage()},Window_TWForgeStatus2.prototype.updatePage=function(){this.isPageChangeEnabled()&&this.isPageChangeRequested()&&this.changePage()},Window_TWForgeStatus2.prototype.isPageChangeEnabled=function(){return this.visible&&this.maxPages()>=2},Window_TWForgeStatus2.prototype.isPageChangeRequested=function(){return!!Input.isTriggered("shift")||!(!TouchInput.isTriggered()||!this.isTouchedInsideFrame())},Window_TWForgeStatus2.prototype.isTouchedInsideFrame=function(){var t=this.canvasToLocalX(TouchInput.x),i=this.canvasToLocalY(TouchInput.y);return t>=0&&i>=0&&t<this.width&&i<this.height},Window_TWForgeStatus2.prototype.changePage=function(){this._pageIndex=(this._pageIndex+1)%this.maxPages(),this.refresh(),SoundManager.playCursor()};