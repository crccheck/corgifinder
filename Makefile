
help: ## Shows this help
	@echo "$$(grep -h '#\{2\}' $(MAKEFILE_LIST) | sed 's/: #\{2\} /	/' | column -t -s '	')"

clean:
	rm -rf gh-pages/*

.PHONY: gh-pages
gh-pages: ## Build static files and deploy to gh-pages
gh-pages: clean gh-pages/.git
	NODE_ENV=production grunt build
	mkdir -p $@
	cp app/* $@
	cd $@ && \
	git add . && \
	git commit -am "Pages build" && \
	git push origin gh-pages


gh-pages/.git:
	mkdir -p $@
	cd gh-pages && \
	git init && \
	git remote add origin git@github.com:crccheck/corgifinder.git && \
	git checkout --orphan gh-pages
