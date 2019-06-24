var library = require("module-library")(require)

module.exports = library.define(
  "bridge-react",
  function(fs) {

    const rd = "// react-dom.js here"
    const r = "// react.js goes here"
    const reactDomSource = fs.readFileSync(
      "react-dom.js")
    const reactSource = fs.readFileSync(
      "react.js")

    var source = generateReactSingleton.toString()

    source = source.replace(
      rd,
      rd+"\n\n"+reactDomSource)
    .replace(
        r,
        r+"\n\n"+reactSource)

    function bridgeReact(bridge) {
      var call = bridge.remember(
        "bridge-react")

      if (call) {
        return call }

      var call = bridge.defineSingleton(
        "React",
        source)
      bridge.see(
        "bridge-react",
        call)
      return call }

function generateReactSingleton() {

  // react-dom.js goes here

  // react.js goes here

  return React
}

    return bridgeReact
  }
)