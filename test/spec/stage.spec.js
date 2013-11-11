/* globals describe, it, expect, jasmine, Throwback */
describe('Stage', function(){
	describe('constructor', function(){
		it('wraps a div with the .stage class', function(){
			var stage = new Throwback.Stage();
			expect(stage.el).toEqual(jasmine.any(HTMLElement));
			expect(stage.el.className).toBe('stage');
		});
	});

	it('can add nodes to the DOM', function(){
		var stage = new Throwback.Stage();

		expect(stage.el.hasChildNodes()).toBe(false);
		stage.attach(new Throwback.Node());

		expect(stage.el.hasChildNodes()).toBe(true);
	});

	it('will only attach once', function(){
		var stage = new Throwback.Stage();
		var node = new Throwback.Node();

		node.stage = 'mock';

		stage.attach(node);
		expect(stage.el.hasChildNodes()).toBe(false);
	});

	it('automatically attaches any stage children', function(){
		var stage = new Throwback.Stage();

		expect(stage.el.hasChildNodes()).toBe(false);
		stage.addChild(new Throwback.Node());

		expect(stage.el.hasChildNodes()).toBe(true);

	});

	it('adds all child nodes to the DOM too', function(){
		var stage = new Throwback.Stage();
		var parent = new Throwback.Node();
		var child = new Throwback.Node();

		parent.addChild(child);
		expect(stage.el.children.length).toBe(0);
		stage.attach(parent);

		expect(stage.el.children.length).toBe(2);
	});

	it('will add nodes to the DOM retroactively', function(){
		var stage = new Throwback.Stage();
		var parent = new Throwback.Node();
		var child = new Throwback.Node();


		expect(stage.el.children.length).toBe(0);

		stage.attach(parent);
		expect(stage.el.children.length).toBe(1);

		parent.addChild(child);
		expect(stage.el.children.length).toBe(2);
	});

	it('will add nodes to the DOM retroactively deep', function(){
		var stage = new Throwback.Stage();
		var parent = new Throwback.Node();
		var child = new Throwback.Node();
		var baby = new Throwback.Node();


		expect(stage.el.children.length).toBe(0);

		child.addChild(baby);
		parent.addChild(child);
		stage.attach(parent);
		expect(stage.el.children.length).toBe(3);
	});
});