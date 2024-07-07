module.exports = async function ($) {
  return /* HTML */ `
    <div class="inner">
      <div class="How">
        <h1>How It Works</h1>
        <div>
          <p>
            Simply input the distance over which you want to calculate the
            curvature and the calculator will provide:
          </p>
          <ul>
            <li>The drop in height over the specified distance.</li>
            <li>The distance to the horizon from a given height.</li>
            <li>The angle of curvature.</li>
          </ul>
        </div>
      </div>
    </div>
  `
}
