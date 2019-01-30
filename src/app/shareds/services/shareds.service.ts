import { Injectable } from "@angular/core";

@Injectable()
export class ShardsService {
  positionItem: any[] = [
    'Angular Developer',
    'NodeJS Developer',
    'Frontend Developer',
    'Backend Developer'
  ]

  onConvertImage(inputFile: HTMLInputElement) {
    return new Promise((resolve, reject) => {
      const imageType = ['image/jpeg', 'image/png']
      const imageSize = 400

      if (inputFile.files.length == 0) return resolve(null)
      else {
        if (imageType.indexOf(inputFile.files[0].type) < 0)
          return reject({ Message: 'Please uplaod image .jpeg or .png' })

        if ((inputFile.files[0].size / 1024) > imageSize) // แปลงจาก Byte เป็น KiloByte
          return reject({ Message: `Maximum upload file size is ${imageSize}KB` })

        const reader = new FileReader()
        reader.readAsDataURL(inputFile.files[0])
        reader.addEventListener('load', () => resolve(reader.result))
      }
    })
  }
}

