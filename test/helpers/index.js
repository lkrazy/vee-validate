exports.mockFile = (name, type, size = 1) => ({
    name,
    type,
    size: size * 1024
});

exports.mockDimensionsTest = (dimensions, fails = false) => {
    global.window = {
        URL: {
            createObjectURL() {
                return 'data:image/png;base64,AAAAAAA';
            }
        }
    };

    global.Image = class Image {
        // eslint-disable-next-line
        set src(value) {
            this.width = dimensions.width;
            this.height = dimensions.height;

            this[fails ? 'onerror' : 'onload']();
        }
    };
};