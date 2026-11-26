module.exports = async function (state) {
  return /* HTML */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Accurately calculate the curvature on the ball Earth. Uses a cosine function, works for all distances in both kilometers and miles. Open source on Github."
        />
        <link rel="shortcut icon" type="image/png" href="images/favicon.png" />
        <title>
          Earth Curvature Calculator - Calculate the curve you should see
        </title>
        <link rel="icon" type="image/png" href="/img/favicon.png" />
        <link rel="stylesheet" href="/css/app.css" />
      </head>
      <body>
        <nav>
          <div class="nav-links">
            <a href="/">Home</a>
            <a href="/what">What is Earth Curvature?</a>
            <a href="/why">Why</a>
            <a href="/how">How</a>
          </div>
          <div class="source-code">
            <a href="https://github.com/suspha/curvature">Source code</a>
          </div>
        </nav>
        <div class="content">${state.content}</div>
        <footer>
          Made by <a href="https://eldoy.com">Eldøy Projects</a>, Oslo, Norway
        </footer>
      </body>
    </html>
  `
}
