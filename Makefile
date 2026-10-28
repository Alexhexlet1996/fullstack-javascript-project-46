lint:
	npx oxlint .
lint-fix:
	npx oxlint --fix .
format:
	npx npx prettier --write .
test-coverage:
	npx vitest --coverage
test:
	npx vitest
