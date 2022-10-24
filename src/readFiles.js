const fs = require("fs");
const path = require("path");
console.log(path);

const readFiles = (arrayList) => {
  let files = [];
  arrayList.map((arrayFile) => {
    files.push(
      new Promise((resolve, reject) => {
        fs.readFile(arrayFile.path, "UTF-8", (err, data) => {
          if (err) {
            console.error(err);
          } else {
            resolve({
              path: arrayFile.path,
              data: data,
            });
          }
        });
      })
    );
  });
  return files;
};
readFiles;

