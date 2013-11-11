/* globals describe, it, expect, jasmine, Throwback */
describe('Node', function(){
	it('can add nodes to a list of children', function(){
		var node = new Throwback.Node();

		expect(node.children.length).toBe(0);
		node.addChild(new Throwback.Node());
		expect(node.children.length).toBe(1);
	});

	it('contains a reference to a parent, or NULL', function(){
		var node = new Throwback.Node();
		var child = new Throwback.Node();

		expect(child.parent).toBeNull();
		node.addChild(child);

		expect(child.parent).toBe(node);
	});

	it('wraps a div', function(){
		var node = new Throwback.Node();
		expect(node.el).toEqual(jasmine.any(HTMLElement));
	});

	it('proxies jQuery.css', function(){
		var node = new Throwback.Node();

		node.css({
			width : 100,
			height : 75
		});

		expect(node.el.style.width).toBe('100px');
		expect(node.el.style.height).toBe('75px');
	});

	it('can be moved', function(){
		var node = new Throwback.Node();
		node.move(12, 87);
		expect(node.matrix).toEqual([
			[1,0,0,0],
			[0,1,0,0],
			[0,0,1,0],
			[12,87,0,1]
		]);
	});

	it('can be rotated', function(){
		var node = new Throwback.Node();
		node.rotate(45);
		expect(node.matrix).toEqual([
			[0.5253219888177297,-0.8509035245341184,0,0],
			[0.8509035245341184,0.5253219888177297,0,0],
			[0,0,1,0],
			[0,0,0,1]
		]);
	});

	it('can be scaled', function(){
		var node = new Throwback.Node();
		node.scale(2);
		expect(node.matrix).toEqual([
			[2,0,0,0],
			[0,2,0,0],
			[0,0,2,0],
			[0,0,0,1]
		]);
	});
});