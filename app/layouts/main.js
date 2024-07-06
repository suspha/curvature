module.exports = async function ($) {
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" type="image/png" href="images/favicon.png" />
        <title>
          Earth Curvature Calculator - Calculate the curve you should see
        </title>
        <link rel="icon" type="image/png" href="/img/favicon.png" />
        ${$.script('/bundle.js')} ${$.style('/bundle.css')}
        ${process.env.NODE_ENV == 'development' ? $.script('/js/dev.js') : ''}
        <script
          async
          defer
          data-domain="earthcurvature.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
        <script
          defer
          data-domain="earthcurvature.com"
          src="https://tactility.no/js/tactility.js"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7244493236252364"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>
        <div class="content">${$.page.content}</div>
        <footer>
          Made by <a href="https://eldoy.com">Eldøy Projects</a>, Oslo, Norway
        </footer>
      </body>
    </html>
  `
}
