/**
 * throwback v0.0.1 - 2013-11-13
 * Retro Game Rendering Engine
 *
 * Copyright (c) 2013 Stephen Young <steve@rockgolem.com>
 * Licensed MIT
 */
// https://gist.github.com/gmyx/5638072

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime, x, vendors;

    x = 0;
    vendors = ['ms', 'moz', 'webkit', 'o'];

    // find one
    for (x = 0; x < 4 && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    // make one
    if (!window.requestAnimationFrame) {
        lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    /**
     * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     */
    window.requestTimeout = function(fn, delay, args) {
        var start, handle;
        if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
            !window.oRequestAnimationFrame && !window.msRequestAnimationFrame
        ) {
            return window.setTimeout(fn, delay);
        }

        start = new Date().getTime();
        handle = {};

        function loop() {
            if (new Date().getTime() - start >= delay) {
                fn.call(fn, args);
            } else {
                handle.value = requestAnimationFrame(loop);
            }
        }

        handle.value = requestAnimationFrame(loop);
        return handle;
    };

    /**
     * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {int|object} fn The callback function
     */
    window.clearRequestTimeout = function(handle) {
        return window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
            clearTimeout(handle);
    };

    /**
     * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     */
    window.requestInterval = function(fn, delay, args) {
        var start, handle;
        if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
            !window.oRequestAnimationFrame && !window.msRequestAnimationFrame
        ) {
            return window.setInterval(fn, delay);
        }

        start = new Date().getTime();
        handle = {};

        function loop() {
            handle.value = requestAnimationFrame(loop);
            if (new Date().getTime() - start >= delay) {
                fn.call(fn, args);
                start = new Date().getTime();
            }
        }

        handle.value = requestAnimationFrame(loop);
        return handle;
    };

    /**
     * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {int|object} fn The callback function
     */
    window.clearRequestInterval = function(handle) {
        return window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
    };
}());;
(function(jQuery, undefined) {
    "use strict";
    var Throwback = {};

    /**
     * A Collection of useful utility methods.
     */
    Throwback.Util = {
        uuid: function() {
            return (Math.PI * Math.max(0.01, Math.random())).toString(36).substr(2);
        }
    };
    /**
     * Base object.
     *
     * All Throwback constructors inherit from this object.
     */
    var Base = Throwback.Base = function() {};

    /**
     * Create a subclass and correctly set up the prototype chain.
     *
     * @return Object
     */
    Base.extend = function(properties, statics) {
        var child, parent, Surrogate, $;

        parent = this;

        if (properties && properties.hasOwnProperty('constructor')) {
            child = properties.constructor;
        } else {
            child = function() {
                return parent.apply(this, arguments);
            };
        }

        $ = Throwback.jQuery;
        $.extend(child, parent, statics);
        Surrogate = function() {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate();
        child.__super__ = parent.prototype;

        if (properties) {
            $.extend(child.prototype, properties);
        }

        return child;
    };
    /**
     * Discourage global use of jQuery
     */
    if (jQuery) {
        Throwback.jQuery = jQuery.noConflict();
    }
    var Timer = Throwback.Timer = Base.extend();
    var _render = function(delta, now) {
        var length = _stagedNodes.length;
        var i, transform, node, style, matrix;
        for (i = 0; i < length; i++) {
            node = _stagedNodes[i];

            matrix = node.matrix;

            transform = 'matrix3d(';
            transform += [
                matrix[0].join(','),
                matrix[1].join(','),
                matrix[2].join(','),
                matrix[3].join(',')
            ].join(',');
            transform += ')';

            style = node.el.style;
            style["-webkit-transform"] = transform;
            style.transform = transform;

            // process animations
            if (node.animate) {
                node.animate(now);
            }
        }
    };
    /**
     * Function set by the user to be called before starting the event loop.
     *
     * @var Function
     */
    var _gameSetup = function() {};

    /**
     * Function set by the user to be called each tick.
     *
     * @var Function
     */
    var _logicUpdate = function() {};

    /**
     * Used by the game loop to keep track of elapsed time.
     *
     * @var Number
     */
    var _previousTime = (new Date()).getTime();

    /**
     * Used by the game loop to keep track of slow processes.
     *
     * @var Number
     */
    var _lag = 0.0;

    /**
     * Number if miliseconds allowed per update.
     *
     * @var Number
     */
    var MS_PER_UPDATE = 60;

    /**
     * Game object is the primary constructor
     *
     * It creates a stage and maintains the game loop
     *
     * @param Object
     * @return void
     */
    var Game = Throwback.Game = Base.extend({
        constructor: function(config) {
            var options = Throwback.jQuery.extend({}, config);
            this.stage = options.stage || new Throwback.Stage();
        },

        setup: function(fn) {
            _gameSetup = fn;
        },

        start: function() {
            _gameSetup();
            _mainLoop();
        },

        tick: function(fn) {
            _logicUpdate = fn;
        },
    });

    /**
     * Primary game loop
     *
     * @var Function
     */
    var _mainLoop = function() {
        var now;

        now = (new Date()).getTime();
        _lag += now - _previousTime;
        _previousTime = now;

        // TODO: process user input here

        while (_lag >= MS_PER_UPDATE) {
            _logicUpdate();
            _lag -= MS_PER_UPDATE;
        }

        _render(_lag / MS_PER_UPDATE, now);

        requestAnimationFrame(_mainLoop);
    };
    var Node = Throwback.Node = Base.extend({

        /**
         * Adds another node as a child
         *
         * @param Node node
         */
        addChild: function(node) {
            var stage;

            node.parent = this;
            this.children.push(node);

            // handle retroactive stage attachment
            stage = this.stage;
            if (stage) {
                stage.attach(node);
            }
        },

        /**
         * @constructor
         */
        constructor: function() {
            var el;
            this.el = el = document.createElement('div');
            this.parent = null;
            this.children = [];
            this.matrix = identityMatrix();
            this.position = [0, 0, 0, 1];
            this.dirty = false;
            Throwback.jQuery(el).css({
                position: 'absolute',
                top: 0,
                left: 0
            });
        },

        /**
         * jQuery.css proxy
         *
         * @param Object options
         * @return void
         */
        css: function(options) {
            Throwback.jQuery(this.el).css(options);
        },

        /**
         * Move (translate) the node
         *
         * @param Number x units of movement relative to the current position
         * @param Number y units of movement relative to the current position
         * @return Array
         */
        move: function(x, y, z) {
            var children, i, length, matrix;

            this.matrix = matrix = numeric.dot(this.matrix, translationMatrix(x, y, z));

            children = this.children;
            length = children.length;
            for (i = 0; i < length; i++) {
                children[i].move(x, y, z);
            }

            return matrix;
        },

        /**
         * Rotate the node
         *
         * @param Number s
         * @return void
         */
        rotate: function(degree) {
            var current = this.matrix[3];

            this.move(-current[0], -current[1], -current[2]);
            this.matrix = numeric.dot(this.matrix, rotationMatrix(degree));
            return this.move.apply(this, current);
        },

        /**
         * Scales the node up or down
         *
         * @param Number s
         * @return void
         */
        scale: function(s) {
            var children, i, length, matrix;
            this.matrix = matrix = numeric.dot(this.matrix, scaleMatrix(s));

            children = this.children;
            length = children.length;
            for (i = 0; i < length; i++) {
                children[i].scale(s);
            }

            return matrix;
        }
    });

    var identityMatrix = function() {
        return [
            [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]
        ];
    };

    var rotationMatrix = function(degree) {
        var cos = Math.cos;
        var sin = Math.sin;
        return [
            [cos(degree), sin(-degree), 0, 0], [sin(degree), cos(degree), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]
        ];
    };

    var scaleMatrix = function(s) {
        return [
            [s, 0, 0, 0], [0, s, 0, 0], [0, 0, s, 0], [0, 0, 0, 1]
        ];
    };

    var translationMatrix = function(x, y, z) {
        z = z || 0;
        return [
            [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [x, y, z, 1]
        ];
    };
    var Entity = Throwback.Entity = Node.extend({

        /**
         * Process entity animation
         *
         * @param Number now
         * @return void
         */
        animate: function(now) {
            var animation = this.currentAnimation;
            if (animation && animation.on) {
                if (animation.update(now)) {
                    this.render();
                }
            }
        },

        constructor: function(config) {
            var options = Throwback.jQuery.extend({}, config);

            Node.call(this);
            this.animations = options.animations || {};
            this.defaultAnimation = options.defaultAnimation;
            this.setAnimation();
        },

        /**
         * Set the background image
         *
         * @return void
         */
        render: function() {
            this.css({
                backgroundPosition: this.currentAnimation.toString()
            });
        },

        /**
         * Sets the animation to one specified, or back to the default if not specified.
         *
         * @param String name
         * @return void
         */
        setAnimation: function(name) {
            var current = this.currentAnimation;
            if (current) {
                current.stop();
            }
            this.currentAnimation = current = this.animations[name || this.defaultAnimation];
            if (current) {
                current.start();
                this.css({
                    backgroundImage: current.getBackgroundImage()
                });
            }
        }
    });
    var Group = Throwback.Group = Node.extend();
    var Layer = Throwback.Layer = Node.extend();
    var Scene = Throwback.Scene = Node.extend();
    var attachStage, _stagedNodes;

    /**
     * List of nodes used by the render loop to draw.
     *
     * @type Array
     */
    _stagedNodes = [];

    /**
     * The stage object keeps track of layers and represents the base element.
     */
    var Stage = Throwback.Stage = Node.extend({

        addChild: function(node) {
            Node.prototype.addChild.call(this, node);
            this.attach(node);
        },

        // Make a node append to the stage element
        attach: function(node) {
            var children, stage;

            if (!node.stage) {
                node.stage = stage = this;

                Throwback.jQuery(node.el).appendTo(this.el);

                children = node.children;
                if (children.length) {
                    children.forEach(function(node) {
                        stage.attach(node);
                    });
                }
                _stagedNodes.push(node);
            }
        },
        constructor: function(config) {
            var options = Throwback.jQuery.extend({}, config);

            Node.call(this);
            this.el = options.el || this.el;
            attachStage.call(this, options.container);
        }
    });

    /**
     * Creates a stage object and appends it to the provided container, or to the body
     *
     * @param String container a selector
     * @return void
     */
    attachStage = function(container) {
        Throwback
            .jQuery(this.el)
            .addClass('stage')
            .appendTo(container || 'body');
    };
    var Animation = Throwback.Animation = Base.extend({

        /**
         * Wraps a sprite
         *
         * @param Throwback.Sprite sprite
         * @return void
         */
        constructor: function(sprite) {
            var anim = this;
            this.sprite = sprite;
            this.on = false;
            this.frames = [];
            this.currentFrame = 0;
            sprite.async.done(function() {
                anim.sequence([0]);
            });
        },

        /**
         * Returns the frame count of the animation
         *
         * @return Number
         */
        getFrameCount: function() {
            return this.frames.length;
        },

        /**
         * Return string for backgroundImage
         * @return {[type]}
         */
        getBackgroundImage: function() {
            return 'url("' + this.sprite.image.src + '") ';
        },

        /**
         * Limits the animation to certain frames, with a frames-per-second value
         *
         * @param Array frames
         * @param Number fps
         * @return void
         */
        sequence: function(frames, fps) {
            if (this.sprite.verifyFrames(frames)) {
                this.frames = frames;
                this.fps = fps || 15;
                this.frameTime = 1000 / this.fps;
            } else {
                throw new Error('frames out of bounds');
            }
        },

        /**
         * Turns the animation on
         *
         * @return void
         */
        start: function() {
            this.previousFrameTime = (new Date()).getTime();
            this.on = true;
        },

        /**
         * Advance the current frame
         *
         * @return void
         */
        step: function() {
            var current = this.currentFrame;
            this.currentFrame = current === this.frames.length - 1 ? 0 : current + 1;
        },

        /**
         * Turns the animation off
         *
         * @return void
         */
        stop: function() {
            this.on = false;
        },

        /**
         * Returns a CSS value for `background-position`
         *
         * @param void
         * @return String
         */
        toString: function() {
            var frame = this.frames[this.currentFrame];
            var sprite = this.sprite;
            var params = sprite.options;
            var width = params.width;
            var frameWidth = params.frameWidth;
            var frameHeight = params.frameHeight;
            var x = 0;
            var y = 0;
            var linear = frame * frameWidth;

            while (linear >= width) {
                linear -= width;
                y += frameHeight;
            }
            x = -linear;
            y = -y;
            return x.toString() + 'px ' + y.toString() + 'px';
        },

        /**
         * Compares the time against the previous time
         * and advances the frame if needed.
         *
         * @param Number now
         * @return void
         */
        update: function(now) {
            var interval = now - this.previousFrameTime;
            var frameTime = this.frameTime;
            var updated = false;
            while (interval >= frameTime) {
                updated = true;
                this.step();
                interval -= frameTime;
            }
            if (updated) {
                this.previousFrameTime = now;
            }
            return updated;
        }
    });
    var imageCache, makeImage, guessSize, fixFrameSize;

    imageCache = {};

    /**
     * Sprite object is a wrapper for an image.
     */
    var Sprite = Throwback.Sprite = Base.extend({

        /**
         * @param String|Object param
         * @return void
         */
        constructor: function(param) {
            this.options = {};
            if (typeof param === 'string') {
                this.setImage(param);
            } else {
                this.config(param);
            }
        },

        /**
         * Store configuration data about the Sprite
         *
         * @param Object options
         * @return void
         */
        config: function(options) {
            Throwback.jQuery.extend(this.options, options);
            if (options.img) {
                this.setImage(options.img);
            }
            fixFrameSize.call(this);
        },

        /**
         * Returns a config option by key
         * @param String key
         * @return Mixed
         */
        get: function(key) {
            return this.options[key];
        },

        getFrameCount: function() {
            var width, height, frameWidth, frameHeight;

            width = this.get('width') || 0;
            height = this.get('height') || 0;
            frameWidth = this.get('frameWidth');
            frameHeight = this.get('frameHeight');

            return Math.floor(width / frameWidth) * Math.floor(height / frameHeight);
        },

        /**
         * @param String filename
         * @return void
         */
        setImage: function(filename) {
            var image, async;

            image = imageCache[filename];
            async = this.async = new Throwback.jQuery.Deferred();

            if (image) {
                this.image = image;
                async.resolve();
            } else {
                this.image = (imageCache[filename] = makeImage(filename, async));
            }
            guessSize.call(this);

            async.fail(function() {
                throw new Error('Could not load image: ' + filename);
            });
        },

        verifyFrames: function(frames) {
            var min, max;
            min = Math.min.apply(Math, frames);
            max = Math.max.apply(Math, frames);
            return min >= 0 && max <= Math.max(0, this.getFrameCount() - 1);
        }
    });

    fixFrameSize = function() {
        var options = this.options;
        ['Height', 'Width'].forEach(function(param) {
            var frameName = 'frame' + param;
            if (options[frameName] === undefined) {
                options[frameName] = options[param.toLowerCase()];
            }
            options[frameName] = Math.max(options[frameName], 1);
        });
    };

    /**
     * Attempts to set the width/height, if they have not already been set.
     *
     * @return void
     */
    guessSize = function() {
        var sprite = this,
            image = this.image;

        this.async.done(function() {
            var el, width, height;

            el = Throwback.jQuery(image);
            width = sprite.get('width') || el.width();
            height = sprite.get('height') || el.height();
            sprite.config({
                width: width,
                height: height,
                frameWidth: sprite.get('frameWidth') || width || 1,
                frameHeight: sprite.get('frameHeight') || height || 1
            });
        });
    };

    /**
     * Creates a new image object, and sets the src to filename.
     *
     * @param String filename
     * @param jQuery.Defered async
     * @return Image
     */
    makeImage = function(filename, async) {
        var img = new Image();
        img.src = filename;
        img.onLoad = img.onError = function() {
            async.reject();
        };
        return img;
    };
    var Audio = Throwback.Audio = Base.extend();
    var Music = Throwback.Music = Audio.extend();
    var Sound = Throwback.Sound = Audio.extend();
    if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Throwback;
    } else {
        this.Throwback = Throwback;
    }
}).call(this, this.jQuery);
