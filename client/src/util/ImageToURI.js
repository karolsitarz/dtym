import EXIF from 'exif-js';

const getRatio = (width, height) => {
  if (width > height) {
    return {
      sx: (width - height) / 2,
      sy: 0,
      swidth: height,
      sheight: height
    };
  } else if (width < height) {
    return {
      sx: 0,
      sy: (height - width) / 2,
      swidth: width,
      sheight: width
    };
  } else {
    return {
      sx: 0,
      sy: 0,
      swidth: width,
      sheight: height
    };
  }
};

export default (source, size = 200) =>
  new Promise((resolve, reject) => {
    const file = source.files[0];
    const reader = new window.FileReader();

    reader.onload = () => {
      new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => {
          let canvas = document.createElement('CANVAS');
          let ctx = canvas.getContext('2d');

          let height = img.naturalHeight;
          let width = img.naturalWidth;

          const r = new window.FileReader();
          let orientation;
          r.onload = (e) => {
            orientation = EXIF.readFromBinaryFile(e.target.result).Orientation || 1;

            if (orientation > 4 && orientation < 9) {
              canvas.width = height;
              canvas.height = width;
            } else {
              canvas.width = width;
              canvas.height = height;
            }

            switch (orientation) {
              case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
              case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
              case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
              case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
              case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
              case 7: ctx.transform(0, -1, -1, 0, height, width); break;
              case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
              default: break;
            }

            ctx.drawImage(img, 0, 0);

            let r = getRatio(canvas.width, canvas.height, size);
            // console.log(r);
            let destcanvas = document.createElement('CANVAS');
            let destctx = destcanvas.getContext('2d');

            destcanvas.width = size;
            destcanvas.height = size;

            destctx.drawImage(canvas, r.sx, r.sy, r.swidth, r.sheight, 0, 0, size, size);

            resolve(destcanvas.toDataURL('image/jpeg', 0.6));
            // })
          };
          r.readAsArrayBuffer(file);
        };
        img.onerror = function () {
          reject(new Error(`data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==`));
        };
        img.src = reader.result;
      })
        .then(value => {
          resolve(value);
        })
        .catch(value => {
          reject(value);
        });
    };

    if (file && file.size > 5000000) {
      reject(new Error('file_size_tooLarge'));
    } else if (file) {
      reader.readAsDataURL(file);
    } else {
      reject(new Error('file_noFile'));
    }
  });

export const URLtoURI = (url, size = 200) =>
  new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = function () {
      let canvas = document.createElement('CANVAS');
      let ctx = canvas.getContext('2d');

      const r = getRatio(img.naturalWidth, img.naturalHeight, size);

      canvas.width = size;
      canvas.height = size;

      ctx.drawImage(this, r.sx, r.sy, r.swidth, r.sheight, 0, 0, size, size);

      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = function () {
      reject(new Error(`data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==`));
    };
    img.src = url;
  });
