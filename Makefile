dev:
	@open http://localhost:8080/example/example.html
	@gulp

build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
