#!/usr/bin/env node

const fs = require('fs')
const Math = require('math')
const Canvas = require('canvas')
const Path = require('path')
const Image = Canvas.Image

fs.readFile(Path.join(`${process.cwd()}`, `/${process.argv[process.argv.length - 1]}`), function (err, data) {
  if (err) throw err

  const img = new Image()
  img.src = data // sets data into context of canvas
  const canvas = Canvas.createCanvas(img.width, img.height) // sets size of the canvas
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)

  const imageData = ctx.getImageData(0, 0, img.width, img.height) // get list of gbr pixel values like [[g at [0, 0], [r at [0, 0], [b at [0, 0], [a at [0, 0], [g at [0, 1]...]

  const compressionRate = Math.floor(img.width / 60)
  const aaWidth = Math.floor(img.width / compressionRate); // defines the width and height of the output
  const aaHeight = Math.floor(img.height / compressionRate)
  const colorSet = '縁蜜眠年日あやすかい＄？￥＝～｜；・。、　' // expression symbols, you can change symbols

  let output = '\n'
  for (let y = 0; y < aaHeight; y++) {
    output += '\n'
    for (let x = 0; x < aaWidth; x++) {
      const index = (y * imageData.width + x) * 4 * compressionRate
      output += (colorSet[Math.floor(colorSet.length * (imageData.data[index] +
                imageData.data[index + 1] + imageData.data[index + 2] +
                imageData.data[index + 3]) / 4 / 256)]) // outputs an avarage of gbra pixels as translated string in colorset
      if (typeof colorSet[Math.floor(colorSet.length * imageData.data[index] / 256)] === 'undefined') {
        break
      }
    }
  }
  output += '\n'
  console.log(output)
})
