const path = require("path");
const fs = require("fs");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("WorkDir: ", function (d) {
  if (!d) d = "./";
  rl.question("Mode: ", function (m) {
    rl.close();
    td(d, m);
    console.log("Done. Press any key to close.");
    process.stdin.resume();
    process.stdin.setRawMode(true);
    process.stdin.on("data", process.exit);
  });
});

function td(d, mde) {
  fs.readdirSync(d).forEach((File) => {
    const abs = path.join(d, File);
    if (fs.statSync(abs).isDirectory()) return td(abs);
    else if (abs.endsWith(".json")) {
      const dt = JSON.parse(
        fs
          .readFileSync(abs)
          .toString("UTF-8")
          .replace(/[\n\r\t]/g, "")
      );
      return fs.writeFileSync(
        abs,
        JSON.stringify(Wj(dt, mde)).replace(/\\\\u/g, "\\u")
      );
    }
  });
}

function Cvt(str) {
  const nstr = [];
  if (typeof str === "object" && str !== null) return str;
  if (!isNaN(str)) return str;
  for (let i = 0, strLen = str.length; i < strLen; i++)
    nstr.push(
      "\\u" + parseInt(str.charCodeAt(i), 10).toString(16).padStart(4, "0")
    );
  return nstr.join("");
}

function Wj(i, md) {
  if (md == "rvt") return i;
  if (typeof i !== "object") return Cvt(i);
  if (Array.isArray(i)) return i.map((el) => Wj(el));
  return Object.keys(i).reduce(function (nobj, k) {
    const vl = i[k];
    const nvl = typeof vl === "object" && vl !== null ? Wj(vl) : vl;
    nobj[Cvt(k)] = Cvt(nvl);
    return nobj;
  }, {});
}
