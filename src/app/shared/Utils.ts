export class Utils {
  public static showDayOfMeeting(fechaSemana: string) {
    const fecha = new Date(fechaSemana);
    const diaSemana = fecha.getDay() + 1;  // 0 (Domingo) a 6 (Sábado)
    // Calcula el número de d ías que hay que restar para llegar al jueves
    let diaReunion = 2; // 0 (Domingo) a 6 (Sábado)
    const diasHastaJueves = (diaReunion - diaSemana + 7) % 7;

    // Ajusta la fecha al jueves correspondiente
    fecha.setDate(fecha.getDate() + diasHastaJueves);

    // Guarda la fecha en el formato deseado
    //return fecha.toISOString().split('T')[0]

    // Guarda la fecha en el formato deseado "DD/MM/YYYY"
    const dia = fecha.toISOString().split('T')[0].split('-')[2];
    const mes = fecha.toISOString().split('T')[0].split('-')[1]; // El mes es base 0, por eso se suma 1
    const año = fecha.toISOString().split('T')[0].split('-')[0];
    //return fecha.toLocaleDateString();
    return `${dia}-${mes}-${año}`;
  }

  public static adapterTime(dateTime: string) {
    if (!dateTime) {
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
