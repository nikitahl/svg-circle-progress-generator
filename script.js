(function () {
  const controls = document.getElementById("controls")
  const output = document.getElementById("output")
  const outputCode = document.getElementById("output-code")
  const copyBtn = document.getElementById("copy")
  
  const svgAttributes = {
    circumference: "565.48px",
    percentage: "118.692px",
    progress: 79,
    size: 200,
    circleColor: "#e0e0e0",
    progressColor: "#76e5b1",
    circleWidth: "16px",
    progressWidth: "16px",
    progressShape: "round",
    textColor: "#6bdba7",
    textSize: {
      width: 50,
      height: 50,
      fontSize: "52"
    },
    valueToggle: true,
    percentageToggle: false
  }

  function getSvg (attributes) {
    const {
      circumference,
      percentage,
      progress,
      size,
      circleColor,
      progressColor,
      circleWidth,
      progressWidth,
      progressShape,
      textColor,
      textSize,
      valueToggle,
      percentageToggle
    } = attributes

    const suffix = percentageToggle ? '%' : ''
    const text = valueToggle ? `\n    <text x="${Math.round((size/2) - (textSize.width/1.75))}px" y="${Math.round((size/2) + (textSize.height/3.25))}px" fill="${textColor}" font-size="${textSize.fontSize}px" font-weight="bold" style="transform:rotate(90deg) translate(0px, -${size - 4}px)">${progress}${suffix}</text>` : ''

    return `
  <svg width="${size}" height="${size}" viewBox="-${size*0.125} -${size*0.125} ${size*1.25} ${size*1.25}" version="1.1" xmlns="http://www.w3.org/2000/svg" style="transform:rotate(-90deg)">
    <circle r="${(size/2) - 10}" cx="${size/2}" cy="${size/2}" fill="transparent" stroke="${circleColor}" stroke-width="${circleWidth}" stroke-dasharray="${circumference}" stroke-dashoffset="0"></circle>
    <circle r="${(size/2) - 10}" cx="${size/2}" cy="${size/2}" stroke="${progressColor}" stroke-width="${progressWidth}" stroke-linecap="${progressShape}" stroke-dashoffset="${percentage}" fill="transparent" stroke-dasharray="${circumference}"></circle>${text}
  </svg>
    `
  }

  function setTextSize () {
    if (svgAttributes.valueToggle) {
      const svgText = document.querySelector('text')
      const textRect = svgText.getBoundingClientRect()
      svgAttributes.textSize = {
        width: Math.round(textRect.width),
        height: Math.round(textRect.height),
        fontSize: svgAttributes.textSize.fontSize
      } 
    }
  }

  function handleFormChange (e) {
    let value = e.target.value
    let rerender = false
    if (e.target.name === "progress") {
      const radius = (svgAttributes.size/2) - 10
      const circumference = 3.14*radius*2
      svgAttributes.percentage = Math.round(circumference*((100-e.target.valueAsNumber)/100)) + 'px'
      if (e.target.valueAsNumber === 0) {
        svgAttributes.progressColor = svgAttributes.circleColor
      } else if (e.target.valueAsNumber > 0 && (svgAttributes.progressColor === svgAttributes.circleColor)) {
        svgAttributes.progressColor = controls.progressColor.value
      }
      setTextSize()
      rerender = true
    } else if (e.target.name === "size") {
      const radius = (e.target.valueAsNumber/2) - 10
      const circumference = 3.14*radius*2
      svgAttributes.circumference = circumference + "px"
      svgAttributes.percentage = Math.round(circumference*((100-svgAttributes.progress)/100)) + "px"
    } else if (e.target.type === "checkbox") {
      value = e.target.checked
      if (e.target.name === "percentageToggle") {
        setTextSize()
      }
      rerender = true
    } else if (e.target.name === "textSize") {
      const svgText = document.querySelector('text')
      const textRect = svgText.getBoundingClientRect()
      value = {
        width: Math.round(textRect.width),
        height: Math.round(textRect.height),
        fontSize: value
      }
      rerender = true
    }
    svgAttributes[e.target.name] = value
    setSvg(rerender)
  }

  function setSvg (rerender = false) {
    const html = getSvg(svgAttributes)
    output.innerHTML = html
    outputCode.innerText = html
    if (rerender) {
      setTextSize()
      setSvg(false)
    }
  }

  function handleCopy (e) {
    navigator.clipboard.writeText(outputCode.innerText)
    const currentValue = e.target.innerText
    e.target.innerText = "Copied!"
    setTimeout(function() {
      e.target.innerText = currentValue
    }, 2000)
  }

  setSvg(false)

  controls.addEventListener("input", handleFormChange)
  copyBtn.addEventListener("click", handleCopy)
})()