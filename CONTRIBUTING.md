# Contribute


## Resources

- [Coding Standards](http://learn.bevry.me/community/coding-standards)
- [Documentation Guidelines](http://learn.bevry.me/community/documentation-guidelines)
- [Support Guidelines](http://learn.bevry.me/community/support-guidelines)


## Development

For developers and contributors

1. Fork project and clone your fork

2. Install global dependencies

	``` bash
	npm install -g coffee-script
	```
	**Note**: You will need coffee-script for Docpad (v6). This plugin doesn't need it.

3. Install local dependencies

	``` bash
	npm run our:setup
	```

4. Compile project

	``` bash
	npm run our:compile
	```

5. Run tests

	``` bash
	npm run our:test
	```


## Publishing

For project maintainers

1. Update meta files with latest information

	``` bash
	npm run our:release:prepare
	```

2. Add a changelog entry to `HISTORY.md` with change information

	```
	v2.0.0 April 17, 2013
		- Something that changes
	```

3. Update `version` entry in `package.json` with new version number

4. Commit changes

	``` bash
	git commit -a -m "A message about what changed"
	```

5. Publish new version

	``` bash
	npm run our:release
	npm publish
	```
