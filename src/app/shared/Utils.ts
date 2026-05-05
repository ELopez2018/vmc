import { Meeting } from "../core/interfaces/reuniones.interface";
export class Utils {
  public static showDayOfMeeting(fechaSemana: any, meetingDay: number, onlyMonth: boolean = false) {
    const fecha = new Date(fechaSemana);

    // Ajusta la fecha según el día de reunión
    fecha.setDate(fecha.getDate() + meetingDay );

    const dia = fecha.getDate().toString().padStart(2, "0");
    const mesIndex = fecha.getMonth(); // 0 - 11
    const año = fecha.getFullYear();

    const meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

    const mesNombre = meses[mesIndex];
    const mesNumero = (mesIndex + 1).toString().padStart(2, "0");

    return onlyMonth ? `${dia} DE ${mesNombre}` : `${dia}-${mesNumero}-${año}`;
  }

  public static adapterTime(dateTime: any) {
    let horas: any;
    let minutos: any;
    let prefijo = "";
    if (!dateTime) {
      return "0.00";
    }
    if (typeof dateTime != "string") {
      prefijo = "0";
      horas = dateTime[0];
      minutos = dateTime[1];
    } else {
      prefijo = "0";
      const tiempo = dateTime.split(":").slice(0, 2);
      horas = tiempo[0];
      minutos = tiempo[1];
    }
    let newHora = horas;
    if (newHora >= 13) {
      newHora -= 12;
    }
    return `${newHora}:${minutos > 9 ? minutos : prefijo + parseInt(minutos)}`;
  }

  public static showFirstDateOfWeek(fechaSemana: any) {
    return true;
  }
}
