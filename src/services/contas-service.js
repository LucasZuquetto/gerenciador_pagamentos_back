import { Readable } from "stream";
import readLine from "readline";

export default async function contasService(file) {
   const { buffer } = file;

   const readableFile = new Readable();
   readableFile.push(buffer);
   readableFile.push(null);

   const bookingsLine = readLine.createInterface({
      input: readableFile,
   });
   
   const bookings = addDataInArray(bookingsLine)
   
   return bookings
}

function addDataInArray(bookingsLine){
    const bookings = [];

    let i = 0;
 
    for await (let line of bookingsLine) {
       if (i <= 1) {
          //2 primeiras linhas não são dados
          i++;
          continue;
       }
       const bookingsLineSplit = line.split(",");
       bookings.push({
          aluguelSEM: bookingsLineSplit[0],
       });
    }
}
