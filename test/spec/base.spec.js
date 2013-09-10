/* globals describe, it, expect, jasmine, Throwback */
describe('Base', function(){
	describe('extend', function(){
		it('subclasses like a boss', function(){
			var ThingA = Throwback.Base.extend(),
				ThingB = ThingA.extend(),
				ThingC = ThingB.extend();

			var thing = new ThingC();
			expect(thing).toEqual(jasmine.any(Throwback.Base));
			expect(thing).toEqual(jasmine.any(ThingA));
			expect(thing).toEqual(jasmine.any(ThingB));
			expect(thing).toEqual(jasmine.any(ThingC));
		});
	});
});