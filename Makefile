
DIST_DIR := dist
CARGO_CACHE_DIR := ../../../build_cache/target
OUT_CACHE_DIR := ../../build_cache
DIST_DIR_PACKAGE := ../../$(DIST_DIR)
TSOL_WEB_DIR := ./packages/client-web/
TSOL_NATIVE_DIR := packages/client-native/

CARGO_FLAGS := CARGO_TARGET_DIR=$(CARGO_CACHE_DIR)


all: setup build

setup: setup-root setup-elm setup-tauri

setup-env:
	# Create build cache dir
	mkdir -p build_cache/

setup-root: setup-env
	echo "Fetching dependencies for the root npm project"
	yarn install

setup-elm: setup-env
	echo "Fetching dependencies for the web client project"
	cd $(TSOL_WEB_DIR); \
	yarn install

setup-tauri: setup-env
	echo "Fetching dependencies for the native client project"
	cd $(TSOL_NATIVE_DIR); \
	$(CARGO_FLAGS) yarn install 


build: build-web build-tauri

build-web:
	cd $(TSOL_WEB_DIR); \
	echo $(pwd); \
	yarn run elm make src/Main.elm \
		--output $(OUT_CACHE_DIR)/index.html
	yarn run webpack \
		--mode development

build-tauri: build-web
	cd $(TSOL_NATIVE_DIR); \
	$(CARGO_FLAGS) yarn $(YARN_FLAGS) run tauri build --debug

run: build-tauri
	./build_cache/target/debug/termina-sol-native

serve:
	yarn $(YARN_FLAGS) run webpack serve \
		--mode development


clean:
	rm -rf build_cache 
	rm -rf node_modules/
	rm -rf */target/
	rm -rf dist/