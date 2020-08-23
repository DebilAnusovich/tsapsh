//========================================================================================
//== TSR_TextColorAddOn == A Plugin by The Northern Frog =================================
//========================================================================================

var TSR = TSR || {};
TSR.TextColorAddOn = TSR.TextColorAddOn || {};
TSR.TextColorAddOn.version = 1.79;

var Imported = Imported || {};
Imported.TSR_TextColorAddOn = true;

//========================================================================================

/*:
 * @plugindesc v1.7.9 Allow to add custom Text Color Code '\c[x]' using CSS format 
 * @author TSR, The Northern Frog, 2020      
 * @help 
 * =======================================================================================
 * == About this Plugin ==================================================================
 * =======================================================================================
 * RPG Maker MV let you change the font color in text windows using  
 * the escape code '\C[x]' where x range from 0 to 31, providing 
 * colors from the default window skins of /img/system/Window.png.
 *
 * This simple Plugin now allow you to add more text color codes,
 * starting from 32. It also give the option to add a 2 colors
 * gradient effect on the text and to change the text outline color
 * and width. All of this using the well known '\C' escape code.
 *
 * You can also use a custom sprite sheet imported in /img/picture
 * to use as an additional icons sheet. Then use those sprite to
 * display as icons in text messages with the escape code '\I[x]'.
 *
 * In addition, this Plugin allow you to use '\C' color codes and 
 * '\I' icons index codes pretty much anywhere in the database. 
 *
 *
 * Text Color Object Properties:
 * =======================================================================================
 * There is only one main parameter called Text Color Object. It 
 * is a notebox where you can create your colors properties. 
 *
 * Properties consist of pairs of code:color, and each properties
 * must be separated by comas. The codes are starting from 32 and 
 * can be any number you want. The color are defined using CSS.
 * You can use either a predefined CSS color name or make your
 * own using Hex value to define the color. 
 * 
 *    Exemple: 'Aqua' or '#00ffff' will render the same color
 *
 *
 * Fill the Text Color Object notebox to your liking, adding colors
 * associated with code above 31 and separate each with comas. 
 *
 *    Exemple: 32: Aqua, 33: DarkCyan, 34: DarkKhaki
 *
 *
 * The Text Color Object notebox can be filled horizontaly and 
 * verticaly so you can pretty much add as many custom colors 
 * you may want. Line breaksand whitespaces doesn't matter, just
 * make sure that each properties are separated by comas. 
 *
 *    Previous Exemple could also be writed like this:
 *                           
 *                   32: Aqua,
 *                   33: DarkCyan,
 *                   34: DarkKhaki
 *
 *    Or like this:
 *
 *                   32: Aqua, 33: DarkCyan,
 *                   34: DarkKhaki
 *
 *    Order doesn't matter too:
 *
 *                   56: Aqua, 132: DarkCyan,
 *                   99: DarkKhaki                  
 *
 *
 * If you associate a color with a code bellow 32, the default Text Color 
 * Code will be replaced. Most default Colors have hard coded functions
 * in the engine, so replacing them will affect these functions too. Hence,
 * I suggest you add your custom color codes starting from 32. But, if you
 * do wish to replace any of the default colors to change some of the visual 
 * aspects of your game, it is as easy as adding a color name/hex values 
 * associated with the code you want to replace.
 *
 *     Exemple: Color code 19 is the purplish-black color use for most
 *              gauges background in the game. Adding '19: Aqua' in the
 *              Text Color Object notebox will result in all the gauges
 *              in the game having an Aqua colored background.
 *
 *
 * Once you have entered your custom code:color in the Text Color Object
 * notebox, all you have to do is save your project and start using your
 * new colors using the well-known '\C[x]' escape code when allowed.
 *
 *     Exemple: Using the colors of the above exemples, we could use
 *              '/C[32]' in a text message to change the font color of
 *              the following text to Aqua color (#00ffff).*
 *
 *                 *When use in an event 'Show Text' command, be aware
 *                  that the custom colors won't appear when you check
 *                  'Preview' in the 'Show Text' box. Instead, the 
 *                  text will be black-colored as it is when you put
 *                  an invalid color code. Custom colors will only
 *                  appears when in-game.
 *
 * 
 * Using rgba(r, g, b, a) format:
 * =======================================================================================
 * If you need to use the rgba(r, g, b, a) format for setting your custom
 * colors, as for changing the color opacity. Enter the rgba values inside
 * the brackets without comas, and with a single white space.
 *
 *        Exemple: 33: rgba(200 180 0 0.5)
 *
 *
 * ShadowDragon Text Color Gradient:
 * =======================================================================================
 * Thanks to ShadowDragon, this Plugin integrate the Color Gradient
 * functions of ShadowDragon_TF.js
 *
 * To add a 2 colors gradient effect to the text, just add a second
 * color code in the square brackets separate by a coma.
 *
 *       Exemple:  \C[6,24] or \C[5, 27] *white spaces doesn't matters
 *
 * Of course, it works with your custom colors: \C[49, 102]
 *
 *
 * Text Outline Color:
 * =======================================================================================
 * Change the Outline color of the text by adding a color code in the
 * brackets, preceded by a 'o'.
 *
 *       Exemple:  \C[12, o31] 
 *
 * Of course, it works with your custom colors: \C[49, o102]
 *
 * And combined with a color gradient: \C[6,24,o18]
 *
 * But this won't work: \C[6,o18,24] !!!
 *
 * Nor this: \C[o18]
 *
 *
 * Parameter: Auto Outline Opacity
 * ===============================
 * Outline Colors looks better when they are shown with half opacity. This
 * parameter allow to set the outline colors opacity to 50% automatically
 * when you use text color codes.
 * If you need to use different outline color opacity settings for each
 * custom colors, turn this parameter Off and use rgba format (see above).
 *
 *
 * Outline Width
 * =============
 * Default outline width is 4 pixels. To adjust the outline width add
 * a 'w' followed by the width in pixels:
 *
 *       Exemple:  \C[12, o31w3] outline color 31 with 3 pixels width
 *
 *       *Note that there's no coma between outline color and width.
 *        White spaces are accepted, but no coma!
 *
 *
 * Using CSS color:
 * =======================================================================================
 * There's no need to actually 'know' CSS to use that Plugin. Of course,
 * if you do know how to play with Hex values, feel free to make your
 * own colors mixes, but there's around 140 premade CSS colors supported
 * by all modern browsers. A simple Google search with something like
 * 'CSS colors' will render numerous CSS color charts where you can 
 * browse the premade colors. Choose any you want and just paste either
 * the color name or its Hex value in the Text Color Object parameter of
 * this Plugin, associating it with a code. Et voilà! 
 *
 *
 * Custom Icons Sheet:
 * ===========================================================
 * Import a sprite sheet in /img/pictures, specify its dimensions
 * through a few Plugin parameters, and show your new icons in text
 * boxes using escape code '\i[x]' where x is determined by the 
 * starting index Plugin parameter.
 * 
 * Plugin parameters:
 *
 *     Icons Sheet Name
 *         The file name of the sprite sheet in /img/pictures without
 *         file extension.
 * 
 *     Sheet Starting Index
 *         This is the starting icon code for your icon sprite sheet.
 *         Default Plugin value is 500. If you leave it that way, the
 *         icon codes for your custom sprite sheet will start at 500.
 *         That mean writing \I[500] will show the first index of your
 *         sprite sheet, that is the upper left corner frame (index 0).
 *   
 *         If you set the starting index to 0, it will overide all the
 *         default icons, so unless that's what you want, I recommand 
 *         leaving it to 500, or any number that won't overlap with your
 *         main icon set in /img/system.
 *
 *     Sheet Frame Size
 *         This is the size of one frame in your sprite sheet. The default
 *         icon set is 32x32 pixels icons, but you can use any size you
 *         want. Enter the number in pixels of the size of one frame in your 
 *         custom sheet.
 *
 *     Sheet SpritePerRows
 *         This is to tell the Plugin how many frame (images) are in one
 *         row of the custom sheet. As an exemple, the default icon sheet
 *         have 16 frames (icons) by rows.
 * 
 *     Icons Auto Scale
 *         In most cases, when using the icon code '\i[x]' with this Plugin,
 *         icons will auto scale themselves according to the font size, so 
 *         they always look in place and aligned with text. If for any reason,
 *         you need your custom icons to appear in their actual dimension, turn
 *         that parameter OFF.
 *
 * 
 *     Exemple 
 *         We'll use a Battler Sprite sheet as exemple:
 *
 *              Icons Sheet Name:      Actor1_1        
 *              Sheet Starting Index:  500 (default) 
 *              Sheet Frame Size:      64             
 *              Sheet SpritePerRows:   9
 *              Icons Auto Scale:      true
 *
 *        Now using code \i[500] in a text string will make Harold appear as
 *        an icon scaled to the text. Since Battlers sheet are 9 columns by
 *        6 rows, we can use icon codes from 500 to 553 for the whole sheet.
 *        Using \i[552] for instance will show a very dead Harold icon. 
 *        Turning the Auto scale to false would make Harold icons appear 
 *        as 64x64 pixels images that would most likely clash with the text...
 *
 *           
 *
 * Using text code in database:
 * ===========================================================
 * By adding text color codes to database entries such as Items, Weapons
 * and armors names, you can change their color when displayed. Color 
 * codes can also be use anywhere like  Map Name entries or Game Title.
 *
 * The same can be done with the Icon Escape Code \I[x] to easily display 
 * colors and icons in command menus if desired.
 *
 *         Exemple: writing '\I[60]\C[11]' in the 'Item' entry of
 *                 the 'Terms' section of  the database, will  
 *                 display icon 60 and color the text in both Battle 
 *                 Command window and Main Menu Command window. 
 *
 * Other codes that works are \V[x] to show variables value, \N[x]
 * to display actor names and \G to show currency unit. Of course,
 * result may vary when showing long string.
 *
 * Text Adjusting Parameter: Font Size
 * ===================================
 * When this parameter is On, if the text length (after removing all text
 * codes) is over the maximum width allowed for the window/box/menu, the
 * fontSize will be reduced slightly so it fits the available space. 
 *
 *    *To avoid over reducing of the text, icons aren't accounted in text
 *     length calculation. Hence, part of the text might still get cut off
 *     a bit when using icons text code.
 *
 *
 * 
 *
 * Try it for yourself and use it with parsimony, because showing
 * too much colors is the same as not enough...
 *
 *                 
 * =======================================================================================
 * == Terms of usage =====================================================================
 * =======================================================================================
 * Free to use in any RPG Maker MV projects, including commercials projects.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 * 
 * Do not change the Header or the Terms of usage.
 *
 * Editing of the script is allowed, but it won't relieve from crediting
 * obligations. Remember that changing the name of functions and variables,
 * or even manually retyping the entire script, doesn't make you the author
 * of the Plugin.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itchi.io account: 
 * https://the-northern-frog.itch.io/
 *
 *
 * This plugin was made for free use among the RMMV game dev community. Hence, 
 * it is free and will remain free. 
 *
 *
 * =======================================================================================
 * == Version and compatibility ==========================================================
 * =======================================================================================
 * 2020/03/30 Plugin completed, v1.0.0
 * 2020/04/06 Expend the scope of '\C[x]' to Window_ItemList class, v1.1.0
 * 2020/04/14 Add ObtainColorParam functions to expend scope to \C[x,x,ox], v1.2.0
 * 2020/04/15 Add Outline color code and integrate Shadowdragon Color Gradient, v1.3.0
 * 2020/04/15 Fixed the problem reading rgba format, v1.3.1
 * 2020/04/16 Fixed color code [0] processing, v1.3.2
 * 2020/04/18 Add Outline Width to text color code parameters, and some minor fixes, v1.4.3
 * 2020/04/18 Built drawTextEx functions in Bitmap Object, v1.5.3
 * 2020/04/29 fixed adjust width and add \I[x] and \V[x] to availables codes v1.6.4
 * 2020/05/08 Changed drawIcon function for better consistancy with lineHeight v1.6.5
 * 2020/05/15 Added options for custom icons sheet v1.7.6
 * 2020/05/20 Added maxWidth property to textState object, param restruct v1.7.8
 * 2020/05/20 Added text adjusting parameters v1.7.9
 *
 * Compatible with Yanfly Engine Plugins Library. 
 * If you use Yanfly Message Core, place this Plugin above it.
 *
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =======================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =======================================================================================
 *
 *
 * @param Color Object
 * @text Text Color Object
 * @type note
 * @desc Set your colors properties.
 * Refer to Plugin instructions.
 * @default "32: Aqua, \n33: DarkCyan, \n34: DarkKhaki"
 *
 *
 *@param ---Auto Text Adjusting---
 *
 * @param Font Size 
 * @parent ---Auto Text Adjusting---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Reduce fontSize when text lenght is higher than maxWidth?
 * NO - false     YES - true
 * @default true
 *
 * @param Outline Opacity
 * @parent ---Auto Text Adjusting---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Set ouline colors used with text code to 50% opacity?
 * NO - false     YES - true
 * @default true
 *
 *
 *@param ---Custom Icons Sheet---
 *
 * @param Icons Sheet Name
 * @parent ---Custom Icons Sheet---
 * @desc Name of the icons sheet file
 * Image must be stored in /img/picture
 * @default 
 *
 * @param Sheet Starting Index
 * @parent ---Custom Icons Sheet---
 * @type number
 * @min 0
 * @desc The first index of the icon sheet in color codes
 * Refer to Plugin instructions.
 * Default: 500
 * @default 500
 *
 * @param Sheet Frame Size
 * @parent ---Custom Icons Sheet---
 * @type number
 * @min 1
 * @desc The size in pixels of a sprite in the sheet
 * Refer to Plugin instructions.
 * Default: 32
 * @default 32
 *
 * @param Sheet SpritePerRows
 * @parent ---Custom Icons Sheet---
 * @type number
 * @min 1
 * @desc Number of frame in a row in the sprite sheet
 * Refer to Plugin instructions.
 * Default: 16
 * @default 16
 *
 * @param Icons Auto Scale
 * @parent ---Custom Icons Sheet---
 * @desc Auto Scaling of Icons with line height?
 * @default true
 *
 *
 */

//== PARAMETERS ============================================================================

 TSR.Parameters = PluginManager.parameters('TSR_TextColorAddOn');
  
 TSR.TextColorAddOn.getColorObj = function(textbox) {
      let obj = {};
      let StringObj = textbox;
      StringObj = StringObj.split(',');
      let prop; 
      let val; 
      let s;
      let ss;
      for (let i in StringObj) {
        if (StringObj[i].includes('\n')) {
          s = StringObj[i].slice(0, StringObj[i].indexOf('\n'));
          ss = StringObj[i].slice(StringObj[i].indexOf('\n') + 1);
          StringObj[i] = s.concat(ss);
        }
        prop = StringObj[i].slice(0, StringObj[i].indexOf(':'));
        prop = prop.trim();
        val = StringObj[i].slice(StringObj[i].indexOf(':') + 1);
        if (val.includes('rgba')) {
          s = val.slice(val.indexOf('rgba'))
          val = s.replace(' ', ',')
          s = val.replace(' ', ',')
          val = s.replace(' ', ',')
        }
        val = val.trim()
        obj[prop] = val;
      }
      return obj;
 };

 TSR.TextColorAddOn.scale_font  = String(TSR.Parameters['Font Size']);
 TSR.TextColorAddOn.scale_font  = eval(TSR.TextColorAddOn.scale_font);
 TSR.TextColorAddOn.OCop        = String(TSR.Parameters['Icons Auto Scale']);
 TSR.TextColorAddOn.OCop        = eval(TSR.TextColorAddOn.OCop);
 TSR.TextColorAddOn.colors      = JSON.parse(TSR.Parameters['Color Object']);
 TSR.TextColorAddOn.colors      = TSR.TextColorAddOn.getColorObj(TSR.TextColorAddOn.colors);
 TSR.TextColorAddOn.sheet       = String(TSR.Parameters['Icons Sheet Name']);
 TSR.TextColorAddOn.index       = String(TSR.Parameters['Sheet Starting Index']);
 TSR.TextColorAddOn.frame       = String(TSR.Parameters['Sheet Frame Size']);
 TSR.TextColorAddOn.perRow      = String(TSR.Parameters['Sheet SpritePerRows']);
 TSR.TextColorAddOn.scale       = String(TSR.Parameters['Icons Auto Scale']);
 TSR.TextColorAddOn.scale       = eval(TSR.TextColorAddOn.scale);

//== CORE ================================================================================

//== Bitmap ===================================

    TSR._Bitmap_drawTextBody = Bitmap.prototype._drawTextBody;
  Bitmap.prototype._drawTextBody = function(text, textX, textY, maxWidth) {
    if (this._TextGradientCT) {
	var ctext = this._context;
	ctext.fillStyle = this.TextGradientFill(textX);
	ctext.fillText(text, textX, textY, maxWidth);
    } else {
        TSR._Bitmap_drawTextBody.call(this, text, textX, textY, maxWidth);
    }
  };

  Bitmap.prototype.TextGradientFill = function(x) {
    var y = this._ColorY;
    var gradient = this._context.createLinearGradient(x, y, x, y + this._ColorHeight);
    var interval = 1.0 / (this._TextGradientCT.length - 1)
    for (var i = 0; i < this._TextGradientCT.length; i++) {
      gradient.addColorStop(i * interval, this._TextGradientCT[i]);
    }
    return gradient;
  };

  Bitmap.prototype.setTextGradientCT = function(colorArray) {
    this._TextGradientCT = colorArray;
  };

  TSR._Bitmap_drawText = Bitmap.prototype.drawText;
  Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    let pad = this.fontSize / 4.66;
    lineHeight = lineHeight || this.fontSize + pad * 2
    this._ColorY = y;
    this._ColorHeight = lineHeight;
    if (/\\/.test(text))  {
      this.drawTextEx(text, x, y, maxWidth, lineHeight, align);
    } else {
      TSR._Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
    }
  };

  Bitmap.prototype.drawTextEx = function(text, x, y, maxWidth, lineHeight, align) {
    text = String(text)
    if (text) {
        let textPos = this.alignText(text, x, align, maxWidth);
        var textState = { index: 0, x: x + textPos, y: y, left: x + textPos, maxWidth: maxWidth};
        if (text.toUpperCase().includes('\\I[')) textState.hasIcon = true;
        textState.text = this.convertEscapeCharacters(text);
        textState.height = lineHeight;
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
  };

  Bitmap.prototype.adjustWidth = function(text) {
     let t = text.split(' ');
     text = '';
     let icon = false;
     for (let i = 0; i < t.length; i++) {
        t[i] = t[i].toUpperCase();
        if (t[i].length !== this.convertEscapeCharacters(t[i]).length) {
          t[i] = this.convertEscapeCharacters(t[i]);
        } else {
          if (t[i].includes('\\I[')) {
            let t1 = t[i].slice(0, t[i].indexOf('\\I['));
            let t2 = t[i].slice(t[i].indexOf('\\I['));
            t[i]= t1.concat(t2.slice(t[i].indexOf(']') + 1))
            icon = (this._iconOff)? false : true;
          }
          if (t[i].includes(']')) t[i] = t[i].slice(t[i].indexOf(']') + 1);
          if (t[i].includes('\\')) t[i] = t[i].slice(0, t[i].indexOf('\\'));
        }
        text += (i === t.length - 1)? t[i] : t[i] + ' ';
     }
     if (!icon) {
       return this.measureTextWidth(text);
     } else {
       return this.measureTextWidth(text) + Window_Base._iconWidth + 8;
     }
  };

  Bitmap.prototype.alignText = function(text, x, align, maxWidth) {
        if (align === 'center') {
            return (maxWidth / 2) - (this.adjustWidth(text) / 2);
        }
        if (align === 'right') {
            return maxWidth - this.adjustWidth(text);
        }
        return 0;
  };

  Bitmap.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return Window_Base.prototype.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return Window_Base.prototype.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text; 
};

Bitmap.prototype.processCharacter = function(textState) {
    switch (textState.text[textState.index]) {
    case '\x1b':
        this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
        break;
    default:
        this.processNormalCharacter(textState);
        break;
    }
};

Bitmap.prototype.processNormalCharacter = function(textState) {
    let c           = textState.text[textState.index++],
        w           = this.measureTextWidth(c),
        pad         = this.fontSize / 4.66,
        iconwidth   = this.fontSize + pad * 2,
        textwidth   = this.adjustWidth(textState.text);
    if (textState.hasIcon) textwidth -= iconwidth;
    if (textwidth > textState.maxWidth && TSR.TextColorAddOn.scale_font) {
      let cacheFontSize = this.fontSize;
      this.fontSize *= (textState.maxWidth / textwidth);
      w = this.measureTextWidth(c)
      this.drawText(c, textState.x, textState.y, w * 2, textState.height);
      this.fontSize = cacheFontSize;
    } else {
      this.drawText(c, textState.x, textState.y, w * 2, textState.height);
    }    
    textState.x += w;
};

Bitmap.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'C':
        this.obtainColorsParam(textState);
        break;
    case 'I':
        this.processDrawIcon(Window_Base.prototype.obtainEscapeParam(textState), textState);
        break;
    case '{':
        break;
    case '}':
        break;
    }
};

Bitmap.prototype.processDrawIcon = function(iconIndex, textState) {
    if (!this._iconOff) {
      let pad        = this.fontSize / 4.66;
      let iconwidth  = this.fontSize + pad * 2;
      let sheet      = ImageManager.loadSystem('IconSet');
      let start      = 0;
      let frame      = Window_Base._iconWidth
      let perRow     = 16
      let adjust     = true
      if (TSR.TextColorAddOn.sheet) {
        if (iconIndex >= TSR.TextColorAddOn.index) {
          sheet   = ImageManager.loadPicture(TSR.TextColorAddOn.sheet);
          start   = TSR.TextColorAddOn.index;
          frame   = TSR.TextColorAddOn.frame;
          perRow  = TSR.TextColorAddOn.perRow;
          adjust  = TSR.TextColorAddOn.scale;
        }
      } 
      this.drawIcon(iconIndex, textState.x + 2, textState.y + 2, iconwidth, pad, sheet, start, frame, perRow, adjust);
      textState.x += iconwidth + 4;
    }
};

Bitmap.prototype.drawIcon = function(iconIndex, x, y, iconwidth, pad, sheet, start, frame, perRow, adjust) {
      let bitmap = sheet;
      let pw = frame;
      let ph = frame;
      let dw = (adjust)? iconwidth : pw;
      let dh = (adjust)? iconwidth : ph;
      let index = iconIndex - start;
      let sx = index % perRow * pw; 
      let sy = Math.floor(index / perRow) * ph;
      y -= (adjust)? pad / 2 : 0;
      this.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);  
};

Bitmap.prototype.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+/i;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].toUpperCase();
    } else {
        return '';
    }
};

Bitmap.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');
};

Bitmap.prototype.setTextColor = function(n) {
     if (TSR.TextColorAddOn.colors[n]) {
        return TSR.TextColorAddOn.colors[n];
     } else {
        var px = 96 + (n % 8) * 12 + 6;
        var py = 144 + Math.floor(n / 8) * 12 + 6;
        return this.windowskin.getPixel(px, py);
     }
};

Bitmap.prototype.resetTextColor = function() {
    this.changeTextColor(0);
    this.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.outlineWidth = 4;
    this.setTextGradientCT(null);
};

Bitmap.prototype.changeTextColor = function(color) {
    this.textColor = this.setTextColor(color);
};

Bitmap.prototype.obtainColorsParam = function(textState) {
    this.loadWindowskin();
    var arr = /^\[\d+,*\s*o*\d*\s*w*\d*,*\s*o*\d*\s*w*\d*\]/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      if (arr[0].includes('0')) {
        this.resetTextColor();
      }
      if (arr[0].includes(',') && arr[0].slice(arr[0].indexOf(',') + 1).includes(',')) {
        if (arr[0].includes('o')) {
          let CG1 = this.textColor = this.setTextColor(parseInt(arr[0].slice(1)));
          let CG2 = this.textColor = this.setTextColor(parseInt(arr[0].slice(arr[0].indexOf(',') + 1)));
          let OC = this.textColor = this.setTextColor(parseInt(arr[0].slice(arr[0].indexOf('o') + 1)));
          this.setTextGradientCT([CG1,CG2]);
          this.outlineColor = (TSR.TextColorAddOn.OCop)? this.setOCop(OC, 0.5) : OC;  
          if (arr[0].includes('w')) {
            this.outlineWidth = parseInt(arr[0].slice(arr[0].indexOf('w') + 1));
          }
        } else {
          let CG1 = this.textColor = this.setTextColor(parseInt(arr[0].slice(1)));
          let CG2 = this.textColor = this.setTextColor(parseInt(arr[0].slice(arr[0].indexOf(',') + 1)));
          this.setTextGradientCT([CG1,CG2]);
        }       
      } else if (arr[0].includes(',')) {
        if (arr[0].includes('o')) {
          let color = parseInt(arr[0].slice(1));
          let OC = this.textColor = this.setTextColor(parseInt(arr[0].slice(arr[0].indexOf('o') + 1)));
          this.changeTextColor(color);
          this.outlineColor = (TSR.TextColorAddOn.OCop)? this.setOCop(OC, 0.5) : OC;
          if (arr[0].includes('w')) {
            this.outlineWidth = parseInt(arr[0].slice(arr[0].indexOf('w') + 1));
          }
        } else {
          let CG1 = this.textColor = this.setTextColor(parseInt(arr[0].slice(1)));
          let CG2 = this.textColor = this.setTextColor(parseInt(arr[0].slice(arr[0].indexOf(',') + 1)));
          this.setTextGradientCT([CG1,CG2]);
        }
      } else {
          let color = parseInt(arr[0].slice(1));
          this.changeTextColor(color);
      }
    } else {
        this.changeTextColor(0);
        this.resetTextColor();
    }
  };

  Bitmap.prototype.setOCop = function(color, opacity) {
    let r = parseInt(color.slice(1, 3), 16),
        g = parseInt(color.slice(3, 5), 16),
        b = parseInt(color.slice(5, 7), 16);
    if (opacity) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  };


//== SCENE ================================================================================

//== Scene_Boot =====================================
  
  if (TSR.TextColorAddOn.sheet) {
      TSR._Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages
    Scene_Boot.loadSystemImages = function() {
      ImageManager.reservePicture(TSR.TextColorAddOn.sheet);  
      TSR._Scene_Boot_loadSystemImages.call(this);
    };
  }

  
//== WINDOW ================================================================================

//== Window_Base =====================================

  Window_Base.prototype.textColor = function(n) { 
     if (TSR.TextColorAddOn.colors[n]) {
        return TSR.TextColorAddOn.colors[n];
     } else {
        let px = 96 + (n % 8) * 12 + 6;
        let py = 144 + Math.floor(n / 8) * 12 + 6;
        return this.windowskin.getPixel(px, py);
     } 
  };

  Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'C':
        this.contents.obtainColorsParam(textState);
        break;
    case 'I':
        this.contents.processDrawIcon(this.obtainEscapeParam(textState), textState);
        break;
    case '{':
        this.makeFontBigger();
        break;
    case '}':
        this.makeFontSmaller();
        break;
    }
  };
 
    TSR._Window_Base_resetTextColor = Window_Base.prototype.resetTextColor;
  Window_Base.prototype.resetTextColor = function() {
    TSR._Window_Base_resetTextColor.call(this);
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.contents.setTextGradientCT(null);
  };

  Window_Base.prototype.textWidth = function(text) {
    if (/\\/.test(text))  { 
      return this.contents.adjustWidth(text);
    } else {
      return this.contents.measureTextWidth(text);
    }
  };


//== Window_BattleLog =====================================

  Window_BattleLog.prototype.refresh = function() {
    this.drawBackground();
    this.contents.clear();
    this.contents._iconOff = (Imported.YEP_BattleEngineCore)? true : false;
    for (var i = 0; i < this._lines.length; i++) {
        this.drawLineText(i);
    }
    this.contents._iconOff = false
 };
  
//== END =================================================================================
//========================================================================================