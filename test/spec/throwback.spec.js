/* globals describe, it, expect, window, spyOn, runs, waitsFor */
describe('Throwback', function(){
	describe('requestAnimationFrame', function(){
		it('exists', function(){
			expect(window.requestAnimationFrame).toBeDefined();
			expect(window.cancelAnimationFrame).toBeDefined();
		});
		it('proxies to clearTimeout when calling cancelAnimationFrame', function(){
			spyOn(window, 'clearTimeout');
			window.cancelAnimationFrame(1);
			expect(window.clearTimeout).toHaveBeenCalledWith(1);
		});
	});
	describe('requestTimeout', function(){
		it('exists', function(){
			expect(window.requestTimeout).toBeDefined();
			expect(window.clearRequestTimeout).toBeDefined();
		});
		it('works like setTimeout', function(){
			var litmus = false;
			runs(function(){
				window.requestTimeout(function(){
					litmus = true;
				}, 20);
				expect(litmus).toBe(false);
			});
			waitsFor(function(){
				return litmus;
			});
			runs(function(){
				expect(litmus).toBe(true);
			});
		});
		it('can be cleared', function(){
			var litmus = false,
				timeout = false;

			setTimeout(function(){
				timeout = true;
			}, 50);

			runs(function(){
				var id = window.requestTimeout(function(){
					litmus = true;
				}, 20);
				expect(litmus).toBe(false);
				window.clearRequestTimeout(id);
			});
			waitsFor(function(){
				return timeout;
			});
			runs(function(){
				expect(litmus).toBe(false);
			});
		});
	});

	describe('requestInterval', function(){
		it('exists', function(){
			expect(window.requestInterval).toBeDefined();
			expect(window.clearRequestInterval).toBeDefined();
		});
		it('works like setInterval', function(){
			var litmus = 0, tidy;
			runs(function(){
				tidy = window.requestInterval(function(){
					litmus++;
				}, 20);
				expect(litmus).toBe(0);
			});
			waitsFor(function(){
				return litmus >= 5;
			});
			runs(function(){
				expect(litmus).toBeGreaterThan(4);
				window.clearRequestInterval(tidy);
			});
		});
		it('can be cleared', function(){
			var litmus = 0,
				timeout = false;

			setTimeout(function(){
				timeout = true;
			}, 50);

			runs(function(){
				var id = window.requestInterval(function(){
					litmus++;
				}, 20);
				expect(litmus).toBe(0);
				window.clearRequestInterval(id);
			});
			waitsFor(function(){
				return timeout;
			});
			runs(function(){
				expect(litmus).toBe(0);
			});
		});
	});
});