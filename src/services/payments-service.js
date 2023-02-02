import { Readable } from "stream";
import readLine from "readline";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday.js";
import { getPaymentsRepository } from "../repositories/payments-repository.js";

export async function createPaymentsService(file) {
   const { buffer } = file;
   dayjs.extend(weekday);

   const readableFile = new Readable();
   readableFile.push(buffer);
   readableFile.push(null);

   const bookingsLine = readLine.createInterface({
      input: readableFile,
   });

   const data = await addDataInArray(bookingsLine);

   const payments = await createArrayOfPayments(data);

   return payments;
}

async function createArrayOfPayments(data) {
   const payments = [];
   for (let i = 0; i < data.length; i++) {
      const booking = data[i];
      const dateCheckOut = changeDateFormat(booking.checkOut);
      const dateCheckin = changeDateFormat(booking.checkIn);
      if (booking.portal === "Booking.com") {
         payments.push({
            tipo: "A_Receber",
            valor:
               booking.totalReservaSemImposto -
               booking.comissaoIntermediarioPersonalizada,
            propriedade: booking.propriedade,
            vencimento: dayjs(dateCheckOut).format("DD-MM-YYYY"),
            mesVencimento: dayjs(dateCheckOut).format("MM-YYYY"),
         });
         payments.push({
            tipo: "A_Pagar",
            valor: booking.extrasSemImpostos,
            propriedade: booking.propriedade,
            vencimento: dayjs(dateCheckOut)
               .day(2)
               .add(7, "day")
               .format("DD-MM-YYYY"),
            mesVencimento: dayjs(dateCheckOut)
               .day(2)
               .add(7, "day")
               .format("MM-YYYY"),
         });
      } else if (booking.portal === "Airbnb.com") {
         payments.push({
            tipo: "A_Receber",
            valor:
               booking.totalReservaSemImposto -
               booking.comissaoIntermediarioPersonalizada,
            propriedade: booking.propriedade,
            vencimento: dayjs(dateCheckin).add(5, "day").format("DD-MM-YYYY"),
            mesVencimento: dayjs(dateCheckin).add(5, "day").format("MM-YYYY"),
         });
         payments.push({
            tipo: "A_Pagar",
            valor: booking.extrasSemImpostos,
            propriedade: booking.propriedade,
            vencimento: dayjs(dateCheckOut)
               .day(2)
               .add(7, "day")
               .format("DD-MM-YYYY"),
            mesVencimento: dayjs(dateCheckOut)
               .day(2)
               .add(7, "day")
               .format("MM-YYYY"),
         });
      }
   }
   return payments;
}

function changeDateFormat(date) {
   const otherFormat =
      date[3] +
      date[4] +
      "-" +
      date[0] +
      date[1] +
      "-" +
      date[6] +
      date[7] +
      date[8] +
      date[9];

   return otherFormat;
}

async function addDataInArray(bookingsLine) {
   const bookings = [];

   let i = 0;

   for await (let line of bookingsLine) {
      const bookingsLineSplit = line.split(",");
      bookings.push({
         portal: bookingsLineSplit[17],
         totalReservaSemImposto: Number(bookingsLineSplit[11]),
         comissaoIntermediarioPersonalizada: Number(bookingsLineSplit[19]),
         checkOut: bookingsLineSplit[3],
         extrasSemImpostos: Number(bookingsLineSplit[8]),
         propriedade: Number(bookingsLineSplit[15]),
         checkIn: bookingsLineSplit[2],
      });
   }
   return bookings;
}

export async function getPaymentsService(vencimento, tipo, propriedade) {
   const filters = [];
   if (vencimento != undefined) {
      filters.push(["mesVencimento",vencimento.slice(-7)]);
   }
   if (tipo != undefined) {
      filters.push(["tipo",tipo]);
   }
   if (propriedade != undefined) {
      filters.push(["propriedade",Number(propriedade)]);
   }
   const payments = getPaymentsRepository(filters);
   return payments;
}
