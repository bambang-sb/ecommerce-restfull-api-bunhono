import path from 'path'
import fs from 'fs/promises'

const uploadFile = async(image:any)=>{
  const buffer = Buffer.from(await image.arrayBuffer())
  const extParts = image.name.split('.');
  const ext = extParts.length > 1 ? extParts.pop():'';
  const filename = `${Date.now()}.${ext}`;
  let uploadDir = path.join(process.cwd(),"/uploads");
  const filePath = path.join(uploadDir, filename)

  await fs.writeFile(filePath, buffer)

  return {"pathFile":filePath,"filename":filename};
}

export{
  uploadFile
}
