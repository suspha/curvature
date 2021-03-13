module.exports = async function($) {
  return /* html */`
    <div class="header">
      <h1>Earth Curvature Calculator</h1>
      <p class="intro">
        Accurately calculate the curvature you are supposed to see on the ball Earth.
      </p>
    </div>

    <div class="frame">
      <div class="distance">
        <label>
          Distance:
          <input id="distance" type="number" value="20">
        </label>

        <span class="unit">
          <select id="unit" name="unit" onchange="toggleNumbers()">
            <option value="km">
              Kilometers
            </option>
            <option value="miles">
              Miles
            </option>
          </select>
        </span>

        <span class="calculate">
          <button onclick="calc()">Calculate</button>
        </span>
      </div>

      <div class="result"></div>
    </div>

    <div class="table">

      <table id="meters">
        <tr><th>Distance</th><th>Curvature</th></tr>
        <tr><td>1 km</td><td>0.00008 km = 0.08 meters</td></tr>
        <tr><td>2 km</td><td>0.00031 km = 0.31 meters</td></tr>
        <tr><td>5 km</td><td>0.00196 km = 1.96 meters</td></tr>
        <tr><td>10 km</td><td>0.00785 km = 7.85 meters</td></tr>
        <tr><td>20 km</td><td>0.03139 km = 31.39 meters</td></tr>
        <tr><td>50 km</td><td>0.19620 km = 196.20 meters</td></tr>
        <tr><td>100 km</td><td>0.78479 km = 784.79 meters</td></tr>
        <tr><td>200 km</td><td>3.13897 km = 3138.97 meters</td></tr>
        <tr><td>500 km</td><td>19.6101 km = 19610.09 meters</td></tr>
        <tr><td>1000 km</td><td>78.3196 km = 78319.62 meters</td></tr>
      </table>

      <table id="miles" class="hidden">
        <tr><th>Distance</th><th>Curvature</th></tr>
        <tr><td>1 mile</td><td>0.00013 miles = 0.67 feet</td></tr>
        <tr><td>2 miles</td><td>0.00051 miles = 2.67 feet</td></tr>
        <tr><td>5 miles</td><td>0.00316 miles = 16.67 feet</td></tr>
        <tr><td>10 miles</td><td>0.01263 miles = 66.69 feet</td></tr>
        <tr><td>20 miles</td><td>0.05052 miles = 266.75 feet</td></tr>
        <tr><td>50 miles</td><td>0.31575 miles = 1667.17 feet</td></tr>
        <tr><td>100 miles</td><td>1.26296 miles = 6668.41 feet</td></tr>
        <tr><td>200 miles</td><td>5.05102 miles = 26669.37 feet</td></tr>
        <tr><td>500 miles</td><td>31.5336 miles = 166497.53 feet</td></tr>
        <tr><td>1000 miles</td><td>125.632 miles = 663337.65 feet</td></tr>
      </table>
    </div>

    <div class="explain">
      <h2>Explanation:</h2>
      <div class="formula">
        <p>
          The Earth's radius <code class="light">(r)</code> is 6371 km or 3959 miles, based on numbers from <a href="https://en.wikipedia.org/wiki/Earth_radius" target="_blank">Wikipedia</a>,<br>
          which gives a circumference <code class="light">(c)</code>of
          <code>c = 2 * &pi; * r = 40 030 km</code>
        </p>
        <p>
          We wish to find the height <code class="light">(h)</code> which is the drop in curvature over the distance <code class="light">(d)</code>
        </p>
        <p>
          Using the circumference we find that 1 kilometer has the angle<br><code>360&deg; / 40 030 km = 0.009&deg;</code>. The angle <code class="light">(a)</code> is then <code>a = 0.009&deg; * distance (d)</code>
        </p>
        <p>
          The derived formula <code>h = r * (1 - cos a)</code> is accurate for any distance <code class="light">(d)</code>
        </p>
      </div>
      <div class="image">
        <img src="/img/earth_curvature_calculator_formula.png" alt="curvature" width="333px" height="333px">
      </div>
    </div>
    <div class="footer">
      <p>
        <a href="https://github.com/suongp/curvature">Source code</a>
      </p>
      <p class="hint">
        Note: Using the formula <em>8 times the distance in miles squared</em> is not accurate for long distances but is fine for practical use.
      </p>
    </div>
    <script>
      var distance = document.querySelector("#distance")
        , unit = document.querySelector("#unit")
        , result = document.querySelector(".result")
        , meters = document.querySelector("#meters")
        , miles = document.querySelector("#miles")
        , d, r, c, g, e, a, h, m, n, debug = false;

      function toggleNumbers() {
        // Show numbers table
        if(unit.value == 'miles') {
          meters.className = 'hidden';
          miles.className = '';
        } else {
          miles.className = 'hidden';
          meters.className = '';
        }
      }

      function calc (){
        d = distance.value;

        if(d.length < 1) {
          distance.focus();
          return false;
        }

        // Convert to number
        d = parseFloat(d);

        if(debug) console.log("D: "+ d);

        // Earth's radius in kilometers
        r = 6371;

        // Convert to miles if miles is selected
        if(unit.value == 'miles') {
          r = r / 1.609344;
        }

        if(debug) console.log("R: "+ r);

        // Find the circumference
        c = 2 * Math.PI * r;

        if(debug) console.log("C: "+ c);

        // Find degrees per 1 unit (1 km or 1 mile)
        g = 360 / c;

        if(debug) console.log("G: "+ g);

        // Unit degrees times distance
        e = g * d;

        if(debug) console.log("E: "+ e);

        // Convert degrees to radians since javascript likes that
        a = e * (Math.PI / 180);

        if(debug) console.log("A: "+ a);

        h = r * (1 - Math.cos(a));

        if(debug) console.log("H: "+ h);

        // Not in use. Keeping it for later.
        if(false) {
          result.innerHTML = "<div class='error'>Number is too high, please try a lower number.</div>";
          return false;
        }

        // Limit decimals based on value
        if(h > 1000) {
          n = 2;
        } else if(h > 100) {
          n = 3;
        } else if(h > 10) {
          n = 4;
        } else {
          n = 5;
        }

        // Set large value
        m = h.toFixed(n);

        if(unit.value == 'miles') {
          h = m + " miles <span class='or'>=</span> " + (h * 5280).toFixed(2) + " feet";
        } else {
          h = m + " km <span class='or'>=</span> " + (h * 1000).toFixed(2) + " meters";
        }

        // Write result as HTML into result element
        result.innerHTML = '<div class="highlight">' + h + '</div>';
      }
    </script>
  `
}
