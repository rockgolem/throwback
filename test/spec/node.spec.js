/* globals describe, it, expect, jasmine, Throwback, waitsFor, runs */
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

	it("can style it's own node, it's children, or both", function(){
		var node = new Throwback.Node();
		var child = new Throwback.Node();
		var nodeStyle = node.el.style;
		var childStyle = child.el.style;

		node.addChild(child);

		node.css({ fontSize : '20px' });
		expect(nodeStyle.fontSize).toBe('20px');
		expect(childStyle.fontSize).not.toBe('20px');

		node.css({ fontSize : '25px' }, { children : true });
		expect(nodeStyle.fontSize).toBe('25px');
		expect(childStyle.fontSize).toBe('25px');

		node.css({ fontSize : '30px' }, { onlyChildren : true });
		expect(nodeStyle.fontSize).not.toBe('30px');
		expect(childStyle.fontSize).toBe('30px');
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

	it('moves any children', function(){
		var parent = new Throwback.Node();
		var child = new Throwback.Node();

		parent.addChild(child);
		child.move(2, 4);
		parent.move(3, 5);
		expect(child.matrix).toEqual([
			[1,0,0,0],
			[0,1,0,0],
			[0,0,1,0],
			[5,9,0,1]
		]);
	});

	it('scales any children', function(){
		var parent = new Throwback.Node();
		var child = new Throwback.Node();

		parent.addChild(child);
		child.scale(2);
		parent.scale(3);
		expect(child.matrix).toEqual([
			[6,0,0,0],
			[0,6,0,0],
			[0,0,6,0],
			[0,0,0,1]
		]);
	});

	it('can move over time', function(){
		var node = new Throwback.Node();
		var result = [
			[1,0,0,0],
			[0,1,0,0],
			[0,0,1,0],
			[12,87,0,1]
		];
		node.moveTo(12, 87, 1000);
		expect(node.matrix).not.toEqual(result);
		waitsFor(function(){
			return node.matrix[3][0] === 12;
		});
		runs(function(){
			expect(node.matrix).toEqual(result);
		});
	});
});