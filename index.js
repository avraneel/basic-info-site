import http from "node:http";
import fs from "node:fs";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  let filename = "404";

  // Method 1
  const routes = {
    "/": "index",
    "/about": "about",
    "/contact-me": "contact-me",
  };

  if (Object.hasOwn(routes, url)) filename = routes[url];

  // Method 2
  //   switch (url) {
  //     case "/":
  //       filename = "index";
  //       break;
  //     case "/about":
  //       filename = "about";
  //       break;
  //     case "/contact-me":
  //       filename = "contact-me";
  //       break;
  //     default:
  //       filename = "404";
  //   }

  fs.readFile(`./html/${filename}.html`, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // crafting response
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  });
});

console.log("Server listening on port 8080");
server.listen(8080);
