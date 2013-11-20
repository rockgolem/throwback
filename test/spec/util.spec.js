/* globals describe, it, expect, jasmine, Throwback */
describe('Util', function(){
	it('can generate a unique string (pseudo uuid)', function(){
		var uuid = Throwback.Util.uuid();
		expect(uuid).toEqual(jasmine.any(String));
		expect(uuid.length).toBeGreaterThan(10);
		expect(Throwback.Util.uuid()).not.toBe(uuid);
	});
});