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

	it('can set the coordinates of the div', function(){
		var node = new Throwback.Node();
		var stage = new Throwback.Stage();
		var position;

		stage.attach(node);

		node.setPosition(10, 20);

		position = node.position;
		expect(position[0]).toBe(10);
		expect(position[1]).toBe(20);
	});
});