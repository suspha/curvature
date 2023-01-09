module.exports = async function ($) {
  return /* HTML */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          name="viewport"
        />
        <meta
          name="description"
          content="Accurately calculate the curvature on the ball Earth. Uses a cosine function, works for all distances in both kilometers and miles. Open source on Github."
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
      </head>
      <body>
        <div class="content">${$.page.content}</div>
      </body>
    </html>
  `
}
