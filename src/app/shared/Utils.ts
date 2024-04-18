export class Utils {
  public static showDayOfMeeting(fechaSemana: string) {
    const fecha = new Date(fechaSemana);
    const diaSemana = fecha.getDay();  // 0 (Domingo) a 6 (Sábado)

    // Calcula el número de días que hay que restar para llegar al jueves
    const diasHastaJueves = (3 - diaSemana + 7) % 7;

    // Ajusta la fecha al jueves correspondiente
    fecha.setDate(fecha.getDate() + diasHastaJueves);

    // Guarda la fecha en el formato deseado

    //return fecha.toISOString().split('T')[0]

     // Guarda la fecha en el formato deseado "DD/MM/YYYY"
     const dia = String(fecha.getDate() + 1).padStart(2, '0');
     const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // El mes es base 0, por eso se suma 1
     const año = fecha.getFullYear();

     return `${dia}-${mes}-${año}`;
  }

  public static adapterTime(dateTime: string) {
    if(! dateTime){
      return '0.00'
    }
    const [horas, minutos] = dateTime.split(":").slice(0, 2);
    let newHora = parseInt(horas)
    if (newHora >= 13) {
      newHora -= 12
    }
    return `${newHora}:${minutos}`
  }

  public static showFirstDateOfWeek(fechaSemana: string) {
    return true;
}
}
