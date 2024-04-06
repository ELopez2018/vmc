export class Utils {
  public  static showDayOfMeeting(fechaSemana: string){
    const fecha = new Date(fechaSemana);
    const diaSemana = fecha.getDay();  // 0 (Domingo) a 6 (Sábado)

    // Calcula el número de días que hay que restar para llegar al jueves
    const diasHastaJueves = (3 - diaSemana + 7) % 7;

    // Ajusta la fecha al jueves correspondiente
    fecha.setDate(fecha.getDate() + diasHastaJueves);

    // Guarda la fecha en el formato deseado

      return fecha.toISOString().split('T')[0]
  }
}
